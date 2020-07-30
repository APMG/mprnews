import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenuItem = (props) => {
  return <li>{props.children}</li>;
};

DropdownMenuItem.propTypes = {
  children: PropTypes.object,
};

export default DropdownMenuItem;
