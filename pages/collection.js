import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import MainLayout from '../layouts/MainLayout';
import Collection from '../endpoints/Collection/Collection';

/* eslint react/display-name: 0 */

const CollectionPage = ({ collection, pageNum }) => (
  <MainLayout>
    <div>
      <section className="Collection section">
        <Heading level={2}>Collection of {collection}</Heading>
        <Collection collectionName={collection} pageNum={parseInt(pageNum)} />
      </section>
    </div>
  </MainLayout>
);

CollectionPage.getInitialProps = async ({
  query: { slug, collection, pageNum }
}) => {
  return { slug, collection, pageNum };
};

CollectionPage.propTypes = {
  collection: PropTypes.string,
  pageNum: PropTypes.number
};
export default CollectionPage;
