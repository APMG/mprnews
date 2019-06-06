import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Main from '../layouts/Main';
import Page from '../endpoints/Page';

/* eslint react/display-name: 0 */

const AmpPage = withAmp(({ slug }) => {
  return (
    <Main>
      <Page slug={slug} />
    </Main>
  );
});

AmpPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

AmpPage.propTypes = {
  slug: PropTypes.string
};

export default AmpPage;
