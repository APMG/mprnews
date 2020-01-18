import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

export const getDateTimes = () => {
  const todaysDate = format(new Date(), 'yyyy-MM-dd');
  const startOfWeekDate = startOfWeek(new Date(todaysDate));
  const endOfWeekDate = endOfWeek(new Date(todaysDate));

  const getEachDayDate = eachDayOfInterval({
    start: new Date(startOfWeekDate),
    end: new Date(endOfWeekDate)
  });
  return getEachDayDate;
};

export const formatEachDateTime = (dates, daySlug) => {
  let result;
  dates.map((date) => {
    const formatDateWithDay = format(new Date(date), 'iii');
    if (formatDateWithDay.toLowerCase() === daySlug) {
      return (result = format(new Date(date), 'yyyy-MM-dd'));
    }
  });
  return result;
};
