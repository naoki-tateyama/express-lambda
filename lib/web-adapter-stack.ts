import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';

export class WebAdapterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id);

    const handler = new DockerImageFunction(this, 'Handler', {
      code: DockerImageCode.fromImageAsset('./', {
        platform: Platform.LINUX_AMD64,
      }),
      memorySize: 256,
      timeout: Duration.seconds(30),
      logRetention: RetentionDays.ONE_MONTH,
      description: 'express-lambda-web-adapter',
    });

    new HttpApi(this, 'Api', {
      apiName: 'express-lambda-web-adapter-api',
      description: 'express-lambda-web-adapter',
      defaultIntegration: new HttpLambdaIntegration('Integration', handler),
    });
  }
}
