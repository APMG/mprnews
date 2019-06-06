import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import App from '../components/App';
import Episode from '../endpoints/Episode';

/* eslint react/display-name: 0 */

const AmpEpsiode = withAmp((props) => {
  return (
    <App>
      <Episode slug={props.slug} />
    </App>
  );
});

AmpEpsiode.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

AmpEpsiode.propTypes = {
  slug: PropTypes.string
};

export default AmpEpsiode;
