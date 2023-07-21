import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  DateEvents,
  EventDeletePayload,
  EventEditPayload,
  EventPayload,
} from './types';

const initialState: DateEvents = {};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<EventPayload>) {
      const currentEvents = state[action.payload.date]?.events ?? [];
      state[action.payload.date] = {
        date: action.payload.date,
        events: [...currentEvents, { ...action.payload.event }],
      };
    },
    editEvent(state, action: PayloadAction<EventEditPayload>) {
      state[action.payload.date] = {
        ...state[action.payload.date],
        events: state[action.payload.date].events.map((event) => {
          if (event.id === action.payload.event.id) {
            return { ...event, ...action.payload.event };
          }
          return event;
        }),
      };
    },
    deleteEvent(state, action: PayloadAction<EventDeletePayload>) {
      state[action.payload.date] = {
        date: action.payload.date,
        events: state[action.payload.date].events.filter(
          (e) => e.id !== action.payload.event_id
        ),
      };
    },
  },
});

export const { addEvent, deleteEvent, editEvent } = eventsSlice.actions;

export const eventsSelector = (state: RootState) => state.eventsState;
export default eventsSlice.reducer;
