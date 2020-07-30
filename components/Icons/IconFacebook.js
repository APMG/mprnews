import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconFacebook = (props) => {
  const classes = classNames({
    icon: true,
    'icon-facebook': true,
    [props.elementClass]: props.elementClass
  });

  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="13"
      height="25"
      viewBox="0 0 13 25"
    >
      <path d="M8.1 24.3L8.1 13.2 11.7 13.2 12.3 8.9 8.1 8.9 8.1 6.1C8.1 4.9 8.4 4 10.2 4L12.4 4 12.4 0.2C12.1 0.1 10.7 0 9.2 0 5.9 0 3.7 2 3.7 5.7L3.7 8.9 0 8.9 0 13.2 3.7 13.2 3.7 24.3 8.1 24.3Z" />
    </svg>
  );
};

IconFacebook.propTypes = {
  elementClass: PropTypes.string
};

export default IconFacebook;
