import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../endpoints/Story/Story';

const NewspartnerStory = ({ slug, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Story slug={slug} minimal={true} />;
};

NewspartnerStory.getInitialProps = async ({ query: { slug }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, layout: 'newspartners', errorCode };
  }

  return { slug: slug, layout: 'newspartners' };
};

NewspartnerStory.propTypes = {
  slug: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default NewspartnerStory;
