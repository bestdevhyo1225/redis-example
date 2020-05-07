import { Context } from 'koa';
import { route, GET, POST } from 'awilix-koa';
import { EventService } from 'types/event/service';
import { EventRequestBuilder } from '../request';

@route('/events')
export default class EventController {
  private readonly eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
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
