import React from 'react';
import PropTypes from 'prop-types';
import Collection from '../endpoints/Collection/Collection';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Collection/collection.gql';

/* eslint react/display-name: 0 */

const CollectionPage = ({ data, slug, pageNum }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Collection data={data} slug={slug} pageNum={pageNum} />
  </ContentGrid>
);

CollectionPage.getInitialProps = async ({ query: { slug, pageNum = 1 } }) => {
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      pageNum: parseInt(pageNum)
    }
  }).then((result) => {
    data = result.data;
  });
  return { data: data.collection, slug: slug, pageNum: parseInt(pageNum) };
};

CollectionPage.propTypes = {
  data: PropTypes.object,
  pageNum: PropTypes.number,
  slug: PropTypes.string
};

export default CollectionPage;
