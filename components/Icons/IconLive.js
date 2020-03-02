import React from 'react';
import PropTypes from 'prop-types';

const IconLive = (props) => {
  return (
    <svg
      width="100"
      height="100"
      className={`icon icon-live ${
        props.elementClass ? props.elementClass : ''
      }`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g fill="#E84B37" fillRule="evenodd">
        <path
          d="M50 70C61 70 70 61 70 50 70 39 61 30 50 30 39 30 30 39 30 50 30 61 39 70 50 70L50 70Z"
          className="icon-live-dot"
        />
        <path
          d="M74.7 25.3C81.1 31.6 85 40.3 85 50 85 59.7 81.1 68.4 74.7 74.7L67.7 67.7C72.2 63.2 75 56.9 75 50 75 43.1 72.2 36.8 67.7 32.3L74.7 25.3 74.7 25.3Z"
          className="icon-live-wave-1 right"
        />
        <path
          d="M25.3 25.3C18.9 31.6 15 40.3 15 50 15 59.7 18.9 68.4 25.3 74.7L32.3 67.7C27.8 63.2 25 56.9 25 50 25 43.1 27.8 36.8 32.3 32.3L25.3 25.3 25.3 25.3Z"
          className="icon-live-wave-1 left"
        />
        <path
          d="M85.4 14.6C94.4 23.7 100 36.2 100 50 100 63.8 94.4 76.3 85.4 85.4L78.3 78.3C85.5 71 90 61 90 50 90 39 85.5 29 78.3 21.7L85.4 14.6 85.4 14.6Z"
          className="icon-live-wave-2 right"
        />
        <path
          d="M14.6 14.6C5.6 23.7 0 36.2 0 50 0 63.8 5.6 76.3 14.6 85.4L21.7 78.3C14.5 71 10 61 10 50 10 39 14.5 29 21.7 21.7L14.6 14.6 14.6 14.6Z"
          className="icon-live-wave-2 left"
        />
      </g>
    </svg>
  );
};

IconLive.propTypes = {
  elementClass: PropTypes.string
};

export default IconLive;
