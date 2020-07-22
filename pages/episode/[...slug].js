import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Episode from '../../endpoints/Episode/Episode';
import ContentGrid from '../../grids/ContentGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import initApollo from '../../lib/init-apollo';
import episodeQuery from '../../endpoints/Episode/episode.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';
import adCleanup from '../../utils/adCleanup';
import { parseEmbeddedAssets } from '../../utils/utils';

/* eslint react/display-name: 0 */

const EpisodePage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Episode data={data} />
    </ContentGrid>
  );
};

EpisodePage.getInitialProps = async ({
  query: { slug, previewToken },
  req,
  res
}) => {
  let memberDriveData;
  if (req) {
    memberDriveData = req.memberDriveData;
  }
  const ApolloClient = initApollo();
  let data,
    errorCode = false;
  await ApolloClient.query({
    query: episodeQuery,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/'),
      previewToken: previewToken
    }
  })
    .then((result) => {
      data = result.data;
      if (data?.episode?.embeddedAssets) {
        parseEmbeddedAssets(data.episode.embeddedAssets);
      }

      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }
      if (!data.episode) {
        if (res) res.statusCode = 404;
        errorCode = 404;
      }
    })
    .catch(() => {
      if (res) res.statusCode = 500;
      errorCode = 500;
    });

  adCleanup();
  return {
    data: data,
    errorCode: errorCode,
    memberDriveData
  };
};

EpisodePage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object
};

export default EpisodePage;
