import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../endpoints/Story/Story';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Story/story.gql';

const StoryPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Story minimal={false} data={data} />
    </ContentGrid>
  );
};

StoryPage.getInitialProps = async ({
  query: { slug, previewToken },
  req,
  res
}) => {
  let memberDriveData;
  if (req) {
    memberDriveData = res.memberDriveData;
  }
  const ApolloClient = initApollo();
  let data;
  let errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }
  })
    .then((result) => {
      data = result.data;
      if (res && !data.story) {
        res.status(404);
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    data,
    errorCode,
    memberDriveData
  };
};

StoryPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default StoryPage;
