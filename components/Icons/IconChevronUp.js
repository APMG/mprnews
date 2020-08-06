import React from 'react';
import PropTypes from 'prop-types';

const IconChevronUp = (props) => (
  <svg
    className={`icon icon-chevronUp ${
      props.elementClass ? props.elementClass : ''
    }`}
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

IconChevronUp.propTypes = {
  elementClass: PropTypes.string
};

export default IconChevronUp;
