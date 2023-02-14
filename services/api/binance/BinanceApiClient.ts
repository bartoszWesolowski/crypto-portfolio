import axios, { AxiosResponse } from 'axios';

type BinancePriceEntry = {
  symbol: string;
  price: string;
};

interface BinancePriceResponse {
  [pair: string]: number;
}

export class BinanceApiClient {
  async getAllPrices() {
    const response: AxiosResponse<BinancePriceEntry[]> = await axios.get(
      'https://api.binance.com/api/v3/ticker/price',
    );
    const result: BinancePriceResponse = {};
    response.data.forEach((e) => {
      result[e.symbol] = parseFloat(e.price);
    });

    return result;
  }
}

