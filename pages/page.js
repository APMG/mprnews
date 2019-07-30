import React from 'react';
import PropTypes from 'prop-types';
import Page from '../endpoints/Page/Page';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import Error from 'next/error';

/* eslint react/display-name: 0 */

const StaticPage = ({ slug, previewToken, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Page slug={slug} previewToken={previewToken} />
    </ContentGrid>
  );
};

StaticPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }
  return { slug: slug, previewToken: previewToken };
};

StaticPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default StaticPage;
