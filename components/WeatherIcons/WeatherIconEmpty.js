import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// This component is here to act as a default placeholder in case the specified icon doesn't exist

const IconEmpty = ({ elementClass, x, y, width, height, fill }) => {
  const classes = classNames({
    icon: true,
    weatherIcon_empty: true,
    [elementClass]: elementClass
  });

  return (
    <svg
      className={classes}
      width={width}
      height={height}
      x={x}
      y={y}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    />
  );
};

IconEmpty.propTypes = {
  elementClass: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
};

export default IconEmpty;
