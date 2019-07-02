import React from 'react';
import Icon from '../Icons/Icon';
import Link from 'next/link';

const SearchForm = () => {
  return (
    <Link as={'search'} href={'/search'}>
      <a>
        <Icon elementClass="icon-search" name="search" />
      </a>
    </Link>
  );
};

export default SearchForm;
