import React from 'react';
import PropTypes from 'prop-types';
import Schedule from '../endpoints/Schedule';
import Error from 'next/error';
import { fetchSchedule } from '../utils/fetchSchedule';
const { getDateTimes, formatEachDateTime } = require('../utils/scheduleUtils');

/* eslint react/display-name: 0 */

const SchedulePage = ({ schedule }) => {
  if (!schedule) return <Error statusCode={404} />;
  return <Schedule schedule={schedule} />;
};

SchedulePage.getInitialProps = async ({ query: { slug } }) => {
  const daysOfThisWeek = getDateTimes();
  const formattedDate = formatEachDateTime(daysOfThisWeek, slug);
  const { props } = await fetchSchedule(formattedDate);

  return {
    schedule: {
      props,
      slug
    }
  };
};

SchedulePage.propTypes = {
  schedule: PropTypes.object
};

export default SchedulePage;
