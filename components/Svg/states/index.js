import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ elementClass, origHeight, origWidth, statesvg, ...rest }) => {
  elementClass = elementClass ? elementClass : '';
  origHeight = origHeight ? origHeight : 100;
  origWidth = origWidth ? origWidth : 100;

  return (
    <svg
      className={`statesvg statesvg-${statesvg} ${elementClass}`}
      viewBox={`0 0 ${origWidth} ${origHeight}`}
      {...rest}
    >
      <use xlinkHref={`#statesvg-${statesvg}`} />
    </svg>
  );
};

Svg.propTypes = {
  elementClass: PropTypes.string,
  origHeight: PropTypes.number,
  origWidth: PropTypes.number,
  statesvg: PropTypes.string
};

export default Svg;
