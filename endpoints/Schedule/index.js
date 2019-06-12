/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';
import axios from 'axios';
import Link from 'next/link';

const Schedule = ({ slug }) => {
  const [days] = useState(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setHasError] = useState(false);

  useEffect(() => {
    const dates = getDateTimes();
    const formattedDate = formatEachDateTime(dates);
    fetchSchedule(formattedDate);
  }, []);

  function getDateTimes() {
    const todaysDate = format(new Date(), 'YYYY-MM-DD');
    const startOfWeekDate = startOfWeek(todaysDate);
    const endOfWeekDate = endOfWeek(todaysDate);

    const results = eachDay(
      format(startOfWeekDate, 'YYYY-MM-DD'),
      format(endOfWeekDate, 'YYYY-MM-DD')
    );
    return results;
  }

  function formatEachDateTime(date) {
    let result = date.map((i) => {
      const formatDateWithDay = format(i, 'ddd');

      if (formatDateWithDay.toLowerCase() === slug) {
        return format(i, 'YYYY-MM-DD');
      }
    });
    return result;
  }

  function fetchSchedule(dateTime) {
    setIsLoading(true);
    axios
      .get(
        `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${dateTime}`
      )
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
        setIsLoading(false);
      });
  }

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
      {data && data.schedule && (
        <table border="1">
          <ScheduleInner
            schedule={data.schedule}
            loading={isLoading}
            error={error}
          />
        </table>
      )}
    </>
  );
};
Schedule.propTypes = {
  slug: PropTypes.string
};
ScheduleInner.propTypes = {
  schedule: PropTypes.array
};

export default Schedule;
