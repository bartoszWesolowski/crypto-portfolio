import { ZondaCsvTradeHistoryTransactionProvider } from '../ZondaCsvTradeHistoryTransactionProvider';
import fs from 'fs';
import { describe, it, expect } from 'vitest';

describe('Zonda csv parser', () => {
  it('should parse file correctly', async () => {
    const content = fs.readFileSync(
      __dirname + '/zonda-transaction-example.csv',
    );
    const parser = new ZondaCsvTradeHistoryTransactionProvider(
      content.toString(),
    );
    const transactions = await parser.getTransactions();
    console.log(transactions);
    expect(transactions).toEqual(
      expect.arrayContaining([
        {
          date: new Date('2021-03-29T07:27:09.000Z'),
          type: 'BUY',
          pair: 'ETH-PLN',
          price: 6750,
          amount: 0.00374213,
          value: 25.26,
          primaryCurrency: 'ETH',
          secondaryCurrency: 'PLN',
          comment: 'efc4efd7-9070-11eb-b03f-0242ac110012',
          cryptoMarket: 'Zonda',
          _id: '',
        },
        {
          date: new Date('2021-03-31T11:09:05.000Z'),
          type: 'SELL',
          pair: 'GAME-PLN',
          price: 1.56,
          amount: 130,
          value: 202.8,
          primaryCurrency: 'GAME',
          secondaryCurrency: 'PLN',
          comment: '45a5cfdf-9222-11eb-9fae-0242ac11000b',
          cryptoMarket: 'Zonda',
          _id: '',
        },
      ]),
    );
  });

  it('should parse large file correctly', async () => {
    const content = fs.readFileSync(
      __dirname + '/zonda-transaction-history-01-03-2022-en.csv',
    );
    const parser = new ZondaCsvTradeHistoryTransactionProvider(
      content.toString(),
    );
    const transactions = await parser.getTransactions();
  });
});
