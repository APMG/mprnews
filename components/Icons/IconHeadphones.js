import React from 'react';
import PropTypes from 'prop-types';

const IconHeadphones = (props) => (
  <svg
    className={`icon icon-headphones ${
      props.elementClass ? props.elementClass : ''
    }`}
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M30 26c-1.104 0-2-0.896-2-2v-8c0-6.627-5.373-12-12-12s-12 5.373-12 12v8c0 1.104-0.896 2-2 2s-2-0.896-2-2v-8c0-8.837 7.164-16 16-16s16 7.163 16 16v8c0 1.104-0.896 2-2 2zM7 18h2c0.552 0 1 0.447 1 1v10c0 0.553-0.448 1-1 1h-2c-0.552 0-1-0.447-1-1v-10c0-0.553 0.448-1 1-1zM23 18h2c0.553 0 1 0.447 1 1v10c0 0.553-0.447 1-1 1h-2c-0.553 0-1-0.447-1-1v-10c0-0.553 0.447-1 1-1z" />
  </svg>
);

IconHeadphones.propTypes = {
  elementClass: PropTypes.string,
};

export default IconHeadphones;
