import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// This component is here to act as a default placeholder in case the specified icon doesn't exist

const IconEmpty = (props) => {
  const classes = classNames({
    icon: true,
    'icon-empty': true,
    [props.elementClass]: props.elementClass
  });

  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  );
};

IconEmpty.propTypes = {
  elementClass: PropTypes.string
};

export default IconEmpty;
