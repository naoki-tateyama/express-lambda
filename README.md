# express-lambda

This repository implements simple examples of the [express](https://expressjs.com/) framework on lambda.

Two implementations are provided:

- [AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter)
- [Amazon Lambda Node.js Library](https://github.com/aws/aws-cdk/tree/main/packages/aws-cdk-lib/aws-lambda-nodejs)

The deployment is done using CDK.

## How to deploy

### Set up

```bash
npm install
npm run cdk bootstrap
```

### AWS Lambda Web Adapter

```bash
npm run cdk deploy express-lambda-web-adapter
```

### Amazon Lambda Node.js Library

```bash
npm run cdk deploy express-lambda-nodejs
```
