import { Connection } from 'typeorm';
import { AwilixContainer } from 'awilix';
import { configureContainer } from './container';
import { createDBConnection } from './infrastructure/typeorm';
import { ConfigAll } from 'types/config/all';
import config from './common/config';
import koa from './infrastructure/koa';

const startServer = async (container: AwilixContainer): Promise<void> => {
  const { env, port, host }: ConfigAll = config;

  const app = await koa(container);

  app.listen(port, host, () =>
    // eslint-disable-next-line no-console
    console.log(`Koa server listening on ${host}:${port}, in ${env} mode`),
  );
};

createDBConnection()
  .then((dbConnection: Connection) => configureContainer(dbConnection))
  .then((container: AwilixContainer) => startServer(container))
  .catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error('Server failed to start due to error: %s', err);
  });
