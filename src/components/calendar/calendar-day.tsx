import { DateEvents, Event } from '@/store';
import { clsxm, currentDate, formatISO8601 } from '@/utils';
import { Slide, toast } from 'react-toastify';
import { CalendarEvent } from '..';

const MAX_EVENTS = 3;

export type CalendarDayProps = {
  day: Date;
  events: DateEvents;
  handleClick: (date: Date) => void;
  handleClickEvent: (date: Date, event: Event) => void;
};

export function CalendarDay({
  day,
  events,
  handleClick,
  handleClickEvent,
}: CalendarDayProps) {
  const dateString = formatISO8601(day);
  return (
    <div
      onClick={() => {
        if (
          !events[dateString] ||
          events[dateString].events.length < MAX_EVENTS
        ) {
          handleClick(day);
        } else {
          toast.info(`Max ${MAX_EVENTS} events per day`, {
            toastId: 'max_event',
            position: toast.POSITION.TOP_CENTER,
            transition: Slide,
          });
        }
      }}
      className="relative cursor-pointer h-44 border-l-0 border-b border-b-gray-200 p-1 transition-all duration-250 hover:bg-slate-100"
    >
      <div
        className={clsxm(
          'absolute left-1 top-1 flex h-6 w-6 select-none items-center justify-center text-xs md:text-sm font-medium',
          {
            'bg-red-500 text-white rounded-full':
              Number(currentDate.getDate()) === day.getDate(),
          }
        )}
      >
        {day.getDate()}
      </div>
      {events && events[dateString] && (
        <div className="mt-7 flex flex-col gap-y-1">
          {events[dateString].events.map((event, i) => {
            return (
              <CalendarEvent
                key={`event-${event}-${i}`}
                date={day}
                event={event}
                handleClick={handleClickEvent}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
