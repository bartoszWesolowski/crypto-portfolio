import { TransactionAggregateResult } from '../../api/storage/TransactionsSummaryDbClient';

import { BinanceApiClient } from '../../api/binance/BinanceApiClient';

export class TransactionSummaryCurrentAssetPriceDecorator {
  binanceApi: BinanceApiClient;

  constructor(binanceApi: BinanceApiClient) {
    this.binanceApi = binanceApi;
  }

  async decorate(transactions: TransactionAggregateResult[]) {
    const prices = await this.binanceApi.getAllPrices();
    return transactions.map((t) => {
      const [c1, c2] = t.pair.split('-');
      const binancePair = `${c1}${c2}`;
      const price = prices[binancePair];
      if (price) {
        return Object.assign({}, t, { price: price });
      }
      return t;
    });
  }
}
