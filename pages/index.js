import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';

/* eslint react/display-name: 0 */

const HomePage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <>
      <Metatags fullSlug="" topic="homepage" />
      <Home />
    </>
  );
};

HomePage.getInitialProps = async ({ res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { errorCode };
  }

  return {};
};

HomePage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default HomePage;
