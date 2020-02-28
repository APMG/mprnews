import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Profile from '../../endpoints/Profile/Profile';
import initApollo from '../../lib/init-apollo';
import profileQuery from '../../endpoints/Profile/profile.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';
import { isNumeric } from '../../utils/utils';

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
  query: { slug, previewToken },
  req,
  res
}) => {
  let data, errorCode;
  let memberDriveData;
  const pageNum = isNumeric(slug[slug.length - 1]) ? slug.pop() : 1;
  if (req) {
    memberDriveData = res.memberDriveData;
  }
  const apolloClient = initApollo();
  await apolloClient
    .query({
      query: profileQuery,
      variables: {
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: slug.join('/'),
        pageNum: parseInt(pageNum),
        previewToken: previewToken
      }
    })
    .then((result) => {
      data = result.data;
      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }
      if (!data.profile) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 404;
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
