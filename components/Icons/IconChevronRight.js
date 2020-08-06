import React from 'react';
import PropTypes from 'prop-types';

const IconChevronRight = (props) => (
  <svg
    className={`icon icon-chevronRight ${
      props.elementClass ? props.elementClass : ''
    }`}
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

IconChevronRight.propTypes = {
  elementClass: PropTypes.string
};

export default IconChevronRight;
