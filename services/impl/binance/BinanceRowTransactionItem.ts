import { TransactionItem } from '../../api/types';
import { BinanceDateParser } from './BinanceDateParser';
import { BinanceExcelTransactionRow } from './BinanceTypes';
import { parseBinancePairSyntax } from './tools';

const dateParser = new BinanceDateParser();
export class BinanceRowTransactionItem implements TransactionItem {
  date: Date;
  type: 'SELL' | 'BUY' | string;
  pair: string;
  price: number;
  amount: number;
  value: number;
  primaryCurrency: string;
  secondaryCurrency: string;
  _id: string;
  comment?: string;
  cryptoMarket: string;

  constructor(row: BinanceExcelTransactionRow) {
    this.date = dateParser.parseDate(row['Date(UTC)']);
    this.type = row.Type;
    this.price = parseFloat(row.Price);
    this.amount = parseFloat(row.Amount);
    this.value = parseFloat(row.Total);
    const market = parseBinancePairSyntax(row.Market);
    this.primaryCurrency = market[0];
    this.secondaryCurrency = market[1];
    this.pair = `${this.primaryCurrency}-${this.secondaryCurrency}`;
    this._id = '';
    this.cryptoMarket = 'BINANCE';
  }
}
