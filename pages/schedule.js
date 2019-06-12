import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Schedule from '../endpoints/Schedule/';

/* eslint react/display-name: 0 */

const SchedulePage = ({ slug }) => (
  <MainLayout>
    <Schedule slug={slug} />
  </MainLayout>
);

SchedulePage.getInitialProps = async ({ query: { slug } }) => {
  return {
    slug: slug
  };
};

SchedulePage.propTypes = {
  slug: PropTypes.string
};

export default SchedulePage;
