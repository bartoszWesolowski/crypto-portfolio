import { Cognito, StackContext, use } from '@serverless-stack/resources';
import { ApiStack } from './ApiStack';
import * as iam from 'aws-cdk-lib/aws-iam';
import { StorageStack } from './StorageStack';

export function AuthStack({ stack }: StackContext) {
  // Create auth provider
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ['s3:*'],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*',
      ],
    }),
  ]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId || '',
  });

  return {
    auth,
  };
}
