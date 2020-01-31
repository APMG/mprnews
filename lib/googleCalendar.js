import fetch from 'isomorphic-unfetch';

const DEFAULT_CREDENTIALS = {
  calendar_id: process.env.CALENDAR_ID,
  api_key: process.env.CALENDAR_API_KEY
};
const API_ROOT = 'https://www.googleapis.com/calendar/v3';

export const getCalendarEvents = async ({
  calendar_id,
  api_key
} = DEFAULT_CREDENTIALS) => {
  try {
    const response = await fetch(
      `${API_ROOT}/calendars/${calendar_id}/events?key=${api_key}`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return;
  }
};
