import React from 'react';
import PropTypes from 'prop-types';
import Collection from '../endpoints/Collection/Collection';

/* eslint react/display-name: 0 */

const CollectionPage = ({ slug, pageNum = 1 }) => {
  return <Collection collectionName={slug} pageNum={parseInt(pageNum)} />;
};

CollectionPage.getInitialProps = async ({ query: { slug, pageNum } }) => {
  return { slug, pageNum };
};

CollectionPage.propTypes = {
  slug: PropTypes.string,
  pageNum: PropTypes.string
};
export default CollectionPage;
