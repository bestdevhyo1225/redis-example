import { RedisOptions } from 'ioredis';

export interface ConfigTest {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly database: string;
    readonly uri: string;
  };
  readonly redisOptions?: RedisOptions;
}
