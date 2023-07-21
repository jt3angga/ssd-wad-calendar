import { Event } from '@/store';
import { calculateLuminance, clsxm } from '@/utils';

export type CalendarEventProps = {
  event: Event;
  date: Date;
  handleClick: (date: Date, event: Event) => void;
};

export function CalendarEvent({
  event,
  date,
  handleClick,
}: CalendarEventProps) {
  const luminance = calculateLuminance(event.color);
  return (
    <div
      key={event.id}
      className={clsxm(
        'flex flex-col gap-y-0.25 overflow-hidden rounded-lg mr-0.5 md:mr-2 px-2 py-1 text-xs hover:opacity-90',
        {
          'text-black': luminance >= 0.5,
          'text-white': luminance < 0.5,
        }
      )}
      style={{ backgroundColor: event?.color }}
      onClick={(e) => {
        e.stopPropagation();
        handleClick(date, event);
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="line-clamp-1 flex-1">{event?.name ?? ''}</div>
        <div className="line-clamp-1">{event.time}</div>
      </div>
      <div className="line-clamp-1">{event.invitees}</div>
    </div>
  );
}
