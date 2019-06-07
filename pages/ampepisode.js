import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import MainLayout from '../layouts/MainLayout';
import Episode from '../endpoints/Episode';

/* eslint react/display-name: 0 */

const AmpEpsiode = withAmp(({ slug }) => {
  return (
    <MainLayout>
      <Episode slug={slug} />
    </MainLayout>
  );
});

AmpEpsiode.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

AmpEpsiode.propTypes = {
  slug: PropTypes.string
};

export default AmpEpsiode;
