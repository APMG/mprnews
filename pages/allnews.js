import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import ContentGrid from '../grids/ContentGrid';
import AllNews from '../endpoints/AllNews/AllNews';
import Sidebar from '../components/Sidebar/Sidebar';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/AllNews/allNews.gql';

const AllNewsPage = ({ data, errorCode, pageNum = 1 }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <AllNews data={data} pageNum={parseInt(pageNum)} />
    </ContentGrid>
  );
};

AllNewsPage.getInitialProps = async ({
  query: { pageNum, previewToken },
  res
}) => {
  const ApolloClient = initApollo();
  let data;
  let errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
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

  return { data, errorCode, pageNum };
};

AllNewsPage.propTypes = {
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  pageNum: PropTypes.string
};

export default AllNewsPage;
