import path from 'path';
import { Connection } from 'typeorm';
import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer, asValue } from 'awilix';
import UserRepository from './data/UserRepository';

export const configureContainer = async (dbConnection: Connection): Promise<AwilixContainer> => {
  const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  // database
  container.register({
    dbConnection: asValue(dbConnection),
  });

  // repository
  container.register({
    userRepository: asValue(dbConnection.getCustomRepository(UserRepository)),
  });

  container.loadModules(
    [
      './web/http/*Controller.js',
      './domain/usecase/*Service.js',
      './external/ioredis/*Service.js',
      './infrastructure/grpc-caller/*Caller.{js,ts}',
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

  // eslint-disable-next-line no-console
  console.log(container);

  return container;
};
