import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';

import { TransactionsSummaryDbClientImpl } from '../api/storage/TransactionsSummaryDbClient';

class RecalculateTransactionsHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
    const client = new TransactionsSummaryDbClientImpl();
    const transactions = await client.calculateTransactionsSummary(
      identity.getUserId(),
    );
    await client.saveTransactionsSummary(identity.getUserId(), transactions);
    return {
      body: {
        message: 'Success',
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new RecalculateTransactionsHandler(),
);
