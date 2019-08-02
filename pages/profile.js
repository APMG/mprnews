import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Profile from '../endpoints/Profile/Profile';

/* eslint react/display-name: 0 */

const ProfilePage = ({ slug, previewToken, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Profile slug={slug} previewToken={previewToken} />;
};

ProfilePage.getInitialProps = async ({
  query: { slug, previewToken },
  res
}) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }

  return { slug: slug, previewToken: previewToken };
};

ProfilePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ProfilePage;
