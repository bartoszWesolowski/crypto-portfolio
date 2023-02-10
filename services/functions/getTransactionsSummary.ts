import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';

import { TransactionsAggregateDbClientImpl } from 'api/storage/TransactionsAggregateDbClient';
class GetTransactionsSummaryHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
    const client = new TransactionsAggregateDbClientImpl();
    const portfolioSummary = await client.getTransactionsSummary(
      identity.getUserId(),
    );
    if (!portfolioSummary) {
      return {
        statusCode: 404,
        body: {
          message: 'Unable to get portfolio summary',
        },
      };
    }
    return {
      body: {
        transactionsSummary: portfolioSummary.transactionsSummary.transactions,
        lastModified: portfolioSummary.transactionsSummary.lastModified,
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new GetTransactionsSummaryHandler(),
);
