import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Main from '../layouts/Main';
import Episode from '../endpoints/Episode';

/* eslint react/display-name: 0 */

const AmpEpsiode = withAmp(({ slug }) => {
  return (
    <Main>
      <Episode slug={slug} />
    </Main>
  );
});

AmpEpsiode.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

AmpEpsiode.propTypes = {
  slug: PropTypes.string
};

export default AmpEpsiode;
