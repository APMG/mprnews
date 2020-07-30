import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import AmpStory from '../../../endpoints/AmpStory/AmpStory';
import initApollo from '../../../lib/init-apollo';
import query from '../../../endpoints/Story/story.gql';
import { parseEmbeddedAssets } from '../../../utils/utils';

/* eslint react/display-name: 0 */

const AmpStoryPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <AmpStory data={data} />;
};

AmpStoryPage.getInitialProps = async ({ query: { slug }, res }) => {
  const ApolloClient = initApollo();
  let data,
    errorCode = false;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/'),
    },
  })
    .then((result) => {
      data = result.data;
      if (data?.story?.embeddedAssets) {
        parseEmbeddedAssets(data.story.embeddedAssets);
      }
      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }

      if (!data.story) {
        if (res) res.statusCode = 404;
        errorCode = 404;
      }
    })
    .catch(() => {
      if (res) res.statusCode = 500;
      errorCode = 500;
    });

  return {
    data,
    errorCode,
    layout: 'amp',
  };
};

AmpStoryPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object,
};

export default AmpStoryPage;
export const config = { amp: true };
