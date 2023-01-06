import {
  ReactStaticSite,
  StackContext,
  use,
} from '@serverless-stack/resources';
import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';
import { StorageStack } from './StorageStack';

export function FrontendStack({ stack, app }: StackContext) {
  // Create auth provider
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);
  const { bucket } = use(StorageStack);

  const site = new ReactStaticSite(stack, 'PublicSite', {
    path: 'frontend',
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || '', // TODO: how this should be handled in case no identity pool is available (is this possible?)
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_BUCKET: bucket.bucketName,
    },
  });

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });

  return {
    auth,
  };
}
