import { Bucket, StackContext } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

export function StorageStack({ stack, app }: StackContext) {

  const bucket = new Bucket(stack, "Uploads", {
    cdk: {
      bucket: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  });

  return {
    bucket,
  };
}
