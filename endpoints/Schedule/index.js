/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ScheduleInner from './ScheduleInner';
import Link from 'next/link';
// import Tab from '../../components/Tabs';

const Schedule = ({ slug }) => {
  const [days] = useState(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(slug.props);
  }, []);

  return (
    <>
      <ul className="tabs">
        {/* <Tab links={days} /> */}
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
};
ScheduleInner.propTypes = {
  schedule: PropTypes.array
};

export default Schedule;
