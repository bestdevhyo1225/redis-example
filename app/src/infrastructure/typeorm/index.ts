import { Connection, createConnection } from 'typeorm';
import config from '../../common/config';

export const createDBConnection = async (): Promise<Connection> => {
  const { syncForce, db } = config;
  const { database, uri, options } = db;

  const connection: Connection = await createConnection({
    database,
    url: uri,
    synchronize: syncForce,
    entities: ['dist/domain/entity/*.js'],
    ...options,
  });

  return connection;
};
