import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Story from '../endpoints/Story/Story';

const StoryPage = ({ slug, previewToken }) => {
  return (
    <MainLayout>
      <Story slug={slug} previewToken={previewToken} />
    </MainLayout>
  );
};

StoryPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

StoryPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default StoryPage;
