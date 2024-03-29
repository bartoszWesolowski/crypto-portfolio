export interface BinanceTradeHistoryCsvItem {
  Market: string;
  'Operation date': string;
  Action: 'Sell' | 'Buy';
  Type: string;
  Rate: string;
  Amount: string;
  Value: string;
  ID: string;
}
