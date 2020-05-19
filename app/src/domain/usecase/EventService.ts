import { Commands, Ok } from 'ioredis';
import { EventRequest } from '../../web/request';

export default class EventService {
  private readonly redisInstance: Commands;

  constructor(redisService: { redisInstance: Commands }) {
    const { redisInstance } = redisService;
    this.redisInstance = redisInstance;
  }

  public async findBy(eventId: string): Promise<string | null> {
    return this.redisInstance.get(eventId);
  }

  public async create(eventReqeust: EventRequest): Promise<Ok> {
    this.redisInstance.set(eventReqeust.getEventId(), eventReqeust.getValue());
    return 'OK';
  }
}
