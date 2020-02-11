import { getDateTimes, formatEachDateTime } from '../../../utils/scheduleUtils';
import fetch from 'isomorphic-unfetch';

const fetchSchedule = async (day) => {
  try {
    const API = process.env.SCHEDULER_API;
    const daysOfThisWeek = getDateTimes();
    const formattedDate = await formatEachDateTime(daysOfThisWeek, day);
    const scheduleBase = `${API}?datetime=`;
    const scheduleUrl = await `${scheduleBase}${formattedDate}`;
    let request = await fetch(scheduleUrl);
    let response = await request.json();
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default fetchSchedule;
