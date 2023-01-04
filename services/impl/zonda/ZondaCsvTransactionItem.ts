import moment from 'moment';
import { DateParser } from '../../api/date/DateParser';
import { TransactionItem } from '../../api/TransactionProcessor';
import { ZondaDateParser } from './ZondaDateParser';
import { ZondaCsvItem } from './ZondaTypes';

export class ZondaCsvTransactionItem implements TransactionItem {
  date: Date;
  type: 'SELL' | 'BUY' | string;
  pair: string;
  price: number;
  amount: number;
  value: number;
  primaryCurrency: string;
  secondaryCurrency: string;
  id: string;
  cryptoMarket: string;

  dateParser: DateParser;

  constructor(zondaCsvItem: ZondaCsvItem) {
    this.dateParser = new ZondaDateParser();
    this.id = zondaCsvItem.ID;
    [this.primaryCurrency, this.secondaryCurrency] =
      zondaCsvItem.Market.split('-');
    this.price = parseFloat(zondaCsvItem.Rate);
    this.amount = parseFloat(zondaCsvItem.Amount);
    this.value = parseFloat(zondaCsvItem.Value);
    this.pair = zondaCsvItem.Market;
    this.type = (zondaCsvItem.Action ?? '').toUpperCase();
    this.cryptoMarket = 'Zonda';
    this.date = this.dateParser.parseDate(zondaCsvItem['Operation date']);
  }
}
