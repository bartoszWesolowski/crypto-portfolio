import { TransactionItem, TransactionProvider } from '../../../api/types';
import csv from 'csv-parser';
import str from 'string-to-stream';
import { BinanceCsvTransactionItem } from './BinanceCsvTransactionItem';
import { BinanceTradeHistoryCsvItem } from '../BinanceTypes';

export class BinanceCsvTradeHistoryTransactionProvider
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
              separator: ',',
              headers: [
                'Date(UTC)',
                'Pair',
                'Side',
                'Price',
                'Executed',
                'Amount',
                'Fee',
              ],
              skipLines: 1,
            }),
          )
          .on('headers', (headers) => {
            console.log(headers);
          })
          .on('data', (data) => {
            try {
              items.push(this.mapItem(data as BinanceTradeHistoryCsvItem));
            } catch (e) {
              console.error('Failed to process item');
              console.log(data);
              console.error(e);
            }
          })
          .on('end', () => {
            console.log('Finished processing Binance Csv');
            resolve(items);
          });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  private mapItem(csvItem: BinanceTradeHistoryCsvItem): TransactionItem {
    return new BinanceCsvTransactionItem(csvItem);
  }
}
