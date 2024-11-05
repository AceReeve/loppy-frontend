/* eslint-disable @typescript-eslint/no-explicit-any -- allow any */
import {
  type Collection,
  type Db,
  type OptionalUnlessRequiredId,
} from "mongodb";
import clientPromise from "./mongodb";

export class Database {
  private static instance: Database | undefined;
  private db: Db | null = null;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async getDb(): Promise<Db> {
    if (!this.db) {
      const client = await clientPromise;
      this.db = client.db();
    }
    return this.db;
  }

  public async collection<T extends Document>(
    name: string,
  ): Promise<Collection<T>> {
    const db = await this.getDb();
    return db.collection<T>(name);
  }

  public async findOne<T extends Document>(
    collectionName: string,
    query: Record<string, any>,
  ): Promise<T | null> {
    const collection = await this.collection<T>(collectionName);
    return collection.findOne<T>(query);
  }

  public async find<T extends Document>(
    collectionName: string,
    query: Record<string, any>,
    options: {
      sort?: Record<string, 1 | -1>;
      skip?: number;
      limit?: number;
    } = {},
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection
      .find(query)
      .sort(options.sort ?? {})
      .skip(options.skip ?? 0)
      .limit(options.limit ?? 0)
      .toArray();
  }

  public async updateOne<T extends Document>(
    collectionName: string,
    filter: Record<string, any>,
    update: Record<string, any>,
    options: { upsert?: boolean } = {},
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection.updateOne(filter, update, options);
  }

  public async bulkWrite<T extends Document>(
    collectionName: string,
    operations: any[],
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection.bulkWrite(operations);
  }

  public async countDocuments(
    collectionName: string,
    query: Record<string, any>,
  ) {
    const collection = await this.collection(collectionName);
    return collection.countDocuments(query);
  }

  public async deleteOne<T extends Document>(
    collectionName: string,
    filter: Record<string, any>,
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection.deleteOne(filter);
  }

  public async deleteMany<T extends Document>(
    collectionName: string,
    filter: Record<string, any>,
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection.deleteMany(filter);
  }

  public async insertOne<T extends Document>(
    collectionName: string,
    document: OptionalUnlessRequiredId<T>,
    options: { writeConcern?: any } = {},
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection.insertOne(document, options);
  }

  public async insertMany<T extends Document>(
    collectionName: string,
    documents: OptionalUnlessRequiredId<T>[],
    options: { ordered?: boolean; writeConcern?: any } = {},
  ) {
    const collection = await this.collection<T>(collectionName);
    return collection.insertMany(documents, options);
  }
}

// Create and export a singleton instance
export const db = Database.getInstance();
