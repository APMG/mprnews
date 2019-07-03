import React from 'react';
import PropTypes from 'prop-types';
import Page from '../endpoints/Page/Page';

/* eslint react/display-name: 0 */

const StaticPage = ({ slug, previewToken }) => (
  <Page slug={slug} previewToken={previewToken} />
);

StaticPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

StaticPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default StaticPage;
