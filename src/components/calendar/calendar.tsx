import { Event, eventsSelector, useAppSelector } from '@/store';
import { currentDate, formatISO8601, getDaysInMonth } from '@/utils';
import { useState } from 'react';
import {
  CalendarDay,
  CalendarHeader,
  CalendarModal,
  CalendarPlaceholder,
} from '..';

export function Calendar() {
  const daysInCurrentMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const firstDayOfWeek = daysInCurrentMonth[0].getDay() ?? 0;
  const events = useAppSelector(eventsSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [usedColors, setUsedColors] = useState<string[]>([]);

  function onClose() {
    setIsOpen(false);
    setSelectedDate(undefined);
    setSelectedEvent(undefined);
    setUsedColors([]);
  }

  function handleClick(date: Date) {
    setIsOpen(true);
    setSelectedDate(date);
    const dateString = formatISO8601(date);
    const colors = events[dateString]?.events.map((e) => e.color) || [];
    setUsedColors(colors);
  }

  function handleClickEvent(date: Date, event: Event) {
    setIsOpen(true);
    setSelectedDate(date);
    setSelectedEvent(event);
  }

  return (
    <>
      <CalendarHeader />
      <div className="grid grid-cols-7 divide-x divide-gray-200 border border-gray-200">
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <CalendarPlaceholder key={`empty-${index}`} />
        ))}
        {daysInCurrentMonth.map((day, index) => (
          <CalendarDay
            key={`${day.toISOString()}-${index}`}
            handleClick={handleClick}
            handleClickEvent={handleClickEvent}
            day={day}
            events={events}
          />
        ))}
        {Array.from({
          length: 6 - ((firstDayOfWeek + daysInCurrentMonth.length - 1) % 7),
        }).map((_, index) => (
          <CalendarPlaceholder
            key={`empty-${index + firstDayOfWeek + daysInCurrentMonth.length}`}
          />
        ))}
      </div>
      {isOpen ? (
        <CalendarModal
          isOpen={isOpen}
          onClose={onClose}
          date={selectedDate}
          event={selectedEvent}
          usedColors={usedColors}
        />
      ) : null}
    </>
  );
}
