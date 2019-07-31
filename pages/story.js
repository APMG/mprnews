import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../endpoints/Story/Story';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import storyQuery from '../endpoints/Story/storyQuery';

const StoryPage = ({ data, previewToken, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Story minimal={false} data={data} previewToken={previewToken} />
    </ContentGrid>
  );
};

StoryPage.getInitialProps = async ({ query: { slug, previewToken }, res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    const ApolloClient = initApollo();
    let data;
    const query = storyQuery(slug, previewToken ? previewToken : null);
    await ApolloClient.query({ query: query }).then((result) => {
      data = result;
    });
    return {
      slug: slug,
      previewToken: previewToken || '',
      data: data.data,
      errorCode: errorCode
    };
  }
};

StoryPage.propTypes = {
  previewToken: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default StoryPage;
