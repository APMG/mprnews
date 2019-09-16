import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import Episode from '../endpoints/Episode/Episode';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Episode/episode.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

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
  res
}) => {
  const memberDriveData = res.memberDriveData;
  const ApolloClient = initApollo();
  let data, errorCode;
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
      if (!data.episode) {
        res.status(404);
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

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
