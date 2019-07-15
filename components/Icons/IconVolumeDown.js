import React from 'react';
import PropTypes from 'prop-types';

const IconVolumeDown = (props) => {
  return (
    <svg
      width="24"
      height="24"
      className={`icon icon-volumeDown ${
        props.elementClass ? props.elementClass : ''
      }`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L9 9H6c-.55 0-1 .45-1 1z" />
    </svg>
  );
};

IconVolumeDown.propTypes = {
  elementClass: PropTypes.string
};

export default IconVolumeDown;