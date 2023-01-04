import {
  TransactionItem,
  TransactionProvider,
} from '../../api/TransactionProcessor';
import csv from 'csv-parser';
import str from 'string-to-stream';
import { ZondaCsvItem } from './ZondaTypes';
import { ZondaCsvTransactionItem } from './ZondaCsvTransactionItem';

export class ZondaCsvTradeHistoryTransactionProvider
  implements TransactionProvider
{
  transactionHistoryCsv: string;

  constructor(transactionHistoryCsv: string) {
    this.transactionHistoryCsv = transactionHistoryCsv;
  }

  getTransactions(): Promise<TransactionItem[]> {
    const items: TransactionItem[] = [];
    return new Promise((resolve, reject) => {
      str(this.transactionHistoryCsv)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => {
          console.log(data);
          items.push(this.mapItem(data));
        })
        .on('end', () => {
          console.log(items);
          resolve(items);
        });
    });
  }

  private mapItem(csvItem: ZondaCsvItem): TransactionItem {
    return new ZondaCsvTransactionItem(csvItem);
  }
}
