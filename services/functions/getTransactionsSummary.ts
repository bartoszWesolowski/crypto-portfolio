import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';

import { RequestIdentityId } from '../util/IdentityId';
import { TransactionSummaryCurrentAssetPriceDecorator } from '../impl/decorators/TransactionSummaryCurrentAssetPriceDecorator';
import { TransactionsSummaryDbClientImpl } from 'api/storage/TransactionsSummaryDbClient';
import { BinanceApiClient } from 'api/binance/BinanceApiClient';

const client = new TransactionsSummaryDbClientImpl();
const decorator = new TransactionSummaryCurrentAssetPriceDecorator(
  new BinanceApiClient(),
);

class GetTransactionsSummaryHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);
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
    let decorated = portfolioSummary.transactionsSummary.transactions;
    try {
      decorated = await decorator.decorate(
        portfolioSummary.transactionsSummary.transactions,
      );
    } catch (e) {
      console.error('Failed to decorate transaction summary', e);
    }
    return {
      body: {
        transactionsSummary: decorated,
        lastModified: portfolioSummary.transactionsSummary.lastModified,
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new GetTransactionsSummaryHandler(),
);
