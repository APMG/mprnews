import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';
import Error from 'next/error';

const NewspartnerStory = ({ slug, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
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
