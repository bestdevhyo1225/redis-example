import { route, GET } from 'awilix-koa';
import { Context } from 'koa';

@route('/events')
export default class EventController {
  private eventService: { findEventBy(id: string): Promise<string | null> };

  constructor(eventService: { findEventBy(id: string): Promise<string | null> }) {
    this.eventService = eventService;
  }

  @GET()
  @route('/:eventId')
  public async findEvent(ctx: Context): Promise<Context> {
    const { eventId } = ctx.params;
    return ctx.success({ data: eventId });
  }
}
