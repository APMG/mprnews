import React from 'react';
import Search from '../endpoints/Search/Search';

/* eslint react/display-name: 0 */

const SearchPage = () => <Search />;

SearchPage.getInitialProps = async ({ query: { slug, previewToken } }) => {
  return { slug: slug, previewToken: previewToken };
};

export default SearchPage;
