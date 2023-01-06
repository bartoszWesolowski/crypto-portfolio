import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

export interface HandlerResponse {
  body?: object;
  statusCode?: number;
}
export interface RequestHandler {
  handleRequest(
    event: APIGatewayProxyEventV2,
    context: Context,
  ): HandlerResponse | Promise<HandlerResponse>;
}

export function handler(requestHandler: RequestHandler) {
  return async function (event: APIGatewayProxyEventV2, context: Context) {
    let response: HandlerResponse;
    try {
      // Run the Lambda
      // console.log('event and context');
      // console.log(JSON.stringify(event, null, 4));
      // console.log(JSON.stringify(context, null, 4));
      response = await requestHandler.handleRequest(event, context);
    } catch (e) {
      console.error(e);
      let message = 'Failed to perform request.';
      if (e instanceof Error) {
        message = e.message;
      }
      response = {
        body: { error: message },
        statusCode: 500,
      };
      console.log(e);
    }

    // Return HTTP response
    return {
      statusCode: response.statusCode || 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(response.body || {}),
    };
  };
}
