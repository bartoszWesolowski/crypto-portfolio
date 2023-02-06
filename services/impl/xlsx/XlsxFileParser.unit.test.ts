import fs from 'fs';
import { parseSheet, parseXlsx } from './XlsxFileParser';
import { describe, it, expect } from 'vitest';
describe('Xlsx parser', () => {
  it('should parse file correctly', async () => {
    const content = fs.readFileSync(__dirname + '/transactions.xlsx');
    const excel = parseXlsx(content);
    const parsedSheet = parseSheet(excel[0]);
    expect(parsedSheet).toEqual([
      {
        'Date(UTC)': '2022-06-22 11:06:05',
        Market: 'BNBUSDT',
        Type: 'BUY',
        Price: '215.3',
        Amount: '0.08',
        Total: '17.224',
        Fee: '0.00006',
        'Fee Coin': 'BNB',
      },
      {
        'Date(UTC)': '2022-06-19 10:10:44',
        Market: 'BTCUSDT',
        Type: 'BUY',
        Price: '19003.7',
        Amount: '0.00142',
        Total: '26.985254',
        Fee: '0.00010164',
        'Fee Coin': 'BNB',
      },
    ]);
  });
});
