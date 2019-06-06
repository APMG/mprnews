import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import App from '../components/App';
import Story from '../endpoints/Story';

/* eslint react/display-name: 0 */

const AmpStory = withAmp((props) => {
  return (
    <App>
      <Story slug={props.slug} />
    </App>
  );
});

AmpStory.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

AmpStory.propTypes = {
  slug: PropTypes.string
};

export default AmpStory;
