import React from 'react';
import PropTypes from 'prop-types';

const IconMute = (props) => {
  return (
    <svg
      width="24"
      height="24"
      className={`icon icon-mute ${
        props.elementClass ? props.elementClass : ''
      }`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M7 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L11 9H8c-.55 0-1 .45-1 1z" />
    </svg>
  );
};

IconMute.propTypes = {
  elementClass: PropTypes.string
};

export default IconMute;