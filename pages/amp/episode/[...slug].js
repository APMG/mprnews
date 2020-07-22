import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import AmpEpisode from '../../../endpoints/AmpEpisode/AmpEpisode';
import initApollo from '../../../lib/init-apollo';
import query from '../../../endpoints/Episode/episode.gql';
import { parseEmbeddedAssets } from '../../../utils/utils';

/* eslint react/display-name: 0 */

const AmpEpisodePage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <AmpEpisode data={data} />;
};

AmpEpisodePage.getInitialProps = async ({ query: { slug }, res }) => {
  const ApolloClient = initApollo();
  let data,
    errorCode = false;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/')
    }
  })
    .then((result) => {
      data = result.data;
      if (data?.episode?.embeddedAssets) {
        parseEmbeddedAssets(data.episode.embeddedAssets);
      }

      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }

      if (res && !data.episode) {
        if (res) res.statusCode = 404;
        errorCode = 404;
      }
    })
    .catch(() => {
      if (res) res.statusCode = 500;
      errorCode = 500;
    });

  return {
    errorCode,
    data,
    layout: 'amp'
  };
};

AmpEpisodePage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default AmpEpisodePage;
export const config = { amp: true };
