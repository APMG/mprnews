import React from 'react';
import Icon from '../Icons/Icon';
import { Link } from '@apmg/titan';

const SearchForm = () => {
  return (
    <Link as={'search'} href={'/search'}>
      <Icon elementClass="icon-search" name="search" />
    </Link>
  );
};

export default SearchForm;
