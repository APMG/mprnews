import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Episode from '../endpoints/Episode/Episode';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

/* eslint react/display-name: 0 */

const EpisodePage = ({ slug, previewToken, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Episode slug={slug} previewToken={previewToken} />
    </ContentGrid>
  );
};

EpisodePage.getInitialProps = async ({
  query: { slug, previewToken },
  res
}) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }

  return { slug: slug, previewToken: previewToken };
};

EpisodePage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default EpisodePage;
