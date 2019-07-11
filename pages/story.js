import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

const StoryPage = ({ slug, previewToken }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Story slug={slug} previewToken={previewToken} minimal={false} />
  </ContentGrid>
);

StoryPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

StoryPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default StoryPage;
