import { TransactionItem, TransactionProvider } from '../../api/types';
import { BinanceRowTransactionItem } from './BinanceRowTransactionItem';
import { BinanceExcelTransactionRow } from './BinanceTypes';

export class BinanceExcelTradeHistoryTransactionProvider
  implements TransactionProvider
{
  transactionHistorySheet: BinanceExcelTransactionRow[];

  constructor(transactionHistorySheet: BinanceExcelTransactionRow[]) {
    this.transactionHistorySheet = transactionHistorySheet;
  }

  getTransactions(): TransactionItem[] {
    return this.transactionHistorySheet.map((item) => this.mapItem(item));
  }

  private mapItem(row: BinanceExcelTransactionRow): TransactionItem {
    return new BinanceRowTransactionItem(row);
  }
}
