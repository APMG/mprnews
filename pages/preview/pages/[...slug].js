import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Page from '../../../endpoints/Page/Page';
import ContentGrid from '../../../grids/ContentGrid';
import Sidebar from '../../../components/Sidebar/Sidebar';
import initApollo from '../../../lib/init-apollo';
import gql from '../../../endpoints/Page/page.gql';

import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../../utils/membershipUtils';

const StoryPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Page data={data} />
    </ContentGrid>
  );
};

StoryPage.getInitialProps = async ({ query: { slug, token }, res }) => {
  const ApolloClient = initApollo();
  let data;
  let errorCode;

  await ApolloClient.query({
    query: gql,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/'),
      previewToken: token
    }
  })
    .then((result) => {
      data = result.data;
      res.setHeader('Cache-Control', 'no-store, must-revalidate');
      if (!data.page) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.statusCode = 404;
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    data,
    errorCode
  };
};

StoryPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default StoryPage;
