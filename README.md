# express-lambda

This repository implements simple examples of the [express](https://expressjs.com/) on AWS lambda.

There are two frameworks to make express work on AWS Lambda.

- [AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter)
- [Serverless Express](https://github.com/CodeGenieApp/serverless-express)

Each can be realized via Dockerfile or AWS Lambda Node.js Library.

The deployment is done using CDK.

## How to deploy

### Set up

```bash
npm install
npm run cdk bootstrap
```

### AWS Lambda Web Adapter

#### Dockerfile

```bash
npm run cdk deploy express-web-adapter-docker
```

#### Amazon Lambda Node.js Library

```bash
npm run cdk deploy express-web-adapter-nodejs
```

### Serverless Express

#### Dockerfile

```bash
npm run cdk deploy express-serverless-express-docker
```

#### Amazon Lambda Node.js Library

```bash
npm run cdk deploy express-serverless-express-nodejs
```
