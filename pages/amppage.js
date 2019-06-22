import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Page from '../endpoints/Page/Page';

/* eslint react/display-name: 0 */

const AmpPage = withAmp(({ slug }) => {
  return (
    <>
      <Page slug={slug} />
    </>
  );
});

AmpPage.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

AmpPage.propTypes = {
  slug: PropTypes.string
};

export default AmpPage;
