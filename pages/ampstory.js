import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Story from '../endpoints/Story/Story';

/* eslint react/display-name: 0 */

const AmpStory = withAmp(({ slug }) => {
  return <Story slug={slug} />;
});

AmpStory.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug, layout: 'amp' };
};

AmpStory.propTypes = {
  slug: PropTypes.string
};

export default AmpStory;
