import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../endpoints/Episode/Episode';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug, previewToken }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Episode slug={slug} previewToken={previewToken} />
  </ContentGrid>
);

EpisodePage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

EpisodePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default EpisodePage;
