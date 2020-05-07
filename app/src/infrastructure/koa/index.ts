import { loadControllers, scopePerRequest } from 'awilix-koa';
import checkHealth from 'koa-simple-healthcheck';
import koaBody from 'koa-body';
import jsend from 'koa-jsend';
import Koa from 'koa';

import middlewares from './middlewares';
import container from '../../container';

export default () => {
  const app = new Koa();

  app.use(jsend());

  app.use(koaBody({ jsonLimit: '100mb' }));
  app.use(scopePerRequest(container));
  app.use(loadControllers('../../web/http/*Controller.js', { cwd: __dirname }));

  app.use(
    checkHealth({
      healthy() {
        return { healthy: true };
      },
    }),
  );

  app.use(middlewares.handleError);
  app.on('error', (err: Error) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

  return app;
};
