import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import {
  Duration,
  Expiration,
} from "@aws-cdk/aws-appsync/node_modules/@aws-cdk/core";
import * as dynamo from "@aws-cdk/aws-dynamodb";

export class Step04AppsyncLambdaDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Creates the AppSync API
    const api = new appsync.GraphqlApi(this, "MyDBApi", {
      name: "cdk-appsync-dynamo-api",
      schema: appsync.Schema.fromAsset("schema/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(200)),
          },
        },
      },
      xrayEnabled: true,
    });

    const lambda_function = new lambda.Function(this, "DynamoDbLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
    });

    const lambda_dataSource = api.addLambdaDataSource(
      "lambdaDatasource",
      lambda_function
    );

    lambda_dataSource.createResolver({
      typeName: "Query",
      fieldName: "welcome",
    });
    lambda_dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addProduct",
    });

    const productTable = new dynamo.Table(this, "ProductTable", {
      tableName: "Products",
      partitionKey: {
        name: "id",
        type: dynamo.AttributeType.STRING,
      },
    });
    productTable.grantFullAccess(lambda_function);

    lambda_function.addEnvironment("TABLE_NAME", productTable.tableName);
  }
}
