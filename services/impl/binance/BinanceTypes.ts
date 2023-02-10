export interface BinanceExcelTransactionRow {
  'Date(UTC)': string;
  Market: string;
  Type: 'BUY' | 'SELL';
  Price: string;
  Amount: string;
  Total: string;
  Fee: string;
  'Fee Coin': string;
}

export interface BinanceTradeHistoryCsvItem {
  'Date(UTC)': string;
  Pair: string;
  Side: 'Sell' | 'Buy';
  Price: string;
  Executed: string;
  Amount: string;
  Fee: string;
}

export const BINANCE_COIN_IDS = [
  'BTC',
  'WBTC',
  'ETH',
  'BNB',
  'BAT',
  'COMP',
  'DOGE',
  'DGB',
  'VET',
  'LINK',
  'CHZ',
  'AMP',
  'MATIC',
  'VTHO',
  '1INCH',
  'SHIB',
  'SANTOS',
  'DOT',
  'GALA',
  'SOL',
  'CTSI',
  'FTM',
  'LTC',
  'HBAR',
  'AUDIO',
  'ALPHA',
  'FLOW',
  'CAKE',
  'ADA',
  'COMP',
  'PROS',
  'STX',
  'XNO',
  'USDT',
  'BUSD',
];
