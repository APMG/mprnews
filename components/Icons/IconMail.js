import React from 'react';
import PropTypes from 'prop-types';

const IconMail = (props) => {
  return (
    <svg
      width="24"
      height="24"
      className={`icon icon-mail ${
        props.elementClass ? props.elementClass : ''
      }`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M19.2,5.8H4.8A1.79,1.79,0,0,0,3,7.6V18.4a1.79,1.79,0,0,0,1.8,1.8H19.2A1.79,1.79,0,0,0,21,18.4V7.6A1.79,1.79,0,0,0,19.2,5.8Zm-.4,3.8L13,13.3a1.65,1.65,0,0,1-1.9,0L5.2,9.6A.62.62,0,0,1,4.8,9,.75.75,0,0,1,6,8.4l6,3.8,6-3.8a.78.78,0,0,1,1.2.6A.62.62,0,0,1,18.8,9.6Z" />
    </svg>
  );
};

IconMail.propTypes = {
  elementClass: PropTypes.string,
};

export default IconMail;
