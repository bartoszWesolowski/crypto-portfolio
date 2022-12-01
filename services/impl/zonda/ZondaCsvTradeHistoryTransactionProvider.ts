import { TransactionItem, TransactionProvider } from "../../api/TransactionProcessor";
import csv from "csv-parser";
import str from "string-to-stream"



export class ZondaCsvTradeHistoryTransactionProvider implements TransactionProvider {
    transactionHistoryCsv: string;

    constructor(transactionHistoryCsv: string) {
        this.transactionHistoryCsv = transactionHistoryCsv;
    }

    getTransactions(): TransactionItem[] {
        str(this.transactionHistoryCsv).pipe(csv({separator: ";"}))
        .on('data', (data => console.log(data)));
        return [];
    }

    private mapItem(csvItem: ZondaCsvItem): TransactionItem {

        return {} as TransactionItem;
    }
}