import React, { useState } from 'react';
import { Button } from '@apmg/titan';
import Icon from '../Icons/Icon';
import Link from 'next/link';

const SearchForm = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Link as={'search'} href={'/search'}>
      <a>
        <Icon elementClass="icon-search" name="search" />
      </a>
    </Link>
  );
};

export default SearchForm;
