import React from 'react';
import PropTypes from 'prop-types';

const IconCheckmark = ({ width = 12, height = 10 }) => {
  return (
    <svg className="icon icon-checkmark" width={width} height={height}>
      <path d="M10.1,0L4.5,5.6L1.9,3L0,4.8l4.5,4.5l7.4-7.4L10.1,0z" />
    </svg>
  );
};

IconCheckmark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default IconCheckmark;
