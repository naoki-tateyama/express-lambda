#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebAdapterDockerStack } from '../lib/web-adapter-docker-stack';
import { WebAdapterNodejsStack } from '../lib/web-adapter-nodejs-stack';
import { ServerlessExpressNodejsStack } from '../lib/serverless-express-nodejs-stack';
import { ServerlessExpressDockerStack } from '../lib/serverless-express-docker-stack';

const app = new cdk.App();

// web-adapter via Docker
new WebAdapterDockerStack(app, 'express-web-adapter-docker', {
  description: 'express-web-adapter-docker',
});

// web-adapter via Node.js
new WebAdapterNodejsStack(app, 'express-web-adapter-nodejs', {
  description: 'express-web-adapter-nodejs',
});

// serverless-express via Docker
new ServerlessExpressDockerStack(app, 'express-serverless-express-docker', {
  description: 'express-serverless-express-docker',
});

// serverless-express via Node.js
new ServerlessExpressNodejsStack(app, 'express-serverless-express-nodejs', {
  description: 'express-serverless-express-nodejs',
});
