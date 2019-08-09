import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Profile from '../endpoints/Profile/Profile';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Profile/profile.gql';

/* eslint react/display-name: 0 */

const ProfilePage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Profile data={data} />;
};

ProfilePage.getInitialProps = async ({
  query: { slug, previewToken },
  res
}) => {
  let data, errorCode;
  const ApolloClient = initApollo();
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
      if (!data.profile) {
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
    errorCode
  };
};

ProfilePage.propTypes = {
  data: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ProfilePage;
