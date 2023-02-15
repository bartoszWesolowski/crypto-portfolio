import {
  BinanceApiClient,
  PriceInTimeParams,
} from '../../api/binance/BinanceApiClient';

import { TransactionItem } from '../../api/types';

const STABLE_COINS = ['BUSD', 'USDT', 'USDC', 'DAI'];
export class TransactionPriceInUsdDecorator {
  binanceApi: BinanceApiClient;

  constructor(binanceApi: BinanceApiClient) {
    this.binanceApi = binanceApi;
  }

  async decorate(transactions: TransactionItem[]) {
    const mapped = transactions.map(async (t) => {
      const priceInUsd = await this.getPriceInUsd(t);
      t.priceInUsd = priceInUsd;
      return t;
    });
    return Promise.all(mapped);
  }

  private async getPriceInUsd(t: TransactionItem) {
    console.log(typeof t.date);
    if (STABLE_COINS.includes(t.secondaryCurrency)) {
      return t.price;
    }

    return this.getPriceInUsdStableCoin(new Date(t.date), t.primaryCurrency);
  }

  private async getPriceInUsdStableCoin(date: Date, currency: string) {
    for (let i = 0; i < STABLE_COINS.length; i++) {
      const result = await this.getPriceInTimeSafely({
        date: date,
        primaryCurrency: currency,
        secondaryCurrency: STABLE_COINS[i],
      });
      if (result > 0) {
        return result;
      }
    }
    return 0;
  }

  private async getPriceInTimeSafely(params: PriceInTimeParams) {
    try {
      const result = await this.binanceApi.getPriceInTime(params);
      if (result) {
        return result.closePrice;
      }
    } catch (e) {
      console.error(
        `Failed to get price for transaction ${JSON.stringify(params)}, ${e}`,
      );
    }

    return 0;
  }
}
