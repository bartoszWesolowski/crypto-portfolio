import { TransactionItem } from '../../../api/types';
import { BinanceTradeHistoryCsvItem } from '../BinanceTypes';
import { BINANCE_DATE_PARSER } from '../BinanceDateParser';
import { parseBinancePairSyntax, removeLetters } from '../tools';

export class BinanceCsvTransactionItem implements TransactionItem {
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

  constructor(csvItem: BinanceTradeHistoryCsvItem) {
    this._id = '';
    this.price = parseFloat(csvItem.Price);
    this.amount = parseFloat(removeLetters(csvItem.Executed));
    this.value = parseFloat(removeLetters(csvItem.Amount));
    this.type = (csvItem.Side ?? '').toUpperCase();
    this.cryptoMarket = 'Binance';
    this.date = BINANCE_DATE_PARSER.parseDate(csvItem['Date(UTC)']);

    const market = parseBinancePairSyntax(csvItem.Pair);
    this.primaryCurrency = market[0];
    this.secondaryCurrency = market[1];
    this.pair = `${this.primaryCurrency}-${this.secondaryCurrency}`;
  }
}
