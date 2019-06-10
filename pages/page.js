import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Page from '../endpoints/Page';

/* eslint react/display-name: 0 */

const StaticPage = ({ slug, previewToken }) => (
  <MainLayout>
    <Page slug={slug} previewToken={previewToken} />
  </MainLayout>
);

StaticPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

StaticPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default StaticPage;
