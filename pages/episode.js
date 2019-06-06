import React from 'react';
import PropTypes from 'prop-types';
import Main from '../layouts/Main';
import Episode from '../endpoints/Episode';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug }) => (
  <Main>
    <Episode slug={slug} />
  </Main>
);

EpisodePage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

EpisodePage.propTypes = {
  slug: PropTypes.string
};

export default EpisodePage;
