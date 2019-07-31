import React from 'react';
import PropTypes from 'prop-types';
import ContentGrid from '../grids/ContentGrid';
import AllNews from '../endpoints/AllNews/AllNews';
import Sidebar from '../components/Sidebar/Sidebar';

const AllNewsPage = ({ pageNum = 1 }) => {
  return (
    <ContentGrid sidebar={<Sidebar />}>
      <AllNews pageNum={parseInt(pageNum)} />
    </ContentGrid>
  );
};

AllNewsPage.getInitialProps = async ({ query: { pageNum } }) => {
  return { pageNum };
};

AllNewsPage.propTypes = {
  pageNum: PropTypes.string
};

export default AllNewsPage;
