import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';

const ScribblePage = ({ errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
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
