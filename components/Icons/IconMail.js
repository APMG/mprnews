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
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z" />
    </svg>
  );
};

IconMail.propTypes = {
  elementClass: PropTypes.string
};

export default IconMail;
