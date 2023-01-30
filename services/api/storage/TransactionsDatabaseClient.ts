import { TransactionItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from './MongoDbClient';
const transactions: TransactionItem[] = [];

export interface TransactionsDbClient {
  saveTransactions(userId: string, transactions: TransactionItem[]): void;

  getTransactions(userId: string): Promise<TransactionItem[]>;
}

export class TransactionsDbClientImpl implements TransactionsDbClient {
  async getTransactions(userId: string): Promise<TransactionItem[]> {
    const db = await connectToDatabase();
    db.collection('users')
    return Promise.resolve(transactions);
  }

  saveTransactions(userId: string, transactions: TransactionItem[]) {
    const withIds = transactions.map((t) => {
      if (!t.id) {
        t.id = uuidv4();
      }
      return t;
    });
    transactions.push(...withIds);
  }
}
