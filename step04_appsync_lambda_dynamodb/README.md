# Step04 Dynamo-db with AppSync Lambda

## Steps to compile the code

```
cdk init app --language typescript
```

```
npm run watch
```

```
npm i @aws-cdk/aws-appsync
npm i @aws-cdk/aws-lambda
npm i @aws-cdk/aws-dynamodb
npm i aws-sdk
```

```
create ./schema/schema.gql
```

```
create ./lambda/index.ts
```

```
update ./lib/step04_appsync_lambda_dynamodb-stack.ts
```

```
cdk deploy
```

```
cdk destroy
```

---

## Reading Material

- [The Power of Serverless GraphQL with AWS AppSync](https://serverless.pub/the-power-of-serverless-graphql-with-appsync/)
- [AWS AppSync - The Ultimate Guide](https://www.serverless.com/aws-appsync)
- [Getting started with Amazon DynamoDB](https://aws.amazon.com/blogs/database/getting-started-with-amazon-dynamodb/)
- [aws-appsync module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-appsync-readme.html)
- [Building Real-time Serverless APIs with PostgreSQL, CDK, TypeScript, and AWS AppSync](https://aws.amazon.com/blogs/mobile/building-real-time-serverless-apis-with-postgres-cdk-typescript-and-aws-appsync/)
- [Local Mocking and Testing with the Amplify CLI](https://aws.amazon.com/blogs/aws/new-local-mocking-and-testing-with-the-amplify-cli/)
- [aws-dynamodb module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-dynamodb-readme.html)

## Coding Tutorial which we will follow

- [Building Scalable GraphQL APIs on AWS with CDK, TypeScript, AWS AppSync, Amazon DynamoDB, and AWS Lambda](https://aws.amazon.com/blogs/mobile/building-scalable-graphql-apis-on-aws-with-cdk-and-aws-appsync/)
- [Exploring AWS CDK - Loading DynamoDB with Custom Resources](https://dev.to/elthrasher/exploring-aws-cdk-loading-dynamodb-with-custom-resources-jlf)

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
