import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../endpoints/Episode/Episode';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug, previewToken }) => {
  return <Episode slug={slug} previewToken={previewToken} />;
};

EpisodePage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

EpisodePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default EpisodePage;
