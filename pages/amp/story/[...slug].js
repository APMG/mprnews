import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../../../endpoints/Story/Story';
import initApollo from '../../../lib/init-apollo';
import query from '../../../endpoints/Story/story.gql';

/* eslint react/display-name: 0 */

const AmpStory = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Story data={data} />;
};

AmpStory.getInitialProps = async ({ query: { slug }, res }) => {
  const ApolloClient = initApollo();
  let data, errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/')
    }
  })
    .then((result) => {
      data = result.data;
      if (res && !data.story) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.statusCode = 404;
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    data,
    errorCode,
    layout: 'amp'
  };
};

AmpStory.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default AmpStory;
export const config = { amp: 'hybrid' };