#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebAdapterStack } from '../lib/web-adapter-stack';
import { NodejsStack } from '../lib/nodejs-stack';

const app = new cdk.App();

new WebAdapterStack(app, 'express-lambda-web-adapter', {
  description: 'express-lambda-web-adapter',
});

new NodejsStack(app, 'express-lambda-nodejs', {
  description: 'express-lambda-nodejs',
});
