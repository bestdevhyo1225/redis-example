import EventRequest from './EventRequest';

export default class EventRequestBuilder {
  private eventId: string;

  private value: string;

  public constructor() {
    this.eventId = '';
    this.value = '';
  }

  public setEventId(eventId: string): EventRequestBuilder {
    this.eventId = eventId;
    return this;
  }

  public setValue(value: string): EventRequestBuilder {
    this.value = value;
    return this;
  }

  public build(): EventRequest {
    const eventRequest = new EventRequest();
    eventRequest.setEventId(this.eventId);
    eventRequest.setValue(this.value);
    return eventRequest;
  }
}
