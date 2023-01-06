import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';

import { S3UserStorageClient } from '../api/storage/StorageClient';
import { S3 } from 'aws-sdk';
import { ZondaCsvTradeHistoryTransactionProvider } from '../impl/zonda/ZondaCsvTradeHistoryTransactionProvider';
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

  private async getTransactions(
    file: S3.GetObjectOutput,
    type: 'ZONDA' | string,
  ) {
    if (type == 'ZONDA') {
      const csvBody = file.Body?.toString('utf-8');
      console.log(csvBody);
      const provider = new ZondaCsvTradeHistoryTransactionProvider(
        csvBody ?? '',
      );
      return await provider.getTransactions();
    }
    return [];
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new ImportTransactionHistoryFile(),
);
