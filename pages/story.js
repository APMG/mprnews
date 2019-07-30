import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import Story from '../endpoints/Story/Story';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';

const StoryPage = ({ slug, previewToken, errorCode }) => {
  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Story slug={slug} previewToken={previewToken} minimal={false} />
    </ContentGrid>
  );
};

StoryPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return { slug: slug, previewToken: previewToken, errorCode };
  }

  return {
    slug: slug,
    previewToken: previewToken
  };
};

StoryPage.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default StoryPage;
