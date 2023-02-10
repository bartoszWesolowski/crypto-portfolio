import moment from 'moment';
import { DateParser } from '../../api/date/DateParser';

// TODO: handle time zone correctly
// 2022-06-19 10:10:44 (UTC)
const ZONDA_DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

export class BinanceDateParser implements DateParser {
  parseDate(date: string): Date {
    return moment.parseZone(date, ZONDA_DATE_FORMAT).toDate();
  }
}

export const BINANCE_DATE_PARSER = new BinanceDateParser();
