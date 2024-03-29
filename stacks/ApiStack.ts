import { Api, StackContext, use } from '@serverless-stack/resources';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  // Create Api

  const { bucket } = use(StorageStack);
  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'iam',
      function: {
        permissions: [bucket],
        environment: {
          BUCKET_NAME: bucket.bucketName,
          MONGODB_URI: process.env.MONGODB_URI ?? '',
        },
      },
    },
    routes: {
      'GET /private': 'functions/private.main',
      'POST /register': 'functions/register.main',
      'GET /transactions/file': 'functions/transactionsfile.main',
      'GET /transactions': 'functions/getTransactions.main',
      'GET /transactions/summary': 'functions/getTransactionsSummary.main',
      'POST /transactions/summary/recalculate': 'functions/recalculateTransactionsSummary.main',
      'POST /transactions': 'functions/saveTransactions.main',
      'GET /public': {
        function: 'functions/public.main',
        authorizer: 'none',
      },
    },
  });

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
