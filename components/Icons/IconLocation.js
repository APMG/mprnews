import React from 'react';
import PropTypes from 'prop-types';

const IconLocation = (props) => {
  return (
    <svg
      width="32px"
      height="32px"
      className={props.elementClass ? props.elementClass : ''}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="32x32"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          fill="gray"
          d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
        />
      </g>
    </svg>
  );
};

IconLocation.propTypes = {
  elementClass: PropTypes.string,
};

export default IconLocation;
