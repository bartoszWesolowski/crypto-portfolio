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

export const BINANCE_COIN_IDS = [
  'BTC',
  'WBTC',
  'ETH',
  'BNB',
  'BAT',
  'COMP',
  'DOGE',
  'VET',
  'LINK',
  'CHZ',
  'AMP',
  'MATIC',
  'SANTOS',
  'DOT',
  'GALA',
  'SOL',
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
