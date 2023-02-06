import fs from 'fs';
import path from 'path';
import { parseExcelDate } from 'read-excel-file';
import { parseSheet, parseXlsx } from '../../xlsx/XlsxFileParser';
import { BinanceRowTransactionItem } from '../BinanceRowTransactionItem';
import { BinanceTradeHistoryTransactionProvider } from '../BinanceTradeHistoryTransactionProvider';
import { BinanceExcelTransactionRow } from '../BinanceTypes';
describe('Binance xlsx parser', () => {
  it('should parse file correctly', async () => {
    const rows = getTransactionRows('transactions.xlsx');
    const parser = new BinanceTradeHistoryTransactionProvider(rows);
    const parsed = parser.getTransactions();
    expect(parsed).toHaveLength(2);
    expect(parsed).toEqual([
      {
        date: new Date('2022-06-22T11:06:05.000Z'),
        type: 'BUY',
        price: 215.3,
        amount: 0.08,
        value: 17.224,
        primaryCurrency: 'BNB',
        secondaryCurrency: 'USDT',
        pair: 'BNB-USDT',
        _id: '',
        cryptoMarket: 'BINANCE',
      },
      {
        date: new Date('2022-06-19T10:10:44.000Z'),
        type: 'BUY',
        price: 19003.7,
        amount: 0.00142,
        value: 26.985254,
        primaryCurrency: 'BTC',
        secondaryCurrency: 'USDT',
        pair: 'BTC-USDT',
        _id: '',
        cryptoMarket: 'BINANCE',
      },
    ]);
  });

  it('should parse file containing large number of transactions correctly', async () => {
    const rows = getTransactionRows('transactions-1.xlsx');
    const parser = new BinanceTradeHistoryTransactionProvider(rows);
    const parsed = parser.getTransactions();
    expect(parsed).toHaveLength(167);
  });
  
  it('should parse other file containing large number of transactions correctly', async () => {
    const rows = getTransactionRows('transactions-2.xlsx');
    const parser = new BinanceTradeHistoryTransactionProvider(rows);
    const parsed = parser.getTransactions();
    expect(parsed).toHaveLength(163);
  });

  const getTransactionRows = (file: string) => {
    const content = fs.readFileSync(path.join(__dirname, file));
    const excel = parseXlsx(content);
    return parseSheet(excel[0]) as BinanceExcelTransactionRow[];
  };
});
