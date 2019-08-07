import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { withAmp } from 'next/amp';
import Episode from '../endpoints/Episode/Episode';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Episode/episode.gql';

/* eslint react/display-name: 0 */

const AmpEpisode = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Episode data={data} />;
};

AmpEpisode.getInitialProps = async ({ query: { slug }, res }) => {
  const ApolloClient = initApollo();
  let data, errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }
  })
    .then((result) => {
      data = result.data;
      if (res && !data.episode) {
        res.status(404);
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    errorCode: errorCode,
    data: data.episode,
    layout: 'amp'
  };
};

AmpEpisode.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default withAmp(AmpEpisode, { hybrid: true });
