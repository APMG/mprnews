import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Collection from '../endpoints/Collection/Collection';

/* eslint react/display-name: 0 */

const CollectionPage = ({ slug, pageNum = 1 }) => (
  <MainLayout>
    <Collection collectionName={slug} pageNum={parseInt(pageNum)} />
  </MainLayout>
);

CollectionPage.getInitialProps = async ({ query: { slug, pageNum } }) => {
  return { slug, pageNum };
};

CollectionPage.propTypes = {
  slug: PropTypes.string,
  pageNum: PropTypes.string
};
export default CollectionPage;
