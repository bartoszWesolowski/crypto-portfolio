import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';
import { RequestIdentityId } from '../util/IdentityId';
import { TransactionItem } from 'api/types';
import { TransactionsDbClientImpl } from '../api/storage/TransactionsDatabaseClient';

export interface SaveTransactionsRequestBody {
  transactions: TransactionItem[];
}

const db = new TransactionsDbClientImpl();

class SaveTransactionsRequestHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
    const body = Object.assign(
      { transactions: [] },
      JSON.parse(event.body ?? '{}'),
    ) as SaveTransactionsRequestBody;

    if (body.transactions.length === 0) {
      return {
        statusCode: 400,
        body: {
          message: 'No transactions to save.',
          e: event,
          body,
        },
      };
    }

    await db.saveTransactions(identity.getUserId(), body.transactions);

    return {
      statusCode: 204,
      body: {
        message: 'Transactions saved',
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new SaveTransactionsRequestHandler(),
);
