import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import initApollo from '../../lib/init-apollo';
import query from '../../endpoints/Department/department.gql';
import Department from '../../endpoints/Department/Department';
import ContentGrid from '../../grids/ContentGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import adCleanup from '../../utils/adCleanup';

const DepartmentPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Department data={data} />
    </ContentGrid>
  );
};

DepartmentPage.getInitialProps = async ({ query: { slug }, res }) => {
  const apolloClient = initApollo();
  let errorCode = false,
    result;

  if (res) {
    res.setHeader('Cache-Control', 'public, max-age=60');
  }

  try {
    result = await apolloClient.query({
      query: query,
      variables: {
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: slug.join('/')
      }
    });
  } catch (err) {
    if (res) res.statusCode = 500;
    return {
      data: {},
      errorCode: 500
    };
  }

  if (!result?.data.department) {
    if (res) res.statusCode = 404;
    errorCode = 404;
  }

  adCleanup();
  return {
    data: result?.data || {},
    errorCode
  };
};

DepartmentPage.propTypes = {
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default DepartmentPage;
