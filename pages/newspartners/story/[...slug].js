import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../../../endpoints/Story/Story';
import initApollo from '../../../lib/init-apollo';
import query from '../../../endpoints/Story/story.gql';

const NewspartnerStory = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Story data={data} minimal={true} />;
};

NewspartnerStory.getInitialProps = async ({ query: { slug }, res }) => {
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
      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }
      if (!data.story) {
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
    layout: 'newspartners'
  };
};

NewspartnerStory.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default NewspartnerStory;
