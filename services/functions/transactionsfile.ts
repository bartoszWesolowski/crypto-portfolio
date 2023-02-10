import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';
import { parseSheet, parseXlsx } from '../impl/xlsx/XlsxFileParser';
import { S3UserStorageClient } from '../api/storage/StorageClient';
import { S3 } from 'aws-sdk';
import { ZondaCsvTradeHistoryTransactionProvider } from '../impl/zonda/ZondaCsvTradeHistoryTransactionProvider';
import { BinanceExcelTradeHistoryTransactionProvider } from '../impl/binance/BinanceExcelTradeHistoryTransactionProvider';
import { TransactionProvider } from 'api/types';
import { BinanceExcelTransactionRow } from 'impl/binance/BinanceTypes';
import { BinanceCsvTradeHistoryTransactionProvider } from '../impl/binance/csv/BinanceCsvTradeHistoryTransactionProvider';
class ImportTransactionHistoryFile implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
    const fileKey = event.queryStringParameters?.fileKey;
    if (!fileKey) {
      return {
        statusCode: 400,
        body: {
          message: 'Missing file key',
        },
      };
    }

    const storageClient = new S3UserStorageClient(identity);

    const file = await storageClient.getFile({ fileName: fileKey });

    const transactions = await this.getTransactions(
      file,
      event.queryStringParameters?.type ?? '',
    );
    return {
      statusCode: 200,
      body: {
        message: 'Processing transactions from Event',
        transactions: transactions,
      },
    };
  }

  // TODO: implement it better
  private async getTransactions(
    file: S3.GetObjectOutput,
    type: 'ZONDA' | string,
  ) {
    let provider: TransactionProvider | null = null;
    if (type == 'ZONDA') {
      const csvBody = file.Body?.toString('utf-8');
      console.log(csvBody);
      provider = new ZondaCsvTradeHistoryTransactionProvider(csvBody ?? '');
    }
    if (type == 'BINANCE_CSV') {
      const csvBody = file.Body?.toString('utf-8');
      provider = new BinanceCsvTradeHistoryTransactionProvider(csvBody ?? '');
    }
    if (type === 'BINANCE') {
      if (file.Body) {
        const excel = parseXlsx(file.Body);
        const rows = parseSheet(excel[0]) as BinanceExcelTransactionRow[];
        provider = new BinanceExcelTradeHistoryTransactionProvider(rows);
      }
    }
    if (provider) {
      return await provider.getTransactions();
    }
    return [];
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new ImportTransactionHistoryFile(),
);
