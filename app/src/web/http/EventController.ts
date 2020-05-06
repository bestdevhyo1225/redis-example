import { route, GET } from 'awilix-koa';
import { Context } from 'koa';

@route('/events')
export default class EventController {
  private readonly eventService: { findEventBy(id: string): Promise<string | null> };

  constructor(eventService: { findEventBy(id: string): Promise<string | null> }) {
    this.eventService = eventService;
  }

  @GET()
  @route('/:eventId')
  public async findEvent(ctx: Context): Promise<Context> {
    const { eventId } = ctx.params;
    const data = await this.eventService.findEventBy(eventId);
    return ctx.success({ data });
  }
}
