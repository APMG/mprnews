import React from 'react';
import PropTypes from 'prop-types';
import Page from '../endpoints/Page/Page';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

/* eslint react/display-name: 0 */

const StaticPage = ({ slug, previewToken }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Page slug={slug} previewToken={previewToken} />
  </ContentGrid>
);

StaticPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

StaticPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default StaticPage;
