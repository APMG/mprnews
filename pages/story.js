import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../endpoints/Story/Story';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Story/story.gql';

const StoryPage = ({ data, previewToken, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Story minimal={false} data={data} previewToken={previewToken} />
    </ContentGrid>
  );
};

StoryPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  const ApolloClient = initApollo();
  let data;
  // const query = storyQuery(slug, previewToken ? previewToken : null);
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }
  }).then((result) => {
    data = result;
  });
  return {
    slug: slug,
    previewToken: previewToken || '',
    data: data.data
  };
};

StoryPage.propTypes = {
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default StoryPage;
