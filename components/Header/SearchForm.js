import React, { useState } from 'react';
import { Button } from '@apmg/titan';
import Icon from '../Icons/Icon';

const SearchForm = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form
      id="searchForm"
      name="search"
      method="get"
      action="/search"
      role="search"
    >
      <label htmlFor="searchbox" className="search is-closed">
        <span className="invisible">Search MPR</span>
        <input
          type="search"
          placeholder="Search: Phrase, topic, politician..."
          value={value}
          name="q"
          className="searchbox"
          id="nav-searchbox"
          onChange={handleInputChange}
        />
      </label>
      <input type="hidden" name="site" value="mpr" />
      <input type="hidden" name="client" value="mpr" />
      <input type="hidden" name="ie" value="UTF-8" />
      <input type="hidden" name="oe" value="UTF-8" />
      <input type="hidden" name="output" value="xml" />
      <input type="hidden" name="entqr" value="3" />
      <input type="hidden" name="filter" value="p" />
      <input type="hidden" name="numgm" value="5" />
      <input type="hidden" name="access" value="p" />
      <input type="hidden" name="start" value="0" />
      <input type="hidden" name="num" value="10" />

      <Button submitForm={true} className="searchButton">
        <Icon elementClass="icon-search" name="search" />
      </Button>
      <span
        className="search-icon"
        aria-label="Search MPR Websites - click to open search "
      />
    </form>
  );
};

export default SearchForm;
