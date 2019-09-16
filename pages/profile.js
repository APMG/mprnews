import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Profile from '../endpoints/Profile/Profile';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Profile/profile.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

/* eslint react/display-name: 0 */

const ProfilePage = ({ data, pageNum, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return <Profile data={data} pageNum={pageNum} />;
};

ProfilePage.getInitialProps = async ({
  query: { slug, pageNum = 1, previewToken },
  req,
  res
}) => {
  let data, errorCode;
  let memberDriveData;
  if (req) {
    memberDriveData = res.memberDriveData;
  }
  const ApolloClient = initApollo();
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      pageNum: parseInt(pageNum),
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
    .catch((err) => {
      console.error(err);
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    data,
    pageNum: parseInt(pageNum),
    errorCode,
    memberDriveData
  };
};

ProfilePage.propTypes = {
  data: PropTypes.object,
  pageNum: PropTypes.number,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ProfilePage;
