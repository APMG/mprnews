import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Episode from '../endpoints/Episode/Episode';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug, previewToken }) => {
  return (
    <MainLayout>
      <Episode slug={slug} previewToken={previewToken} />
    </MainLayout>
  );
};

EpisodePage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

EpisodePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default EpisodePage;
