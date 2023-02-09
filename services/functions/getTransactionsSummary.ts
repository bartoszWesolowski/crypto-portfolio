import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';

import { TransactionsAggregateDbClientImpl } from 'api/storage/TransactionsAggregateDbClient';
class GetTransactionsHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
    const client = new TransactionsAggregateDbClientImpl();
    const transactions = await client.getTransactionsSummary(
      identity.getUserId(),
    );
    return {
      body: {
        transactionsSummary: transactions,
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new GetTransactionsHandler(),
);
