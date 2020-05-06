import Redis, { Commands } from 'ioredis';
import { ConfigAll } from 'types/config/all';
import config from '../../common/config';

export default class RedisService {
  private readonly redisInstance: Commands;

  constructor() {
    const { redisOptions }: ConfigAll = config;
    this.redisInstance = new Redis({ ...redisOptions });
  }

  public getRedisInstance(): any {
    return this.redisInstance;
  }
}
