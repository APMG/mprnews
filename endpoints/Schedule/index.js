/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import { getDay } from 'date-fns/get_day';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';

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
    const curDay = days.find((dy) => dy.key.toLowerCase() === slug.slug);
    curDay.isActive = true;
  } else {
    days[getDay(new Date())].isActive = true;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(slug.props);
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
  slug: PropTypes.object
};
ScheduleInner.propTypes = {
  schedule: PropTypes.array
};

export default Schedule;
