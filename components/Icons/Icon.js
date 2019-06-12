import React from 'react';
import PropTypes from 'prop-types';
import IconEmpty from './IconEmpty';
import IconFacebook from './IconFacebook';
import IconChevronDown from './IconChevronDown';
import IconSearch from './IconSearch';
import IconTwitter from './IconTwitter';
import IconLocation from './IconLocation';

const icons = {
  empty: IconEmpty,
  chevronDown: IconChevronDown,
  facebook: IconFacebook,
  location: IconLocation,
  search: IconSearch,
  twitter: IconTwitter
};

const Icon = (props) => {
  const { name, ...rest } = props;

  // Check if the icon is in the list; if not, render the empty icon
  const Element = icons[name] ? icons[name] : icons.empty;

  return <Element {...rest} />;
};

Icon.propTypes = {
  name: PropTypes.string
};

export default Icon;
