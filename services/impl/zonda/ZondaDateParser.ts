import moment from "moment";
import { DateParser } from "../../api/date/DateParser";

// TODO: handle time zone correctly
const ZONDA_DATE_FORMAT = "DD-MM-YYYY hh:mm:ss UTC";

export class ZondaDateParser implements DateParser {
  parseDate(date: string): Date {
    return moment.parseZone(date, ZONDA_DATE_FORMAT).toDate();
  }
}
