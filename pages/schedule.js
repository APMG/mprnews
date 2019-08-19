import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import ErrorPage from 'next/error';
// import { getDateTimes, formatEachDateTime } from '../utils/scheduleUtils';
import Schedule from '../endpoints/Schedule/Schedule';

const SchedulePage = ({ schedule, errorCode }) => {
  if (!schedule || errorCode) return <ErrorPage statusCode={404} />;
  return <Schedule schedule={schedule} />;
};

SchedulePage.getInitialProps = async ({ query: { slug }, req, res }) => {
  const scheduleUrl = req
    ? `${req.protocol}://${req.headers['host']}/api/schedule/${slug}`
    : `/api/schedule/${slug}`;
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
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default SchedulePage;
