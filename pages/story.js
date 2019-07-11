import React from 'react';
import PropTypes from 'prop-types';
import Story from '../endpoints/Story/Story';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

const StoryPage = ({ slug, previewToken, isNewsPartners }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Story
      slug={slug}
      previewToken={previewToken}
      minimal={false}
      isNewsPartners={isNewsPartners}
    />
  </ContentGrid>
);

StoryPage.getInitialProps = async ({
  query: { slug, isNewsPartners, previewToken }
}) => {
  return {
    slug: slug,
    isNewsPartners: isNewsPartners,
    previewToken: previewToken
  };
};

StoryPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  isNewsPartners: PropTypes.bool
};

export default StoryPage;
