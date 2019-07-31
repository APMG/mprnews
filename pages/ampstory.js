import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { withAmp } from 'next/amp';
import Story from '../endpoints/Story/Story';

/* eslint react/display-name: 0 */

const AmpStory = ({ slug, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Story slug={slug} />;
};

AmpStory.getInitialProps = async ({ query: { slug }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, layout: 'amp', errorCode };
  }

  return { slug: slug, layout: 'amp' };
};

AmpStory.propTypes = {
  slug: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default withAmp(AmpStory, { hybrid: true });
