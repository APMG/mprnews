import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import Episode from '../endpoints/Episode';

/* eslint react/display-name: 0 */

const EpisodePage = (props) => (
  <App>
    <Episode slug={props.slug} />
  </App>
);

EpisodePage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

EpisodePage.propTypes = {
  slug: PropTypes.string
};

export default EpisodePage;
