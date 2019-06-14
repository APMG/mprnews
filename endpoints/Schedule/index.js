/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
// import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';
// import axios from 'axios';
import Link from 'next/link';

const Schedule = ({ slug }) => {
  const [days] = useState(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setHasError] = useState(false);

  useEffect(() => {
    // console.log('schedule', schedule);
    // console.log('props', props);
    console.log('slug', slug);

    setData(slug.props);
  }, []);

  // function getDateTimes() {
  //   const todaysDate = format(new Date(), 'YYYY-MM-DD');
  //   const startOfWeekDate = startOfWeek(todaysDate);
  //   const endOfWeekDate = endOfWeek(todaysDate);

  //   const getEachDayDate = eachDay(
  //     format(startOfWeekDate, 'YYYY-MM-DD'),
  //     format(endOfWeekDate, 'YYYY-MM-DD')
  //   );
  //   return getEachDayDate;
  // }

  // function formatEachDateTime(date) {
  //   let results = date.map((i) => {
  //     const formatDateWithDay = format(i, 'ddd');

  //     if (formatDateWithDay.toLowerCase() === slug) {
  //       return format(i, 'YYYY-MM-DD');
  //     }
  //   });
  //   return results;
  // }

  // `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`
  // function fetchSchedule() {
  //   setIsLoading(true);
  //   axios
  //     .get(`/schedule`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setData(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setHasError(error);
  //       setIsLoading(false);
  //     });
  // }

  return (
    <>
      <ul className="tabs">
        {days.map((day) => {
          return (
            <li key={day}>
              <Link href={`/schedule/${day}`}>
                <a>{day.toUpperCase()}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      {data && data.schedule && <ScheduleInner schedule={data.schedule} />}
    </>
  );
};
Schedule.propTypes = {
  slug: PropTypes.object
  // props: PropTypes.object,
  // schedule: PropTypes.object
};
ScheduleInner.propTypes = {
  schedule: PropTypes.array
};

export default Schedule;
