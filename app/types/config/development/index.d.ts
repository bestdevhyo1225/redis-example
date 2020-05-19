import { RedisOptions } from 'ioredis';

export interface ConfigDevelopment {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly database: string;
    readonly uri: string;
    readonly options?: {
      readonly replication?: string;
    };
  };
  readonly redisOptions?: RedisOptions;
}
