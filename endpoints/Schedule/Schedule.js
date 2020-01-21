/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../components/Tabs';
import ScheduleInner from './ScheduleInner';

const Schedule = ({ schedule }) => {
  const [data, setData] = useState([]);

  let days = [
    { key: 'Sun', href: 'sun', isActive: false },
    { key: 'Mon', href: 'mon', isActive: false },
    { key: 'Tue', href: 'tue', isActive: false },
    { key: 'Wed', href: 'wed', isActive: false },
    { key: 'Thu', href: 'thu', isActive: false },
    { key: 'Fri', href: 'fri', isActive: false },
    { key: 'Sat', href: 'sat', isActive: false }
  ];

  if (schedule.day) {
    const curDay = days.find((dy) => dy.key.toLowerCase() === schedule.day);
    curDay.isActive = true;
  } else {
    days[new Date().getDay()].isActive = true;
  }

  useEffect(() => {
    setData(schedule.props);
  }, [schedule.props]);

  return (
    <>
      <Tabs links={days} />
      {data && data.schedule && <ScheduleInner schedule={data.schedule} />}
    </>
  );
};
Schedule.propTypes = {
  schedule: PropTypes.object
};
ScheduleInner.propTypes = {
  schedule: PropTypes.array
};

export default Schedule;
