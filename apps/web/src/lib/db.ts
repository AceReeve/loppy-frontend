/* eslint-disable @typescript-eslint/no-explicit-any -- allow any */
import { type Db, type OptionalUnlessRequiredId } from "mongodb";
import clientPromise from "./mongodb";

export class Database {
  private static instance: Database | undefined;
  private db: Db | null = null;
  private initPromise: Promise<void>;

  private constructor() {
    this.initPromise = this.initialize();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async initialize(): Promise<void> {
    const client = await clientPromise;
    this.db = client.db();
  }

  public async ready(): Promise<void> {
    await this.initPromise;
  }

  public collection<T extends Document>(name: string) {
    if (!this.db) {
      throw new Error(
        "Database not initialized. Call ready() before using the database.",
      );
    }
    return this.db.collection<T>(name);
  }

  public findOne<T extends Document>(
    collectionName: string,
    query: Record<string, any>,
  ) {
    return this.collection<T>(collectionName).findOne(query);
  }

  public find<T extends Document>(
    collectionName: string,
    query: Record<string, any>,
    options: {
      sort?: Record<string, 1 | -1>;
      skip?: number;
      limit?: number;
      collation?: { locale: string; strength: number };
    } = {},
  ) {
    return this.collection<T>(collectionName)
      .find(query)
      .sort(options.sort ?? {})
      .skip(options.skip ?? 0)
      .limit(options.limit ?? 0)
      .collation(options.collation ?? {})
      .toArray();
  }

  public updateOne<T extends Document>(
    collectionName: string,
    filter: Record<string, any>,
    update: Record<string, any>,
    options: { upsert?: boolean } = {},
  ) {
    return this.collection<T>(collectionName).updateOne(
      filter,
      update,
      options,
    );
  }

  public bulkWrite<T extends Document>(
    collectionName: string,
    operations: any[],
  ) {
    return this.collection<T>(collectionName).bulkWrite(operations);
  }

  public countDocuments(collectionName: string, query: Record<string, any>) {
    return this.collection(collectionName).countDocuments(query);
  }

  public deleteOne<T extends Document>(
    collectionName: string,
    filter: Record<string, any>,
  ) {
    return this.collection<T>(collectionName).deleteOne(filter);
  }

  public deleteMany<T extends Document>(
    collectionName: string,
    filter: Record<string, any>,
  ) {
    return this.collection<T>(collectionName).deleteMany(filter);
  }

  public insertOne<T extends Document>(
    collectionName: string,
    document: OptionalUnlessRequiredId<T>,
    options: { writeConcern?: any } = {},
  ) {
    return this.collection<T>(collectionName).insertOne(document, options);
  }

  public insertMany<T extends Document>(
    collectionName: string,
    documents: OptionalUnlessRequiredId<T>[],
    options: { ordered?: boolean; writeConcern?: any } = {},
  ) {
    return this.collection<T>(collectionName).insertMany(documents, options);
  }
}

// Create and export a singleton instance
export const db = Database.getInstance();
