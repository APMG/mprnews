import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Search from '../endpoints/Search/Search';

/* eslint react/display-name: 0 */

const SearchPage = ({ errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Search />;
};

SearchPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }

  return { slug: slug, previewToken: previewToken };
};

SearchPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default SearchPage;
