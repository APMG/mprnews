import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Schedule from '../endpoints/Schedule';

/* eslint react/display-name: 0 */

const SchedulePage = ({ props }) => (
  <MainLayout>
    <Schedule schedule={props} />
  </MainLayout>
);

SchedulePage.getInitialProps = async ({ query: props, query: slug }) => {
  return {
    slug: slug,
    props: props
  };
};

SchedulePage.propTypes = {
  props: PropTypes.object
};

export default SchedulePage;
