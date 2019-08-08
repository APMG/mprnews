import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Twitter from '../endpoints/Twitter/Twitter';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Twitter/twitter.gql';

const TwitterPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statuscode={errorCode} />;
  return <Twitter data={data} />;
};

TwitterPage.getInitialProps = async ({
  query: { slug, previewToken },
  res
}) => {
  const ApolloClient = initApollo();
  let data;
  let errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }
  })
    .then((result) => {
      data = result.data;
      if (res && !data.twitter) {
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
    layout: 'card'
  };
};

TwitterPage.propTypes = {
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default TwitterPage;
