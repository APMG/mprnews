import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Profile from '../endpoints/Profile/Profile';

/* eslint react/display-name: 0 */

const ProfilePage = ({ slug, previewToken }) => {
  return (
    <MainLayout>
      <Profile slug={slug} previewToken={previewToken} />
    </MainLayout>
  );
};

ProfilePage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

ProfilePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

export default ProfilePage;
