import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../endpoints/Episode/Episode';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Episode/episode.gql';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug, previewToken, data }) => (
  <ContentGrid sidebar={<Sidebar />}>
    <Episode slug={slug} previewToken={previewToken} data={data} />
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
  });
  return {
    slug: slug,
    previewToken: previewToken || '',
    data: data.episode
  };
};

EpisodePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  data: PropTypes.object
};

export default EpisodePage;
