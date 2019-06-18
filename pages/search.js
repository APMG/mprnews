import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Search from '../endpoints/Search/Search';

/* eslint react/display-name: 0 */

const SearchPage = () => (
  <MainLayout>
    <Search />
  </MainLayout>
);

SearchPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

export default SearchPage;
