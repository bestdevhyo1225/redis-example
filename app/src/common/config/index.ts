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
    redisOptions: {
      host: 'host.docker.internal',
      port: 6379,
      name: 'mymaster',
      role: 'master',
      password: 'password1234',
    },
  },
  test: {
    syncModels: true,
    syncForce: true,
    db: {
      uri: requireProcessEnv('MYSQL_TEST_URI'),
    },
    redisOptions: {},
  },
  development: {
    syncModels: false,
    syncForce: false,
    db: {
      options: {
        replication: JSON.parse(requireProcessEnv('MYSQL_REPLICATION')),
      },
    },
    redisOptions: {},
  },
};

const { env } = index.all;
module.exports = merge(index.all, index[env]);
export default module.exports;
