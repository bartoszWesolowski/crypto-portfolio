import { ZondaCsvTradeHistoryTransactionProvider } from "../ZondaCsvTradeHistoryTransactionProvider";
import { describe, it, expect } from "vitest";
import fs from "fs";

describe("Zonda csv parser", () => {

    it("should parse file correctly", () => {
        const content = fs.readFileSync(__dirname + "/zonda-transaction-example.csv");
        const parser = new ZondaCsvTradeHistoryTransactionProvider(content.toString());
        parser.getTransactions();
    })
})