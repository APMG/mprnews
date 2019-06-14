/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';
import Tab from '../../components/Tabs';

const Schedule = ({ slug }) => {
  const [days] = useState(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(slug.props);
  }, []);

  return (
    <>
      <Tab links={days} className="tabs" />
      {data && data.schedule && <ScheduleInner schedule={data.schedule} />}
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
