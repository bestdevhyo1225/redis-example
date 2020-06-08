import { Commands, Ok } from 'ioredis';
import { EventRequest } from '../../web/request';
import UserServiceCaller from 'infrastructure/grpc-caller/UserServiceCaller';

export default class EventService {
  private readonly redisInstance: Commands;
  private readonly tempGrpcCaller: any;

  constructor(redisService: { redisInstance: Commands }, userServiceCaller: UserServiceCaller) {
    const { redisInstance } = redisService;
    this.redisInstance = redisInstance;
    this.tempGrpcCaller = userServiceCaller.getCaller();
  }

  public async findBy(eventId: string): Promise<string | null> {
    const res = await this.tempGrpcCaller.FindUsers({ start: 10, count: 10 });
    console.log(res);
    return null;
  }

  public async create(eventReqeust: EventRequest): Promise<Ok> {
    this.redisInstance.set(eventReqeust.getEventId(), eventReqeust.getValue());
    return 'OK';
  }
}
