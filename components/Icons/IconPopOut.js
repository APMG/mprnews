import React from 'react';
import PropTypes from 'prop-types';

const IconPopOut = (props) => {
  return (
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
      <path d="M30 24h-2v-20h-20v-2c0-1.105 0.895-2 2-2h20c1.105 0 2 0.894 2 2v20c0 1.105-0.895 2-2 2zM26 8v22c0 1.105-0.895 2-2 2h-22c-1.105 0-2-0.895-2-2v-22c0-1.106 0.894-2 2-2h22c1.105 0 2 0.894 2 2zM22 10h-18v6h18v-6zM22 20h-18v8h18v-8zM8 14h-2v-2h2v2zM12 14h-2v-2h2v2zM20 14h-6v-2h6v2z"></path>
    </svg>
  );
};

IconPopOut.propTypes = {
  elementClass: PropTypes.string,
};

export default IconPopOut;
