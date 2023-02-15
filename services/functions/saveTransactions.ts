import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';
import { RequestIdentityId } from '../util/IdentityId';
import { TransactionItem } from 'api/types';
import { TransactionsDbClientImpl } from '../api/storage/TransactionsDatabaseClient';
import { TransactionPriceInUsdDecorator } from 'impl/decorators/TransactionPriceInUsdDecorator';
import { BinanceApiClient } from 'api/binance/BinanceApiClient';
// import * as D from 'io-ts/Decoder';
// import { pipe } from 'fp-ts/function';
// import * as td from 'io-ts-types';
export interface SaveTransactionsRequestBody {
  transactions: TransactionItem[];
}
// TODO use ip-ts to parse string input data

// const strictLength = (n: number) =>
//   pipe(
//     D.string,
//     D.refine(
//       (input): input is string => input.length == n,
//       `length of string should be ${n}`,
//     ),
//   );

// export const StringToDate: D.Decoder<unknown, Date | null> = D.nullable(
//   pipe(
//     strictLength(24),
//     D.parse((dateString) => {
//       const date = new Date(dateString);
//       return D.success(date);
//     }),
//   ),
// );

const db = new TransactionsDbClientImpl();
const priceDecorator = new TransactionPriceInUsdDecorator(
  new BinanceApiClient(),
);

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
    const decoratedTransactions = await priceDecorator.decorate(
      body.transactions,
    );

    await db.saveTransactions(identity.getUserId(), decoratedTransactions);

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
