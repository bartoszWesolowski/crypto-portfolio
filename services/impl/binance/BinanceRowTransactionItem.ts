import moment from 'moment';
import { Row } from 'read-excel-file';
import { DateParser } from '../../api/date/DateParser';
import { TransactionItem } from '../../api/types';
import { BinanceDateParser } from './BinanceDateParser';
import { BinanceExcelTransactionRow, BINANCE_COIN_IDS } from './BinanceTypes';

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
    const market = this.parseBinancePairSyntax(row.Market);
    this.primaryCurrency = market[0];
    this.secondaryCurrency = market[1];
    this.pair = `${this.primaryCurrency}-${this.secondaryCurrency}`;
    this._id = '';
    this.cryptoMarket = 'BINANCE';
  }

  private parseBinancePairSyntax(market: string) {
    for (let i = 0; i < BINANCE_COIN_IDS.length; i++) {
      const coinToCheck = BINANCE_COIN_IDS[i];
      if (market.startsWith(coinToCheck)) {
        const regex = new RegExp(`^${coinToCheck}`);
        const otherCoin = market.replace(regex, '');
        if (BINANCE_COIN_IDS.indexOf(otherCoin) !== -1) {
          return [coinToCheck, otherCoin];
        }
      }
    }
    throw new Error(
      `Unrecognized coin pair ${market}. Unable to parse Binance transaction`,
    );
  }
}
