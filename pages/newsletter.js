import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Newsletter from '../endpoints/Newsletter/Newsletter';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements,
} from '../utils/membershipUtils';
import adCleanup from '../utils/adCleanup';

/* eslint react/display-name: 0 */

const NewsletterPage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return <Newsletter />;
};

NewsletterPage.getInitialProps = async ({ query: { slug }, req, res }) => {
  let memberDriveData;
  if (req) {
    memberDriveData = req.memberDriveData;
  }
  if (res) {
    res.setHeader('Cache-Control', 'public, max-age= 3600');
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, errorCode };
  }

  adCleanup();
  return { slug: slug, memberDriveData };
};

NewsletterPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default NewsletterPage;
