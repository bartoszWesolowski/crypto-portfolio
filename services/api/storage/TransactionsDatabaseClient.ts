import { TransactionItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase, usersCollection } from './MongoDbClient';
import { UpdateResult } from 'mongodb';
import { ObjectID } from 'bson';
const transactions: TransactionItem[] = [];

export interface TransactionsDbClient {
  saveTransactions(
    userId: string,
    transactions: TransactionItem[],
  ): Promise<UpdateResult>;

  getTransactions(userId: string): Promise<TransactionItem[]>;
}

export class TransactionsDbClientImpl implements TransactionsDbClient {
  async getTransactions(userId: string): Promise<TransactionItem[]> {
    const db = await usersCollection();
    const result = await db.findOne({ userId: userId });
    return (result?.transactions || []) as TransactionItem[];
  }

  async saveTransactions(
    userId: string,
    transactions: TransactionItem[],
  ): Promise<UpdateResult> {
    const db = await usersCollection();
    const withId = transactions.map((t) => {
      if (!t._id) {
        t._id = new ObjectID();
      }
      return t;
    });
    return db.updateOne(
      { userId: userId },
      {
        $push: {
          transactions: {
            $each: withId,
            $position: -1,
          },
        },
      },
    );
  }
}
