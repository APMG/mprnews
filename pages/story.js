import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Story from '../endpoints/Story';

const StoryPage = ({ slug }) => (
  <MainLayout>
    <Story slug={slug} />
  </MainLayout>
);

StoryPage.getInitialProps = async ({ query: { slug } }) => {
  return { slug: slug };
};

StoryPage.propTypes = {
  slug: PropTypes.string
};

export default StoryPage;
