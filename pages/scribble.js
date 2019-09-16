import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

const ScribblePage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return <div className="scribbleLive"></div>;
};

ScribblePage.getInitialProps = async ({ res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { errorCode };
  }

  return {};
};

ScribblePage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ScribblePage;
