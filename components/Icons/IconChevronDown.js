import React from 'react';
import PropTypes from 'prop-types';

const IconChevronDown = (props) => (
  <svg
    className={`icon ${props.elementClass ? props.elementClass : ''}`}
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    <path fill="none" d="M0 0h24v24H0V0z" />
  </svg>
);

IconChevronDown.propTypes = {
  elementClass: PropTypes.string
};

export default IconChevronDown;
