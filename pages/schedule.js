import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Schedule from '../endpoints/Schedule/';

/* eslint react/display-name: 0 */

const SchedulePage = ({ slug, props }) => (
  <MainLayout>
    <Schedule slug={slug} schedule={props} />
  </MainLayout>
);

SchedulePage.getInitialProps = async ({ query: slug, query: props }) => {
  return {
    slug: slug,
    schedule: props
  };
};

SchedulePage.propTypes = {
  props: PropTypes.object,
  slug: PropTypes.object
};

export default SchedulePage;
