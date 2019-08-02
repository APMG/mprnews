import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Page from '../endpoints/Page/Page';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Page/page.gql';

/* eslint react/display-name: 0 */

const StaticPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Page data={data} />
    </ContentGrid>
  );
};

StaticPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }
  }).then((result) => {
    data = result.data;
    if (!data.page) {
      res.status(404);
    }
  });

  const errorCode = res.statusCode > 200 ? res.statusCode : false;
  return {
    data: data,
    errorCode: errorCode
  };
};

StaticPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default StaticPage;
