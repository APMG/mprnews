import React from 'react';
import PropTypes from 'prop-types';

const IconPause = (props) => {
  return (
    <svg
      width="24"
      height="24"
      className={`icon icon-pause ${
        props.elementClass ? props.elementClass : ''
      }`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" />
    </svg>
  );
};

IconPause.propTypes = {
  elementClass: PropTypes.string
};

export default IconPause;
