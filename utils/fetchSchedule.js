export const fetchSchedule = async (dateTime) => {
  try {
    const scheduleUrl = `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`;
    const scheduleRes = await fetch(scheduleUrl);
    const props = await scheduleRes.json();
    return {
      props
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
