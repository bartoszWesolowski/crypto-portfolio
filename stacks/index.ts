import { ApiStack } from './ApiStack';
import { App } from '@serverless-stack/resources';
import { AuthStack } from './AuthStack';
import { FrontendStack } from './FrontendStack';
import { StorageStack } from './StorageStack';

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'services',
    bundle: {
      format: 'esm',
    },
  });
  app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
}
