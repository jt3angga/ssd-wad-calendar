export const currentDate = new Date();

export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const month = currentDate.getMonth();
export const monthString = currentDate.toLocaleString('default', {
  month: 'long',
});
export const year = currentDate.getFullYear();

export function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(year, month, i);
    if (currentDate >= firstDay && currentDate <= lastDay) {
      days.push(currentDate);
    }
  }

  return days;
}

export function formatISO8601(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function generateTimeOptions(): string[] {
  const times: string[] = [];
  const startTime = new Date().setHours(0, 0, 0);
  const endTime = new Date().setHours(23, 59, 59);

  let currentTime = new Date(startTime);
  while (currentTime.getTime() <= endTime) {
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    times.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }
  return times;
}

export function getCurrentRoundTime() {
  const currentDate = new Date();

  const minutes = currentDate.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15;
  currentDate.setMinutes(roundedMinutes);

  const hour = String(currentDate.getHours() % 12 || 12).padStart(2, '0');
  const minute = String(currentDate.getMinutes()).padStart(2, '0');
  const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';

  const formattedTime = `${hour}:${minute} ${ampm}`;
  return formattedTime;
}
