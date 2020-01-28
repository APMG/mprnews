import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Home/home.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

/* eslint react/display-name: 0 */

const HomePage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <>
      <Metatags fullSlug="" topic="homepage" />
      <Home {...data} />
    </>
  );
};

HomePage.getInitialProps = async (res) => {
  let data, errorCode, memberDriveData;
  const ApolloClient = initApollo();
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: 'homepage'
    }
  })
    .then((result) => {
      data = result.data;
      if (res) {
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return { data, errorCode, memberDriveData };
};

HomePage.propTypes = {
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default HomePage;
