import { NumberList } from 'aws-sdk/clients/iot';
import axios, { AxiosResponse } from 'axios';

const BINANCE_ENDPOINT = 'https://api.binance.com';
type BinancePriceEntry = {
  symbol: string;
  price: string;
};

interface BinancePriceResponse {
  [pair: string]: number;
}

export type PriceInTimeParams = {
  date: Date;
  primaryCurrency: string;
  secondaryCurrency: string;
};

export type KLineObject = (string | number)[];
export type BinanceKLinesResponse = KLineObject[];
export class KLine {
  openTime: number;
  closePrice: number;

  constructor(kLine: KLineObject) {
    this.openTime = kLine[0] as number;
    this.closePrice = parseFloat(kLine[4] as string);
  }
}
export class BinanceApiClient {
  async getAllPrices() {
    const response: AxiosResponse<BinancePriceEntry[]> = await axios.get(
      `${BINANCE_ENDPOINT}/api/v3/ticker/price`,
    );
    const result: BinancePriceResponse = {};
    response.data.forEach((e) => {
      result[e.symbol] = parseFloat(e.price);
    });

    return result;
  }

  async getPriceInTime(params: PriceInTimeParams) {
    const endTime = new Date(params.date);
    endTime.setMinutes(params.date.getMinutes() + 2);
    const response: AxiosResponse<BinanceKLinesResponse> = await axios.get(
      `${BINANCE_ENDPOINT}/api/v3/klines`,
      {
        params: {
          symbol: `${params.primaryCurrency}${params.secondaryCurrency}`,
          interval: '1m',
          startTime: params.date.getTime(),
          endTime: endTime.getTime(),
        },
      },
    );

    if (response.data.length >= 1) {
      return new KLine(response.data[0]);
    }
    return null;
  }
  
}
