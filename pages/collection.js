import React from 'react';
import PropTypes from 'prop-types';
import Collection from '../endpoints/Collection/Collection';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

/* eslint react/display-name: 0 */

const CollectionPage = ({ slug, pageNum = 1 }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Collection collectionName={slug} pageNum={parseInt(pageNum)} />
  </ContentGrid>
);

CollectionPage.getInitialProps = async ({ query: { slug, pageNum } }) => {
  return { slug, pageNum };
};

CollectionPage.propTypes = {
  slug: PropTypes.string,
  pageNum: PropTypes.string
};
export default CollectionPage;
