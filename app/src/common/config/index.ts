import path from 'path';
import dotenv from 'dotenv-safe';
import merge from 'lodash/merge';

import { ConfigIndex } from 'types/config';

const requireProcessEnv = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name] as string;
};

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.join(__dirname, '../../../.env'),
    example: path.join(__dirname, '../../../.env.example'),
    allowEmptyValues: true,
  });
}

const index: ConfigIndex = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT as string, 10) || 9000,
    host: process.env.HOST || '0.0.0.0',
    syncModels: process.env.SYNC_MODELS || false,
    syncForce: process.env.SYNC_FORCE || false,
    jwtSecret: process.env.JWT_SECRET || undefined,
    db: {
      options: {
        type: 'mysql',
        timezone: '+09:00',
        logging: null,
      },
    },
    redisOptions: {
      host: '127.0.0.1',
      port: 6381,
      sentinels: [],
      name: 'mymaster',
      role: 'master',
      password: 'password1234',
      preferredSlaves: [],
    },
  },
  test: {
    syncModels: true,
    syncForce: true,
    db: {
      database: 'api_dev',
      uri: requireProcessEnv('DB_TEST_URI'),
    },
    redisOptions: {},
  },
  development: {
    syncModels: false,
    syncForce: false,
    db: {
      database: 'api_dev',
      uri: requireProcessEnv('DB_TEST_URI'),
      options: {
        // replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
      },
    },
    redisOptions: {
      sentinels: [
        { host: '127.0.0.1', port: 26379 },
        { host: '127.0.0.1', port: 26380 },
        { host: '127.0.0.1', port: 26381 },
      ],
      preferredSlaves: [
        { ip: '127.0.0.1', port: '6380', prio: 1 },
        { ip: '127.0.0.1', port: '6381', prio: 2 },
      ],
    },
  },
};

const { env } = index.all;
module.exports = merge(index.all, index[env]);
export default module.exports;
