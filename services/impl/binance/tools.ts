import { BINANCE_COIN_IDS } from './BinanceTypes';

export function parseBinancePairSyntax(market: string): [string, string] {
  for (let i = 0; i < BINANCE_COIN_IDS.length; i++) {
    const coinToCheck = BINANCE_COIN_IDS[i];
    if (market.startsWith(coinToCheck)) {
      const regex = new RegExp(`^${coinToCheck}`);
      const otherCoin = market.replace(regex, '');
      if (BINANCE_COIN_IDS.indexOf(otherCoin) !== -1) {
        return [coinToCheck, otherCoin];
      }
    }
  }
  throw new Error(
    `Unrecognized coin pair ${market}. Unable to parse Binance transaction`,
  );
}

export function removeLetters(text: string) {
  return text.replace(/[A-Z]+/, '').replace('1INCH', '');
}
