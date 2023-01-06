import { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface IdentityId {
  getUserId(): string;
}

export interface ProxyEventAuthorizer {
  iam: ProxyEventIam;
}

export interface ProxyEventIam {
  accessKey: string;
  accountId: string;
  callerId: string;
  cognitoIdentity: CognitoIdentity;
}

export interface CognitoIdentity {
  identityId: string;
  identityPoolId: string;
}

export class RequestIdentityId implements IdentityId {
  authorizer: ProxyEventAuthorizer;
  constructor(event: APIGatewayProxyEventV2 | any) {
    this.authorizer = event.requestContext.authorizer as ProxyEventAuthorizer;
  }
  getUserId() {
    return this.authorizer.iam.cognitoIdentity.identityId;
  }
}
