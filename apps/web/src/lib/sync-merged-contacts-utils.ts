import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { type MergedContacts } from "@repo/redux-utils/src/endpoints/types/contacts";
import { db } from "./db";

interface LastSync {
  user_id: ObjectId;
  contacts_last_sync: Date;
  service_titan_last_sync: Date;
}

export async function syncMergeContacts(userId: string) {
  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.ready();
    // Get last sync timestamps
    const lastSync = (await db
      .collection<LastSync & Document>("sync_metadata")
      .findOne({
        user_id: new ObjectId(userId),
      })) ?? {
      user_id: new ObjectId(userId),
      contacts_last_sync: new Date(0),
      service_titan_last_sync: new Date(0),
    };

    // Fetch and merge new or updated contacts
    const [newRegularContacts, newServiceTitanContacts] = await Promise.all([
      // Fetch new/updated regular contacts
      db
        .collection("contacts")
        .aggregate<MergedContacts>([
          {
            $match: {
              user_id: new ObjectId(userId),
              $or: [
                { created_at: { $gt: lastSync.contacts_last_sync } },
                { updated_at: { $gt: lastSync.contacts_last_sync } },
              ],
            },
          },
          {
            $project: {
              name: { $concat: ["$first_name", " ", "$last_name"] },
              phone_number: { $toString: "$phone_number" },
              email: 1,
              source: { $literal: "Service Hero" },
              last_campaign_ran: 1,
              last_interaction: 1,
              tags: 1,
              do_not_disturb: { $literal: false },
              original_id: "$_id",
              original_collection: { $literal: "contacts" },
              created_at: 1,
              updated_at: 1,
              sync_hash: {
                $concat: [
                  { $toString: "$updated_at" },
                  { $toString: "$phone_number" },
                  { $ifNull: ["$email", ""] },
                  { $ifNull: ["$first_name", ""] },
                  { $ifNull: ["$last_name", ""] },
                ],
              },
            },
          },
        ])
        .toArray(),

      // Fetch new/updated ServiceTitan contacts
      db
        .collection("synced-contacts")
        .aggregate<MergedContacts>([
          {
            $match: {
              user_id: new ObjectId(userId),
              $or: [
                {
                  createdOn: {
                    $gt: lastSync.service_titan_last_sync.toISOString(),
                  },
                },
                {
                  modifiedOn: {
                    $gt: lastSync.service_titan_last_sync.toISOString(),
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "synced-customers",
              localField: "customerId",
              foreignField: "id",
              as: "customer",
            },
          },
          { $unwind: "$customer" },
          // Group by customerId to merge contacts
          {
            $group: {
              _id: "$customerId",
              customer: { $first: "$customer" },
              contacts: {
                $push: {
                  type: "$type",
                  value: "$value",
                  doNotText: "$phoneSettings.doNotText",
                  modifiedOn: "$modifiedOn",
                  createdOn: "$createdOn",
                },
              },
              lastModifiedOn: { $max: "$modifiedOn" },
              original_ids: { $push: "$_id" },
            },
          },
          // Transform the grouped data
          {
            $project: {
              name: { $trim: { input: "$customer.name" } },
              // Find email from contacts array
              email: {
                $let: {
                  vars: {
                    emailContact: {
                      $filter: {
                        input: "$contacts",
                        as: "contact",
                        cond: { $eq: ["$$contact.type", "Email"] },
                      },
                    },
                  },
                  in: {
                    $arrayElemAt: ["$$emailContact.value", 0],
                  },
                },
              },
              // Find phone number from contacts array
              phone_number: {
                $let: {
                  vars: {
                    phoneContact: {
                      $filter: {
                        input: "$contacts",
                        as: "contact",
                        cond: { $eq: ["$$contact.type", "MobilePhone"] },
                      },
                    },
                  },
                  in: {
                    $arrayElemAt: ["$$phoneContact.value", 0],
                  },
                },
              },
              source: { $literal: "ServiceTitan" },
              last_campaign_ran: { $literal: null },
              last_interaction: "$lastModifiedOn",
              tags: { $literal: [] },
              do_not_disturb: "$phoneSettings.doNotText",
              original_id: { $first: "$original_ids" },
              original_collection: { $literal: "synced-contacts" },
              created_at: {
                $dateFromString: {
                  dateString: { $min: "$contacts.createdOn" },
                },
              },
              updated_at: {
                $dateFromString: {
                  dateString: "$lastModifiedOn",
                },
              },
              customer_id: "$_id",
              sync_hash: {
                $concat: [
                  "$lastModifiedOn",
                  { $ifNull: ["$customer.name", ""] },
                ],
              },
              user_id: {
                $toObjectId: userId,
              },
            },
          },
        ])
        .toArray(),
    ]);

    if (
      newRegularContacts.length === 0 &&
      newServiceTitanContacts.length === 0
    ) {
      return NextResponse.json({
        message: "No new updates found",
        totalSynced: 0,
      });
    }

    // Prepare new contacts for merged collection
    const newMergedContacts = [
      ...newRegularContacts,
      ...newServiceTitanContacts,
    ];

    // Get existing contacts for comparison
    const existingContacts = await db.find<MergedContacts & Document>(
      "merged_contacts",
      {
        user_id: new ObjectId(userId),
        original_collection: {
          $in: ["contacts", "synced-contacts"],
        },
      },
    );

    // Create lookup of existing contacts by original_id and customer_id
    const existingContactsMap = new Map(
      existingContacts.map((contact) => [
        contact.customer_id
          ? `servicetitan-${contact.customer_id.toString()}`
          : `${contact.original_collection}-${contact.original_id}`,
        contact,
      ]),
    );

    // Filter out unchanged contacts
    const contactsToUpdate = newMergedContacts.filter((contact) => {
      const lookupKey = contact.customer_id
        ? `servicetitan-${contact.customer_id.toString()}`
        : `${contact.original_collection}-${contact.original_id}`;
      const existingContact = existingContactsMap.get(lookupKey);
      return (
        !existingContact || existingContact.sync_hash !== contact.sync_hash
      );
    });

    if (contactsToUpdate.length > 0) {
      // Perform bulk operations
      const bulkOps = contactsToUpdate.map((contact) => {
        // omit _id from contact to prevent errors regarding mutable id being changed
        const { _id, ...contactWithoutId } = contact;

        return {
          replaceOne: {
            filter: contact.customer_id
              ? {
                  user_id: new ObjectId(userId),
                  customer_id: contact.customer_id,
                }
              : {
                  user_id: new ObjectId(userId),
                  original_id: contact.original_id,
                  original_collection: contact.original_collection,
                },
            replacement: contactWithoutId,
            upsert: true,
          },
        };
      });

      // @ts-expect-error -- just ignore this for now
      await db.collection("merged_contacts").bulkWrite(bulkOps);
    }

    // Update sync metadata
    await db.collection("sync_metadata").updateOne(
      { user_id: new ObjectId(userId) },
      {
        $set: {
          contacts_last_sync: new Date(),
          service_titan_last_sync: new Date(),
        },
      },
      { upsert: true },
    );

    // Create indexes if they don't exist
    await Promise.all([
      db.collection("merged_contacts").createIndex({ user_id: 1 }),
      db.collection("merged_contacts").createIndex({ user_id: 1, source: 1 }),
      db
        .collection("merged_contacts")
        .createIndex({ user_id: 1, created_at: -1 }),
      db.collection("merged_contacts").createIndex({
        user_id: 1,
        name: "text",
        email: "text",
        phone_number: "text",
      }),
    ]);

    return NextResponse.json({
      message: "Contacts synced successfully",
      totalSynced: contactsToUpdate.length,
      newContacts: newMergedContacts.length,
      updatedContacts: contactsToUpdate.length - newMergedContacts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
