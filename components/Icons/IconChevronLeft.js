import React from 'react';
import PropTypes from 'prop-types';

const IconChevronLeft = (props) => (
  <svg
    className={`icon icon-chevronLeft ${
      props.elementClass ? props.elementClass : ''
    }`}
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

IconChevronLeft.propTypes = {
  elementClass: PropTypes.string,
};

export default IconChevronLeft;
