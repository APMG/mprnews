import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Search from '../endpoints/Search/Search';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

/* eslint react/display-name: 0 */

const SearchPage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return <Search />;
};

SearchPage.getInitialProps = async ({
  query: { slug, previewToken },
  req,
  res
}) => {
  let memberDriveData;
  if (req) {
    memberDriveData = req.memberDriveData;
  }
  if (res) {
    res.setHeader('Cache-Control', 'public, max-age= 3600');
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }

  return { slug: slug, previewToken: previewToken, memberDriveData };
};

SearchPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default SearchPage;
