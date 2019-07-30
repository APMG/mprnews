import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import Twitter from '../endpoints/Twitter/Twitter';

const TwitterPage = ({ slug, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return <Twitter slug={slug} />;
};

TwitterPage.getInitialProps = async ({ query: { slug }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, layout: 'card', errorCode };
  }

  return { slug: slug, layout: 'card' };
};

TwitterPage.propTypes = {
  slug: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default TwitterPage;
