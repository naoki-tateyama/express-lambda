import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class NodejsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id);

    const handler = new NodejsFunction(this, 'Handler', {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../express/src/index.ts'),
      memorySize: 256,
      timeout: Duration.seconds(30),
      logRetention: RetentionDays.ONE_MONTH,
      description: 'express-lambda-nodejs',
    });

    new HttpApi(this, 'Api', {
      apiName: 'express-lambda-nodejs-api',
      description: 'express-lambda-nodejs',
      defaultIntegration: new HttpLambdaIntegration('Integration', handler),
    });
  }
}
