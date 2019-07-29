import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Story from '../endpoints/Story/Story';
import Error from 'next/error';

/* eslint react/display-name: 0 */

const AmpStory = ({ slug, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
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
  errorCode: PropTypes.number
};

export default withAmp(AmpStory, { hybrid: true });
