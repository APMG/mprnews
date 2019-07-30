import React from 'react';
import PropTypes from 'prop-types';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';
import Error from 'next/error';

/* eslint react/display-name: 0 */

const tags = [
  {
    key: 'description',
    name: 'description',
    content: "Minnesota's Online Source for News That Matters"
  },
  {
    key: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  }
];

const title = '';

const HomePage = ({ errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return (
    <>
      <Metatags title={title} metatags={tags} links={[]} />
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
