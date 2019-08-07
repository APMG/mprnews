import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { withAmp } from 'next/amp';
import Page from '../endpoints/Page/Page';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Page/page.gql';

/* eslint react/display-name: 0 */

const AmpPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Page data={data} />;
};

AmpPage.getInitialProps = async ({ query: { slug }, res }) => {
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
      if (res && !data.page) {
        res.status(404);
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return { data: data, errorCode: errorCode, layout: 'amp' };
};

AmpPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default withAmp(AmpPage, { hybrid: true });
