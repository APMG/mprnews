import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Home/home.gql';

/* eslint react/display-name: 0 */

const HomePage = ({ errorCode, data }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <>
      <Metatags fullSlug="" topic="homepage" />
      <Home data={data} />
    </>
  );
};

HomePage.getInitialProps = async () => {
  let data;
  const ApolloClient = initApollo();
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: 'homepage'
    }
  }).then((result) => {
    data = result;
  });
  return data;
};

HomePage.propTypes = {
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default HomePage;
