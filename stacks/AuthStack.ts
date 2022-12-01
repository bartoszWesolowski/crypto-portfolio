import { Cognito, StackContext, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack }: StackContext) {
  // Create auth provider
  const { api } = use(ApiStack);
  
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Show the API endpoint and other info in the output
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId || "",
  });

  return {
    auth,
  };
}
