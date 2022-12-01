export type Currency = string | "BTC" | "ETH" | "PLN" | "BUSD" | "USDT" | "GAME" | "BAT";

export interface TransactionItem {
    date: Date;
    type: 'SELL' | 'BUY';
    price: number;
    amount: number;
    cost: number;
    currencyBought: string;
    currencySold: string;
    marketLabel: string;
    description: string;
    id: string;
    cryptoMarket: "Zonda" | "Binance" | "Crypto.com" | string;
}

export interface TransactionProvider {
    getTransactions() : TransactionItem[];
}
