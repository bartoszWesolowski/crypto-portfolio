import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const identityId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  return {
    statusCode: 200,
    body: `Hello ${identityId}!`,
  };
};
