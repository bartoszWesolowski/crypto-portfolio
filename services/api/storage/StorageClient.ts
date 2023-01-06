import { IdentityId } from '../../util/IdentityId';
import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface StorageFile {
  fileName: string;
}

export interface StorageClient {
  getFile(
    file: StorageFile,
  ): Promise<PromiseResult<S3.GetObjectOutput, AWSError>>;
}

const s3 = new S3();

export class S3UserStorageClient implements StorageClient {
  userIdentity: IdentityId;

  constructor(userIdentity: IdentityId) {
    this.userIdentity = userIdentity;
  }

  async getFile(
    file: StorageFile,
  ): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    const key = `private/${this.userIdentity.getUserId()}/${file.fileName}`;
    console.log(`Key: ${key}`);
    return await s3
      .getObject({
        Bucket: process.env.BUCKET_NAME ?? '',
        Key: key,
      })
      .promise();
  }
}
