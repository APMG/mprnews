import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../../../endpoints/Story/Story';
import ContentGrid from '../../../grids/ContentGrid';
import Sidebar from '../../../components/Sidebar/Sidebar';
import initApollo from '../../../lib/init-apollo';
import gql from '../../../endpoints/Story/story.gql';

import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../../utils/membershipUtils';
import { parseEmbeddedAssets } from '../../../utils/utils';

const PreviewPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Story minimal={false} data={data} />
    </ContentGrid>
  );
};

PreviewPage.getInitialProps = async ({ query: { slug, token }, res }) => {
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
      if (data?.story?.embeddedAssets) {
        parseEmbeddedAssets(data.story.embeddedAssets);
      }

      if (!data.story) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
      if (
        res &&
        data?.story?.canonicalSlug &&
        data.story.canonicalSlug !== slug.join('/')
      ) {
        res.writeHead(301, {
          Location: `/story/${data.story.canonicalSlug}`
        });
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

PreviewPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default PreviewPage;
