import { ObjectId } from 'mongodb';

export type Currency =
  | string
  | 'BTC'
  | 'ETH'
  | 'PLN'
  | 'BUSD'
  | 'USDT'
  | 'GAME'
  | 'BAT';

export interface TransactionItem {
  date: Date;
  type: 'SELL' | 'BUY' | string;
  pair: string;
  price: number;
  amount: number;
  value: number;
  primaryCurrency: string;
  secondaryCurrency: string;
  description?: string;
  _id: string | ObjectId;
  priceInUsd?: number;
  cryptoMarket: 'Zonda' | 'Binance' | 'Crypto.com' | string;
  comment?: string;
}

export interface TransactionProvider {
  getTransactions(): TransactionItem[] | Promise<TransactionItem[]>;
}

export type TransactionsFileProvider = 'ZONDA' | 'BINANCE';

export type User = {
  _id?: string | any;
  userId: string;
  transactions: TransactionItem[];
  email: string;
};
