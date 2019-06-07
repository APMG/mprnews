import React from 'react';
import PropTypes from 'prop-types';

const IconChevronDown = (props) => {
  return (
    <svg
      width="52px"
      height="32px"
      className={props.elementClass ? props.elementClass : ''}
      viewBox="0 0 52 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="52x32"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          fill="#000000"
          d="M0.189 5.822l5.739-5.739 20.319 20.319 20.319-20.319 5.739 5.739-26.058 26.058z"
        />
      </g>
    </svg>
  );
};
IconChevronDown.propTypes = {
  elementClass: PropTypes.string
};

export default IconChevronDown;
