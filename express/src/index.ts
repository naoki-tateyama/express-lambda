import express from 'express';
import serverlessExpress from '@codegenie/serverless-express';
import { useExpressServer } from 'routing-controllers';
import Controller from './Controller';

const PORT = 3000;

const app = express();

app.use('/health', (req, res) => {
  res.status(200).send('OK');
});
useExpressServer(app, {
  controllers: [Controller],
});

try {
  app.listen(PORT);
} catch (e) {
  console.log((e as Error).message);
}

export const handler = async (event: any, context: any, callback: any) => {
  const server = serverlessExpress({ app });
  return server(event, context, callback);
};
