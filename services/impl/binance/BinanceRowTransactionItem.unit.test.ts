import { BinanceRowTransactionItem } from './BinanceRowTransactionItem';
import { BinanceExcelTransactionRow } from './BinanceTypes';
import { describe, it, expect } from 'vitest';

describe('Binance transaction item', () => {
  it('should  be created correctly based on excel item', async () => {
    const excelRow = {
      'Date(UTC)': '2022-06-19 10:10:44',
      Market: 'BTCUSDT',
      Type: 'BUY',
      Price: '19003.7',
      Amount: '0.00142',
      Total: '26.985254',
      Fee: '0.00010164',
      'Fee Coin': 'BNB',
    } as BinanceExcelTransactionRow;
    const transactionItem = new BinanceRowTransactionItem(excelRow);
    expect(transactionItem).toEqual({
      date: new Date('2022-06-19T10:10:44.000Z'),
      type: 'BUY',
      pair: 'BTC-USDT',
      price: 19003.7,
      amount: 0.00142,
      value: 26.985254,
      primaryCurrency: 'BTC',
      secondaryCurrency: 'USDT',
      _id: '',
      cryptoMarket: 'BINANCE',
    });
  });
  it('should  be created correctly based on excel item with other coin pair', async () => {
    const excelRow = {
      'Date(UTC)': '2022-06-19 10:10:44',
      Market: 'WBTCBUSD',
      Type: 'BUY',
      Price: '19003.7',
      Amount: '0.00142',
      Total: '26.985254',
      Fee: '0.00010164',
      'Fee Coin': 'BNB',
    } as BinanceExcelTransactionRow;
    const transactionItem = new BinanceRowTransactionItem(excelRow);
    expect(transactionItem).toEqual({
      date: new Date('2022-06-19T10:10:44.000Z'),
      type: 'BUY',
      pair: 'WBTC-BUSD',
      price: 19003.7,
      amount: 0.00142,
      value: 26.985254,
      primaryCurrency: 'WBTC',
      secondaryCurrency: 'BUSD',
      _id: '',
      cryptoMarket: 'BINANCE',
    });
  });
});
