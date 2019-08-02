import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../endpoints/Episode/Episode';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Episode/episode.gql';

/* eslint react/display-name: 0 */

const EpisodePage = ({ data }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Episode data={data} />
  </ContentGrid>
);

EpisodePage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }
  }).then((result) => {
    data = result.data;
    console.log('DATA:', data);
  });
  return {
    data: data.episode
  };
};

EpisodePage.propTypes = {
  data: PropTypes.object
};

export default EpisodePage;
