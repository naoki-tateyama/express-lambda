import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';

export class WebAdapterNodejsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id);

    const handler = new NodejsFunction(this, 'Handler', {
      runtime: Runtime.NODEJS_20_X,
      architecture: Architecture.ARM_64,
      layers: [
        LayerVersion.fromLayerVersionArn(
          this,
          'WebAdapter',
          `arn:aws:lambda:${this.region}:753240598075:layer:LambdaAdapterLayerArm64:20`
        ),
      ],
      entry: path.join(__dirname, '../express/src/index.ts'),
      handler: 'run.sh', // To run the express app
      bundling: {
        minify: true,
        commandHooks: {
          beforeInstall: () => [],
          beforeBundling: () => [],
          afterBundling: (inputDir: string, outputDir: string) => {
            return [`cp ${inputDir}/run.sh ${outputDir}`];
          },
        },
      },
      environment: {
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/bootstrap', // Required for web-adapter
        PORT: '3000',
      },
      memorySize: 256,
      timeout: Duration.seconds(30),
      logRetention: RetentionDays.ONE_MONTH,
      description: props.description,
    });

    new HttpApi(this, 'Api', {
      apiName: `${id}-api`,
      description: props.description,
      defaultIntegration: new HttpLambdaIntegration('Integration', handler),
    });
  }
}
