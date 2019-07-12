import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Page from '../endpoints/Page/Page';

/* eslint react/display-name: 0 */

const AmpPage = ({ slug }) => {
  return <Page slug={slug} />;
};

AmpPage.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug, layout: 'amp' };
};

AmpPage.propTypes = {
  slug: PropTypes.string
};

export default withAmp(AmpPage, { hybrid: true });
