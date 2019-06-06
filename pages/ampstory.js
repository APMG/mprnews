import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Main from '../layouts/Main';
import Story from '../endpoints/Story';

/* eslint react/display-name: 0 */

const AmpStory = withAmp(({ slug }) => {
  return (
    <Main>
      <Story slug={slug} />
    </Main>
  );
});

AmpStory.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

AmpStory.propTypes = {
  slug: PropTypes.string
};

export default AmpStory;
