import { Commands } from 'ioredis';

export default class EventService {
  private readonly redisInstance: Commands;

  constructor(redisService: any) {
    const { redisInstance } = redisService;
    this.redisInstance = redisInstance;
  }

  public async findEventBy(eventId: string): Promise<string | null> {
    return this.redisInstance.get(eventId);
  }
}
