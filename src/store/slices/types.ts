export type Event = {
  id: string;
  name: string;
  time: string;
  invitees: string;
  color: string;
};

export type DateEvent = {
  date: string;
  events: Event[];
};

export type DateEvents = {
  [key: string]: DateEvent;
};

export type EventPayload = {
  date: string;
  event: Event;
};

export type EventEditPayload = {
  date: string;
  event: Omit<Event, 'color'>;
};

export type EventDeletePayload = {
  date: string;
  event_id: string;
};
