import Redis from 'ioredis';

export default class RedisService {
  private sentinels: Array<any>;

  private preferredSlaves: Array<any>;

  private redisInstance: any;

  constructor() {
    this.sentinels = [
      { host: '127.0.0.1', port: 26379 },
      { host: '127.0.0.1', port: 26380 },
      { host: '127.0.0.1', port: 26381 },
    ];

    this.preferredSlaves = [
      { ip: '127.0.0.1', port: 6380, prio: 1 },
      { ip: '127.0.0.1', port: 6381, prio: 2 },
    ];

    this.redisInstance = new Redis({
      host: '127.0.0.1',
      port: 6379,
      sentinels: this.sentinels,
      name: 'mymatser',
      role: 'slave',
      password: 'password1234',
      preferredSlaves: this.preferredSlaves,
    });
  }

  public getRedisInstance(): any {
    return this.redisInstance;
  }
}
