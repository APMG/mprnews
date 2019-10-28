const {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format
} = require('date-fns');

exports.getDateTimes = () => {
  const todaysDate = format(new Date(), 'yyyy-MM-dd');
  const startOfWeekDate = startOfWeek(todaysDate);
  const endOfWeekDate = endOfWeek(todaysDate);

  const getEachDayDate = eachDayOfInterval({
    start: format(new Date(startOfWeekDate), 'yyyy-MM-dd'),
    end: format(new Date(endOfWeekDate), 'yyyy-MM-dd')
  });

  return getEachDayDate;
};

exports.formatEachDateTime = (dates, daySlug) => {
  let result;
  dates.map((date) => {
    const formatDateWithDay = format(new Date(date), 'iii');
    if (formatDateWithDay.toLowerCase() === daySlug) {
      return (result = format(new Date(date), 'yyyy-MM-dd'));
    }
  });
  return result;
};
