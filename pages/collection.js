import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Collection from '../endpoints/Collection/Collection';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Collection/collection.gql';

/* eslint react/display-name: 0 */

const CollectionPage = ({ data, pageNum, errorCode, slug }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Collection data={data} pageNum={pageNum} slug={slug} />
    </ContentGrid>
  );
};

CollectionPage.getInitialProps = async ({
  query: { slug, pageNum = 1 },
  res
}) => {
  const ApolloClient = initApollo();
  let data, errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      pageNum: parseInt(pageNum)
    }
  })
    .then((result) => {
      data = result.data;
      if (!data.collection) {
        res.status(404);
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    data,
    errorCode,
    pageNum: parseInt(pageNum),
    slug
  };
};

CollectionPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object,
  pageNum: PropTypes.number,
  slug: PropTypes.string
};

export default CollectionPage;
