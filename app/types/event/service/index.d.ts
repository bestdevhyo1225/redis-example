import { Ok } from 'ioredis';
import { EventRequest } from 'web/request';

export interface EventService {
  findBy(id: string): Promise<string | null>;
  create(eventReqeust: EventRequest): Promise<Ok>;
}
