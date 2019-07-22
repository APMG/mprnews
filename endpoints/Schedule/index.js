/* eslint-disable react/display-name */
import React from 'react';
import Tabs from '../../components/Tabs';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';

const Schedule = ({ schedule }) => {
  let days = [
    { key: 'Sun', href: 'sun', isActive: false },
    { key: 'Mon', href: 'mon', isActive: false },
    { key: 'Tue', href: 'tue', isActive: false },
    { key: 'Wed', href: 'wed', isActive: false },
    { key: 'Thu', href: 'thu', isActive: false },
    { key: 'Fri', href: 'fri', isActive: false },
    { key: 'Sat', href: 'sat', isActive: false }
  ];

  if (schedule.slug) {
    const curDay = days.find((dy) => dy.key.toLowerCase() === schedule.slug);
    curDay.isActive = true;
  } else {
    days[new Date().getDay()].isActive = true;
  }

  return (
    <>
      <Tabs links={days} />
      {schedule && schedule.props && (
        <ScheduleInner schedule={schedule.props.schedule} />
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
