/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, eachDay, format } from 'date-fns';
import Tabs from '../../components/Tabs';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';
import axios from 'axios';

const Schedule = ({ slug }) => {
  let days = [
    { key: 'Sun', href: '/schedule/sun', isActive: false },
    { key: 'Mon', href: '/schedule/mon', isActive: false },
    { key: 'Tue', href: '/schedule/tue', isActive: false },
    { key: 'Wed', href: '/schedule/wed', isActive: false },
    { key: 'Thu', href: '/schedule/thu', isActive: false },
    { key: 'Fri', href: '/schedule/fri', isActive: false },
    { key: 'Sat', href: '/schedule/sat', isActive: false }
  ];

  if (slug) {
    const curDay = days.find((dy) => dy.key.toLowerCase() === slug);
    curDay.isActive = true;
  } else {
    days[new Date().getDay()].isActive = true;
  }

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

    const getEachDayDate = eachDay(
      format(startOfWeekDate, 'YYYY-MM-DD'),
      format(endOfWeekDate, 'YYYY-MM-DD')
    );
    return getEachDayDate;
  }

  function formatEachDateTime(date) {
    let results = date.map((i) => {
      const formatDateWithDay = format(i, 'ddd');

      if (formatDateWithDay.toLowerCase() === slug) {
        return format(i, 'YYYY-MM-DD');
      }
    });
    return results;
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
      <Tabs links={days} />
      {data && data.schedule && (
        <table>
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
