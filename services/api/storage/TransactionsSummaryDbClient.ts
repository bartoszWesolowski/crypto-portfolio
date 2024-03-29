import { usersCollection } from './MongoDbClient';
import { AggregationCursor } from 'mongodb';
import { Document, Timestamp } from 'bson';

export type TransactionAggregateResult = {
  pair: string;
  amountBought: number;
  amountSpent: number;
  amountSold: number;
  amountEarned: number;
};

export type AggregationResult = {
  _id: string;
  amountBought?: number;
  amountSpent?: number;
  amountSold?: number;
  amountEarned: number;
};

export type TransactionsSummary = {
  lastModified: Timestamp;
  transactions: TransactionAggregateResult[];
};

export type PortfolioSummary = {
  transactionsSummary: TransactionsSummary;
};

export type PortfolioSummaryResponse = {
  summary: PortfolioSummary;
};

export class TransactionsSummaryDbClientImpl {
  async getTransactionsSummary(
    userId: string,
  ): Promise<PortfolioSummary | null> {
    const db = await usersCollection();
    const result = await db.findOne(
      { userId: userId },
      { projection: { 'summary.transactionsSummary.transactions': 1 } },
    );

    if (result) {
      return (result as unknown as PortfolioSummaryResponse).summary;
    }
    return null;
  }

  async calculateTransactionsSummary(
    userId: string,
  ): Promise<TransactionAggregateResult[]> {
    const db = await usersCollection();

    const buyAggregateCursor: AggregationCursor<Document> = await db.aggregate([
      { $match: { userId: userId } },
      {
        $unwind: {
          path: '$transactions',
          includeArrayIndex: 'index',
          preserveNullAndEmptyArrays: false,
        },
      },
      { $match: { 'transactions.type': 'BUY' } },
      {
        $group: {
          _id: '$transactions.pair',
          amountBought: { $sum: '$transactions.amount' },
          amountSpent: { $sum: '$transactions.value' },
        },
      },
    ]);
    const sellAggregateCursor: AggregationCursor<Document> = await db.aggregate(
      [
        { $match: { userId: userId } },
        {
          $unwind: {
            path: '$transactions',
            includeArrayIndex: 'index',
            preserveNullAndEmptyArrays: false,
          },
        },
        { $match: { 'transactions.type': 'SELL' } },
        {
          $group: {
            _id: '$transactions.pair',
            amountSold: { $sum: '$transactions.amount' },
            amountEarned: { $sum: '$transactions.value' },
          },
        },
      ],
    );

    const allBought = await this.getAllResults(buyAggregateCursor);
    const allSold = await this.getAllResults(sellAggregateCursor);
    return this.combineAggregationResults(allBought, allSold);
  }

  async saveTransactionsSummary(
    userId: string,
    summary: TransactionAggregateResult[],
  ) {
    const db = await usersCollection();
    return await db.updateOne(
      { userId: userId },
      {
        $currentDate: {
          lastModified: true,
          'summary.transactionsSummary.lastModified': { $type: 'timestamp' },
        },
        $set: {
          'summary.transactionsSummary.transactions': summary,
        },
      },
    );
  }

  private async getAllResults(cursor: AggregationCursor<Document>) {
    const results: Record<string, AggregationResult> = {};
    let hasNext = await cursor.hasNext();
    while (hasNext) {
      const next = ((await cursor.next()) ?? {}) as AggregationResult;
      if (next._id) {
        results[next._id] = next;
      }
      console.log(`Checking next cursor result ${JSON.stringify(next)}`);
      hasNext = await cursor.hasNext();
    }
    return results;
  }

  private combineAggregationResults(
    bought: Record<string, AggregationResult>,
    sold: Record<string, AggregationResult>,
  ) {
    const result: TransactionAggregateResult[] = [];
    const allKeys = new Set([...Object.keys(bought), ...Object.keys(sold)]);
    console.log(allKeys);
    allKeys.forEach((key) => {
      const boughtEntry = bought[key] || {};
      const soldEntry = sold[key] || {};
      const merged = Object.assign({ pair: key }, boughtEntry, soldEntry, {
        _id: undefined,
      }) as TransactionAggregateResult;
      result.push(merged);
    });
    return result;
  }
}
