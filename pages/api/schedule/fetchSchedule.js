import { getDateTimes, formatEachDateTime } from '../../../utils/scheduleUtils';
import { protocol } from '../../../utils/utils';
import fetch from 'isomorphic-unfetch';

const fetchSchedule = async (day) => {
  try {
    const daysOfThisWeek = getDateTimes();
    const formattedDate = await formatEachDateTime(daysOfThisWeek, day);
    const scheduleBase = `${protocol()}://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=`;
    const scheduleUrl = await `${scheduleBase}${formattedDate}`;
    let request = await fetch(scheduleUrl);
    let response = await request.json();
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default fetchSchedule;
