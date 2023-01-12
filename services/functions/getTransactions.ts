import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';

import { TransactionsDbClientImpl } from 'api/storage/TransactionsDatabaseClient';
class GetTransactionsHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
    const client = new TransactionsDbClientImpl();
    const transactions = await client.getTransactions(identity.getUserId());
    return {
      body: {
        transactions,
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new GetTransactionsHandler(),
);
