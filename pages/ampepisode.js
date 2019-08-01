import React from 'react';
import PropTypes from 'prop-types';
import { withAmp } from 'next/amp';
import Episode from '../endpoints/Episode/Episode';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Episode/episode.gql';

/* eslint react/display-name: 0 */

const AmpEpisode = ({ data }) => {
  return <Episode data={data} />;
};

AmpEpisode.getInitialProps = async ({ query: { slug } }) => {
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }
  }).then((result) => {
    data = result.data;
  });
  return {
    slug: slug,
    data: data.episode,
    layout: 'amp'
  };
};

AmpEpisode.propTypes = {
  data: PropTypes.object
};

export default withAmp(AmpEpisode, { hybrid: true });
