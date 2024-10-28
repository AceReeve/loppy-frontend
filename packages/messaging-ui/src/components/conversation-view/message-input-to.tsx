"use client";

import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import * as z from "zod";
import { CheckIcon } from "@heroicons/react/24/outline";
import { isMobilePhone } from "validator";
import { useGetContactsQuery } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { useMessagesState } from "../../providers/messages-provider.tsx";

// TODO: Add phone number validation
const SendInviteSingleItemSchema = z.union([
  z.string().email(),
  z.string().refine(isMobilePhone),
]);

export default function MessageInputTo({
  className,
  contacts,
  setContacts,
}: {
  className?: string;
  contacts: string[];
  setContacts: Dispatch<SetStateAction<string[]>>;
}) {
  const [query, setQuery] = useState("");
  const { contactsMap, invitedUsers } = useMessagesState();

  const { data } = useGetContactsQuery({
    skip: 0,
    search_key: query,
  });

  const contactsList =
    data?.data.map((contact) => ({
      label: `${contact.first_name} ${contact.last_name} (+${contact.phone_number.toString()})`,
      value: `+${contact.phone_number.toString()}`,
      disabled: false,
    })) ?? [];

  const contactsListFiltered = useMemo(() => {
    let invitedUsersList: typeof contactsList = [];
    if (invitedUsers) {
      invitedUsersList =
        invitedUsers.emails
          ?.filter((user) => user.email.includes(query))
          .map((user) => ({
            label: `${user.email} (${user.status === "Pending" ? "Pending Registration" : "ServiHero User"})`,
            value: user.email,
            disabled: user.status === "Pending",
          })) ?? [];
    }
    return [...invitedUsersList, ...contactsList];
  }, [contactsList, invitedUsers, query]);

  return (
    <div className="relative w-full">
      <Combobox
        immediate
        multiple
        onChange={(people) => {
          setContacts(people);
          setQuery("");
        }}
        onClose={() => {
          setQuery("");
        }}
        value={contacts}
      >
        <div className={`flex items-center gap-0.5 py-0.5 ${className ?? ""}`}>
          {contacts.map((address) => (
            <button
              type="button"
              className="bg-primary/30 font-nunito flex cursor-pointer items-center gap-1 rounded-lg px-2 py-0.5 text-sm"
              key={address}
              onClick={() => {
                setContacts((existing) =>
                  existing.filter((a) => a !== address),
                );
              }}
            >
              <span>{contactsMap?.[address] ?? address}</span>
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          ))}
          <ComboboxInput
            autoComplete="off"
            className="h-full min-h-12 flex-1 border-none bg-white p-0 px-2 text-sm shadow-none focus:ring-0"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder="Email, name, or phone number"
            value={query}
          />
        </div>
        {contactsListFiltered.length > 0 ? (
          <div className="w-full rounded-md bg-white shadow-lg">
            <ComboboxOptions className="shadow-xs max-h-60 overflow-auto rounded-md p-2 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
              {contactsListFiltered.map((contact) => (
                <ComboboxOption
                  className="data-[focus]:bg-primary/30 group flex items-center gap-2 rounded-md bg-white p-1.5 data-[disabled]:opacity-50"
                  key={contact.value}
                  value={contact.value}
                  disabled={contact.disabled}
                >
                  <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                  {contact.label}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        ) : null}

        {SendInviteSingleItemSchema.safeParse(query).success ? (
          <div className="absolute -bottom-10 w-full rounded-md bg-white shadow-lg">
            <ComboboxOptions className="shadow-xs max-h-60 overflow-auto rounded-md p-2 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
              <ComboboxOption value={query}>
                Insert &apos;{query}&apos;
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        ) : null}
      </Combobox>
    </div>
  );
}
