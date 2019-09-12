import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import ContentGrid from '../grids/ContentGrid';
import AllNews from '../endpoints/AllNews/AllNews';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/AllNews/allNews.gql';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../utils/membershipUtils';

const AllNewsPage = ({ data, errorCode, pageNum }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <AllNews data={data} pageNum={pageNum} />
    </ContentGrid>
  );
};

AllNewsPage.getInitialProps = async ({
  query: { pageNum = 1, previewToken },
  req,
  res
}) => {
  let memberDriveData;
  if (req) {
    memberDriveData = req.memberDriveData;
  }
  const ApolloClient = initApollo();
  let data;
  let errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      pageNum: parseInt(pageNum),
      previewToken: previewToken
    }
  })
    .then((result) => {
      data = result.data;
      if (res && !data.allNews) {
        res.status(404);
        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }
    })
    .catch(() => {
      res.status(404);
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return { data, errorCode, pageNum: parseInt(pageNum), memberDriveData };
};

AllNewsPage.propTypes = {
  data: PropTypes.object,
  pageNum: PropTypes.number,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default AllNewsPage;
