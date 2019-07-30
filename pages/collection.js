import React from 'react';
import PropTypes from 'prop-types';
import Collection from '../endpoints/Collection/Collection';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import Error from 'next/error';

/* eslint react/display-name: 0 */

const CollectionPage = ({ slug, pageNum = 1, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Collection collectionName={slug} pageNum={parseInt(pageNum)} />
    </ContentGrid>
  );
};

CollectionPage.getInitialProps = async ({ query: { slug, pageNum }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;

    return { slug, pageNum, errorCode };
  }

  return { slug, pageNum };
};

CollectionPage.propTypes = {
  slug: PropTypes.string,
  pageNum: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default CollectionPage;
