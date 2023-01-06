import { TransactionItem, TransactionProvider } from '../../api/types';
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
      try {
        str(this.transactionHistoryCsv)
          .pipe(
            csv({
              separator: ';',
              headers: [
                'Market',
                'Operation date',
                'Action',
                'Type',
                'Rate',
                'Amount',
                'Value',
                'ID',
              ],
              skipLines: 1,
            }),
          )
          .on('headers', (headers) => {
            console.log(headers);
          })
          .on('data', (data) => {
            console.log(`Processing data`);
            console.log(data);
            items.push(this.mapItem(data));
            console.log('Item added');
          })
          .on('end', () => {
            console.log(items);
            resolve(items);
          });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  private mapItem(csvItem: ZondaCsvItem): TransactionItem {
    return new ZondaCsvTransactionItem(csvItem);
  }
}
