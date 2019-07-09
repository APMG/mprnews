import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';

const StoryPage = ({ slug, previewToken }) => {
  return <Story slug={slug} previewToken={previewToken} minimal={false} />;
};

StoryPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

StoryPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default StoryPage;
