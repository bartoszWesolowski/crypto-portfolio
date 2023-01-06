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
  id: string;
  cryptoMarket: 'Zonda' | 'Binance' | 'Crypto.com' | string;
  comment?: string;
}

export type TransactionsFileProvider = 'ZONDA' | 'BINANCE';
