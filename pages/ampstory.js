import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import AmpStory from '../endpoints/AmpStory/AmpStory';
import Story from '../endpoints/Story/Story';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Story/story.gql';

/* eslint react/display-name: 0 */

const AmpStoryPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <AmpStory data={data} />;
};

AmpStoryPage.getInitialProps = async ({ query: { slug }, res }) => {
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
      if (res && !data.story) {
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
    layout: 'amp'
  };
};

AmpStoryPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default AmpStoryPage;
export const config = { amp: true };
