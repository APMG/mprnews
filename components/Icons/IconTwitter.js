import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconTwitter = (props) => {
  const classes = classNames({
    icon: true,
    'icon-twitter': true,
    [props.elementClass]: props.elementClass
  });

  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="28"
      height="24"
      viewBox="0 0 28 24"
    >
      <path d="M8.7 23.4C19.2 23.4 25 14.4 25 6.6 25 6.3 25 6.1 25 5.8 26.1 5 27 4 27.8 2.8 26.8 3.2 25.7 3.6 24.5 3.7 25.7 3 26.6 1.8 27 0.4 25.9 1.1 24.7 1.6 23.4 1.9 22.4 0.7 20.9 0 19.2 0 16.1 0 13.5 2.6 13.5 5.9 13.5 6.4 13.6 6.8 13.7 7.3 9 7 4.7 4.7 1.9 1.1 1.4 2 1.2 3 1.2 4.1 1.2 6.1 2.2 7.9 3.7 9 2.8 8.9 1.9 8.7 1.1 8.2 1.1 8.3 1.1 8.3 1.1 8.3 1.1 11.2 3.1 13.6 5.7 14.1 5.2 14.2 4.7 14.3 4.2 14.3 3.8 14.3 3.5 14.3 3.1 14.2 3.8 16.5 5.9 18.3 8.4 18.3 6.5 19.9 4 20.8 1.4 20.8 0.9 20.8 0.4 20.8 0 20.8 2.5 22.4 5.5 23.4 8.7 23.4" />
    </svg>
  );
};

IconTwitter.propTypes = {
  elementClass: PropTypes.string
};

export default IconTwitter;
