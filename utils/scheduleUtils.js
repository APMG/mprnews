const { startOfWeek, endOfWeek, eachDay, format } = require('date-fns');

exports.getDateTimes = () => {
  const todaysDate = format(new Date(), 'YYYY-MM-DD');
  const startOfWeekDate = startOfWeek(todaysDate);
  const endOfWeekDate = endOfWeek(todaysDate);

  const getEachDayDate = eachDay(
    format(startOfWeekDate, 'YYYY-MM-DD'),
    format(endOfWeekDate, 'YYYY-MM-DD')
  );
  return getEachDayDate;
};

exports.formatEachDateTime = (dates, daySlug) => {
  let results = dates.map((date) => {
    const formatDateWithDay = format(date, 'ddd');
    if (formatDateWithDay.toLowerCase() === daySlug) {
      return format(date, 'YYYY-MM-DD');
    }
  });
  return results;
};
