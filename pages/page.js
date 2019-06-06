import React from 'react';
import PropTypes from 'prop-types';
import Main from '../layouts/Main';
import Page from '../endpoints/Page';

/* eslint react/display-name: 0 */

const StaticPage = (props) => (
  <Main>
    <Page slug={props.slug} />
  </Main>
);

StaticPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

StaticPage.propTypes = {
  slug: PropTypes.string
};

export default StaticPage;
