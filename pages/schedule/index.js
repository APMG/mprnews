import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import ErrorPage from 'next/error';
import Schedule from '../../endpoints/Schedule/Schedule';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';
import { daysofweek } from '../../server/daysofweek';
import { protocol } from '../../utils/utils';

const SchedulePage = ({ schedule, errorCode }) => {
  if (!schedule || errorCode) return <ErrorPage statusCode={404} />;
  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return <Schedule schedule={schedule} />;
};

SchedulePage.getInitialProps = async ({ req, res }) => {
  const dte = new Date();
  const dayofweekIdx = dte.getDay();
  const day = daysofweek()[dayofweekIdx];

  const scheduleUrl = req
    ? `${protocol()}://${req.headers['host']}/api/schedule/${day}`
    : `/api/schedule/${day}`;
  const scheduleRes = await fetch(scheduleUrl);
  const props = await scheduleRes.json();

  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return {
      schedule: {
        props,
        day
      },
      errorCode
    };
  }

  return {
    schedule: {
      props,
      day
    }
  };
};

SchedulePage.propTypes = {
  schedule: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default SchedulePage;