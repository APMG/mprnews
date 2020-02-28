import React from 'react';
import PropTypes from 'prop-types';

const IconCheckmark = ({ width = 17, height = 14 }) => {
  return (
    <svg className="icon icon-checkmark" width={width} height={height}>
      <path
        d="M493.139,358.594l2.828,2.829L485.36,372.029l-2.828-2.828-3.624-3.624,2.834-2.793,3.618,3.589Z"
        transform="translate(-478.906 -358.594)"
      />
    </svg>
  );
};

IconCheckmark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default IconCheckmark;
