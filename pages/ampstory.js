import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import MainLayout from '../layouts/MainLayout';
import Story from '../endpoints/Story/Story';

/* eslint react/display-name: 0 */

const AmpStory = withAmp(({ slug }) => {
  return (
    <MainLayout>
      <Story slug={slug} />
    </MainLayout>
  );
});

AmpStory.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

AmpStory.propTypes = {
  slug: PropTypes.string
};

export default AmpStory;
