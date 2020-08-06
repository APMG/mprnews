import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Profile from '../../../endpoints/Profile/Profile';
import ContentGrid from '../../../grids/ContentGrid';
import Sidebar from '../../../components/Sidebar/Sidebar';
import initApollo from '../../../lib/init-apollo';
import gql from '../../../endpoints/Profile/profile.gql';
import { parseEmbeddedAssets } from '../../../utils/utils';

import {
  fetchMemberDriveStatus,
  addMemberDriveElements,
} from '../../../utils/membershipUtils';

const ProfilePage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Profile data={data} pageNum={1} />
    </ContentGrid>
  );
};

ProfilePage.getInitialProps = async ({ query: { slug, token }, res }) => {
  const ApolloClient = initApollo();
  let data,
    errorCode = false;

  await ApolloClient.query({
    query: gql,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/'),
      previewToken: token,
    },
  })
    .then((result) => {
      data = result.data;
      if (data?.profile?.parseEmbeddedAssets) {
        parseEmbeddedAssets(data.profile.parseEmbeddedAssets);
      }

      res.setHeader('Cache-Control', 'no-store, must-revalidate');
      if (!data.profile) {
        if (res) res.statusCode = 404;
        errorCode = 404;
      }
    })
    .catch(() => {
      if (res) res.statusCode = 500;
      errorCode = 500;
    });

  return {
    data,
    errorCode,
  };
};

ProfilePage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object,
};

export default ProfilePage;
