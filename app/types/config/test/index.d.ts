import { RedisOptions } from 'ioredis';

export interface ConfigTest {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly uri: string;
  };
  readonly redisOptions?: RedisOptions;
}
