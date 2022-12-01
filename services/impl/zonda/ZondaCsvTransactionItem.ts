import { TransactionItem } from "../../api/TransactionProcessor";
import { ZondaCsvItem } from "./ZondaTypes";

export class ZondaCsvTransactionItem implements TransactionItem {
    date: Date;
    type: "SELL" | "BUY";
    price: number;
    amount: number;
    cost: number;
    currencyBought: string;
    currencySold: string;
    marketLabel: string;
    description: string;
    id: string;
    cryptoMarket: string;

    constructor(zondaCsvItem: ZondaCsvItem) {

    }
}