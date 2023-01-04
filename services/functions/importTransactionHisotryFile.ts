import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import {
  handler,
  HandlerResponse,
  RequestHandler,
} from "../util/RequestHandler";

class ImportTransactionHistoryFile implements RequestHandler {
  async handleRequest(event: APIGatewayProxyEventV2): Promise<HandlerResponse> {
    console.log(JSON.stringify(event, null, 4))
    return {
      statusCode: 200,
      body: {
        message: "Importing transaction file worked.",
      },
    };
  }
}
export const main: APIGatewayProxyHandlerV2 = handler(
  new ImportTransactionHistoryFile()
);
