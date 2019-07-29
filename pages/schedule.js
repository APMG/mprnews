import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Schedule from '../endpoints/Schedule/Schedule';
import { getDateTimes, formatEachDateTime } from '../utils/scheduleUtils';

const SchedulePage = ({ schedule, errorCode }) => {
  if (!schedule || errorCode) return <Error statusCode={404} />;
  return <Schedule schedule={schedule} />;
};

SchedulePage.getInitialProps = async ({ query: { slug }, res }) => {
  const daysOfThisWeek = getDateTimes();
  const formattedDate = await formatEachDateTime(daysOfThisWeek, slug);
  const scheduleUrl = await `https://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=${formattedDate}`;
  const scheduleRes = await fetch(scheduleUrl);
  const props = await scheduleRes.json();

  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return {
      schedule: {
        props,
        slug
      },
      errorCode
    };
  }

  return {
    schedule: {
      props,
      slug
    }
  };
};

SchedulePage.propTypes = {
  schedule: PropTypes.object,
  errorCode: PropTypes.number
};

export default SchedulePage;
