import { Context } from 'koa';
import { route, GET, POST } from 'awilix-koa';
import { EventRequestBuilder } from '../request';
import EventService from '../../domain/usecase/EventService';
import UserRepository from '../../data/UserRepository';

@route('/events')
export default class EventController {
  private readonly eventService: EventService;
  private readonly userRepository: UserRepository;

  constructor(eventService: EventService, userRepository: UserRepository) {
    this.eventService = eventService;
    this.userRepository = userRepository;
  }

  @GET()
  @route('/:eventId')
  public async findEvent(ctx: Context): Promise<Context> {
    const { eventId } = ctx.params;
    return ctx.success({ value: await this.eventService.findBy(eventId) });
  }

  @POST()
  public async createEvent(ctx: Context): Promise<Context> {
    const { eventId, value } = ctx.request.body;
    const eventRequest = new EventRequestBuilder().setEventId(eventId).setValue(value).build();
    return ctx.success({ isCreated: await this.eventService.create(eventRequest) });
  }
}
