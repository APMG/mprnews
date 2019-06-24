import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Collection from '../endpoints/Collection/Collection';

/* eslint react/display-name: 0 */

const CollectionPage = ({ slug, collection, pageNum }) => (
  <MainLayout>
    <Collection
      collectionName={collection}
      endpointName={slug}
      pageNum={parseInt(pageNum)}
    />
  </MainLayout>
);

CollectionPage.getInitialProps = async ({
  query: { slug, collection, pageNum }
}) => {
  return { slug, collection, pageNum };
};

CollectionPage.propTypes = {
  slug: PropTypes.string,
  collection: PropTypes.string,
  pageNum: PropTypes.number
};
export default CollectionPage;
