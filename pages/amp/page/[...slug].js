import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Page from '../../../endpoints/Page/Page';
import initApollo from '../../../lib/init-apollo';
import query from '../../../endpoints/Page/page.gql';

/* eslint react/display-name: 0 */

const AmpPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Page data={data} />;
};

AmpPage.getInitialProps = async ({ query: { slug, pageNum = 1 }, res }) => {
  const ApolloClient = initApollo();
  let data, errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      pageNum: parseInt(pageNum),
      slug: slug.join('/')
    }
  })
    .then((result) => {
      data = result.data;
      if (res && !data.page) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.statusCode = 404;
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return { data, errorCode, layout: 'amp' };
};

AmpPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default AmpPage;
export const config = { amp: 'hybrid' };
