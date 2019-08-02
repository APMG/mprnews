import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../endpoints/Story/Story';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Story/story.gql';

const NewspartnerStory = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Story data={data} minimal={true} />;
};

NewspartnerStory.getInitialProps = async ({ query: { slug }, res }) => {
  const ApolloClient = initApollo();
  let data, errorCode;
  // const query = storyQuery(slug, previewToken ? previewToken : null);
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }
  }).then((result) => {
    data = result;
    if (res && !data.story) {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    }
  });
  return {
    data: data.data,
    errorCode: errorCode,
    layout: 'newspartners'
  };
};

NewspartnerStory.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default NewspartnerStory;
