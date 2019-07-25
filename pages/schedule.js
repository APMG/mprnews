import React from 'react';
import PropTypes from 'prop-types';
import Schedule from '../endpoints/Schedule';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
const { getDateTimes, formatEachDateTime } = require('../utils/scheduleUtils');

const SchedulePage = ({ schedule }) => {
  if (!schedule) return <Error statusCode={404} />;
  return <Schedule schedule={schedule} />;
};

SchedulePage.getInitialProps = async ({ query: { slug } }) => {
  const daysOfThisWeek = getDateTimes();
  const formattedDate = await formatEachDateTime(daysOfThisWeek, slug);
  const scheduleUrl = `http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${formattedDate}`;
  const scheduleRes = await fetch(scheduleUrl);
  const props = await scheduleRes.json();

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
