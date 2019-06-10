import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import MainLayout from '../layouts/MainLayout';
import Page from '../endpoints/Page/Page';

/* eslint react/display-name: 0 */

const AmpPage = withAmp(({ slug }) => {
  return (
    <MainLayout>
      <Page slug={slug} />
    </MainLayout>
  );
});

AmpPage.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

AmpPage.propTypes = {
  slug: PropTypes.string
};

export default AmpPage;
