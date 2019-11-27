import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';
// import initApollo from '../lib/init-apollo';
//import query from '../endpoints/Home/home.gql';
import { Gql } from '../lib/Gql';
import { homeQuery } from '../queries/homeQuery';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

/* eslint react/display-name: 0 */

const HomePage = ({ results, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <>
      <Metatags fullSlug="" topic="homepage" />
      <Home {...results} />
    </>
  );
};

HomePage.getInitialProps = async (req) => {
  let data, errorCode, memberDriveData;
  if (req) {
    memberDriveData = req.memberDriveData;
  }

  const query = homeQuery('mprnews', 'homepage');
  data = await Gql(query);
  // const ApolloClient = initApollo();
  // await ApolloClient.query({
  //   query: query,
  //   variables: {
  //     contentAreaSlug: process.env.CONTENT_AREA_SLUG,
  //     slug: 'homepage'
  //   }
  // })
  //   .then((result) => {
  //     data = result.data;
  //     if (res) {
  //       errorCode = res.statusCode > 200 ? res.statusCode : false;
  //     }
  //   })
  //   .catch(() => {
  //     res.status(404);
  //     errorCode = res.statusCode > 200 ? res.statusCode : false;
  //   });
  const results = data;
  data = undefined;
  return { results, errorCode, memberDriveData };
};

HomePage.propTypes = {
  results: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default HomePage;
