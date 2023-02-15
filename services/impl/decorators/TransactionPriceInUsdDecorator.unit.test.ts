import {
  BinanceApiClient,
  PriceInTimeParams,
} from '../../api/binance/BinanceApiClient';

import { TransactionItem } from '../../api/types';
import { describe, it, expect } from 'vitest';
import { TransactionPriceInUsdDecorator } from './TransactionPriceInUsdDecorator';
describe('Price in USD decorator', () => {
  it('should not call api when converting price from USD stable coin', async () => {
    const transaction = {
      primaryCurrency: 'ETH',
      secondaryCurrency: 'USDT',
      price: 1700,
    } as TransactionItem;

    const decorator = new TransactionPriceInUsdDecorator(
      {} as BinanceApiClient,
    );

    const result = await decorator.decorate([transaction]);
    expect(result[0]).toEqual({
      primaryCurrency: 'ETH',
      secondaryCurrency: 'USDT',
      price: 1700,
      priceInUsd: 1700,
    });
  });
});
