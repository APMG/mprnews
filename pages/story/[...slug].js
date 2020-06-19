import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Story from '../../endpoints/Story/Story';
import ContentGrid from '../../grids/ContentGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import initApollo from '../../lib/init-apollo';
import query from '../../endpoints/Story/story.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';
import adCleanup from '../../utils/adCleanup';
import { parseEmbeddedAssets } from '../../utils/utils';

const StoryPage = ({ data, errorCode }) => {
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
      slug: slug.join('/'),
      previewToken: previewToken
    }
  })
    .then((result) => {
      data = result.data;
      if (data?.story?.embeddedAssets) {
        parseEmbeddedAssets(data.story.embeddedAssets);
      }

      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
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
        res.end();
      }
    })
    .catch(() => {
      if (res) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    });

  adCleanup();
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
