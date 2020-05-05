import path from 'path';
import { createContainer, asClass, InjectionMode, Lifetime } from 'awilix';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.loadModules(
  [
    './web/http/*Controller.js',
    './domain/usecase/*Service.js',
    './data/**/*Repository.js',
    './external/ioredis/*Service.js',
  ],
  {
    formatName: 'camelCase',
    cwd: path.resolve(__dirname),
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asClass,
    },
  },
);

export default container;
