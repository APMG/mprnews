import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';
import Page from '../endpoints/Page';

/* eslint react/display-name: 0 */

const StaticPage = (props) => (
  <App>
    <Page slug={props.slug} />
  </App>
);

StaticPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

StaticPage.propTypes = {
  slug: PropTypes.string
};

export default StaticPage;
