import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Episode from '../endpoints/Episode/Episode';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug }) => (
  <MainLayout>
    <Episode slug={slug} />
  </MainLayout>
);

EpisodePage.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

EpisodePage.propTypes = {
  slug: PropTypes.string
};

export default EpisodePage;
