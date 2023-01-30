import { User } from 'api/types';
import { Document, InsertOneResult } from 'mongodb';
import { usersCollection } from './MongoDbClient';

export interface RegisterDbClient {
  registerUser(user: User): Promise<InsertOneResult<Document>>;
}

export class RegisterDbClientImpl implements RegisterDbClient {
  async registerUser(user: User): Promise<InsertOneResult<Document>> {
    const db = await usersCollection();
    return db.insertOne(user);
  }
}
