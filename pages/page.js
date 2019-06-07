import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Page from '../endpoints/Page';

/* eslint react/display-name: 0 */

const StaticPage = (props) => (
  <MainLayout>
    <Page slug={props.slug} />
  </MainLayout>
);

StaticPage.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

StaticPage.propTypes = {
  slug: PropTypes.string
};

export default StaticPage;
