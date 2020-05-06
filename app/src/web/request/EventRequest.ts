export default class EventRequest {
  private eventId: string;

  private value: string;

  public constructor() {
    this.eventId = '';
    this.value = '';
  }

  public setEventId(eventId: string): void {
    this.eventId = eventId;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getEventId(): string {
    return this.eventId;
  }

  public getValue(): string {
    return this.value;
  }
}
