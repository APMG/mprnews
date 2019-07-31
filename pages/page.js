import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Page from '../endpoints/Page/Page';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Page/page.gql';
/* eslint react/display-name: 0 */

const StaticPage = ({ previewToken, errorCode, data }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Page previewToken={previewToken} data={data} />
    </ContentGrid>
  );
};

StaticPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }
  const ApolloClient = initApollo();
  let data;
  await ApolloClient.query({ query: query }).then((result) => {
    data = result;
  });

  return { slug: slug, previewToken: previewToken, data: data.data };
};

StaticPage.propTypes = {
  data: PropTypes.object,
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default StaticPage;
