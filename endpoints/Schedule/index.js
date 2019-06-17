/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';

const Schedule = ({ schedule }) => {
  let days = [
    { key: 'Sun', href: '/schedule/sun', isActive: false },
    { key: 'Mon', href: '/schedule/mon', isActive: false },
    { key: 'Tue', href: '/schedule/tue', isActive: false },
    { key: 'Wed', href: '/schedule/wed', isActive: false },
    { key: 'Thu', href: '/schedule/thu', isActive: false },
    { key: 'Fri', href: '/schedule/fri', isActive: false },
    { key: 'Sat', href: '/schedule/sat', isActive: false }
  ];

  if (schedule.slug) {
    const curDay = days.find((dy) => dy.key.toLowerCase() === schedule.slug);
    curDay.isActive = true;
  } else {
    days[new Date().getDay()].isActive = true;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(schedule.props);
  }, []);

  return (
    <>
      <Tabs links={days} />
      {data && data.schedule && (
        <table>
          <ScheduleInner schedule={data.schedule} />
        </table>
      )}
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
