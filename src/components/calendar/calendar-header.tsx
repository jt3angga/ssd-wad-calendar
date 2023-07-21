import { daysOfWeek } from '@/utils';

export function CalendarHeader() {
  return (
    <div className="sticky text-xs md:text-base top-0 z-10 grid grid-cols-7 border border-b-0 border-gray-200 bg-primary text-center font-medium text-white">
      {daysOfWeek.map((day) => (
        <div key={day} className="p-2 line-clamp-1">
          {day}
        </div>
      ))}
    </div>
  );
}
