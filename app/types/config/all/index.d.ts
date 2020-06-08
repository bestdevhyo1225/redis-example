import { RedisOptions } from 'ioredis';

export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncModels: string | boolean;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
  readonly redisOptions: RedisOptions;
  readonly db?: object;
  readonly userApiGrpcServer?: string;
}
