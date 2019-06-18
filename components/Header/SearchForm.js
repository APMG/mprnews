import React from 'react';

const SearchForm = () => {
  return (
    <form
      id="searchForm"
      name="search"
      method="get"
      action="https://www.mprnews.org//search"
      role="search"
    >
      <label htmlFfor="searchbox">
        Search MPR
        <input
          type="search"
          placeholder="Search: Phrase, topic, politician..."
          value=""
          name="q"
          className="searchbox"
          id="nav-searchbox"
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
      <input
        type="submit"
        className="search-submit"
        value=""
        aria-hidden="true"
      />
      <span
        className="search-icon"
        aria-label="Search MPR Websites - click to open search "
      ></span>
    </form>
  );
};

export default SearchForm;
