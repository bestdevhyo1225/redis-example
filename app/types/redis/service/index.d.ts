import { Commands } from 'ioredis';

export interface RedisService {
  readonly redisInstance: Commands;
}
