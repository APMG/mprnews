import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';

export function getDateTimes() {
  const todaysDate = format(new Date(), 'YYYY-MM-DD');
  const startOfWeekDate = startOfWeek(todaysDate);
  const endOfWeekDate = endOfWeek(todaysDate);

  const getEachDayDate = eachDay(
    format(startOfWeekDate, 'YYYY-MM-DD'),
    format(endOfWeekDate, 'YYYY-MM-DD')
  );
  return getEachDayDate;
}

export function formatEachDateTime(dates, daySlug) {
  let results = dates.map((date) => {
    const formatDateWithDay = format(date, 'ddd');
    if (formatDateWithDay.toLowerCase() === daySlug) {
      return format(date, 'YYYY-MM-DD');
    }
  });
  return results;
}

export function nullFunc() {
  return null;
}
