import { ConfigAll } from 'types/config/all';
import config from './common/config';
import koa from './infrastructure/koa';

const startServer = async () => {
  const { env, port, host }: ConfigAll = config;

  const app = koa();

  app.listen(port, host, () =>
    // eslint-disable-next-line no-console
    console.log(`Koa server listening on ${host}:${port}, in ${env} mode`),
  );
};

startServer().catch((err: Error) => {
  // eslint-disable-next-line no-console
  console.error('Server failed to start due to error: %s', err);
});
