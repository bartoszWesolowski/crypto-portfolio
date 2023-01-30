import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from '../util/RequestHandler';
import { RequestIdentityId } from '../util/IdentityId';
import { RegisterDbClientImpl } from '../api/storage/RegisterDatabaseClient';

const db = new RegisterDbClientImpl();
type RegisterUserParams = {
  email: string;
  firstName: string;
  lastName: string;
};
class RegisterRequestHandler implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    const identity = new RequestIdentityId(event);

    const body = Object.assign(
      { transactions: [] },
      JSON.parse(event.body ?? '{}'),
    ) as RegisterUserParams;

    if (!body.email) {
      return {
        statusCode: 400,
        body: {
          message: 'Missing user email.',
        },
      };
    }

    console.log(body);

    await db.registerUser({
      userId: identity.getUserId(),
      transactions: [],
      email: body.email,
    });

    return {
      statusCode: 204,
      body: {
        message: 'User saved',
      },
    };
  }
}

export const main: APIGatewayProxyHandlerV2 = handler(
  new RegisterRequestHandler(),
);
