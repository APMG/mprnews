import React from 'react';
import PropTypes from 'prop-types';

const IconElectionBox = (props) => {
  return (
    <svg
      width="100"
      height="100"
      className={`icon icon-electionBox ${
        props.elementClass ? props.elementClass : ''
      }`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M97.33,48.56,87.86,31.15a11,11,0,0,0-9.67-5.75H73.53V4.66A4.66,4.66,0,0,0,68.87,0H29.79a4.66,4.66,0,0,0-4.66,4.66V25.4H20.46a11,11,0,0,0-9.66,5.75L1.33,48.56A11.06,11.06,0,0,0,0,53.81V76.59A7.41,7.41,0,0,0,7.41,84H91.25a7.41,7.41,0,0,0,7.41-7.41h0V53.81A11.06,11.06,0,0,0,97.33,48.56Zm-4.16,8v20a1.92,1.92,0,0,1-1.91,1.91H7.41A1.92,1.92,0,0,1,5.5,76.56h0V53.81h0a5.29,5.29,0,0,1,.13-1.19H93a5.29,5.29,0,0,1,.13,1.19h0ZM20.46,30.9h4.67v5.31h-2.4a2.75,2.75,0,1,0,0,5.5h53.2a2.75,2.75,0,0,0,0-5.5h-2.4V30.9h4.66A5.5,5.5,0,0,1,83,33.77l7.31,13.35H8.38l7.26-13.35A5.48,5.48,0,0,1,20.46,30.9Zm10.17-5.5V5.5H68V36.21H30.63Z"
        transform="translate(0)"
      />
      <path
        d="M41.84,25.4l2,2.75.72,1a2.75,2.75,0,0,0,2.2,1.14h0a2.77,2.77,0,0,0,2.2-1.1l.76-1,2.06-2.75,7.39-9.86a2.75,2.75,0,0,0-4.25-3.5l-.15.21-8,10.64-2.91-4a2.75,2.75,0,1,0-4.46,3.22Z"
        transform="translate(0)"
      />
    </svg>
  );
};

IconElectionBox.propTypes = {
  elementClass: PropTypes.string
};

export default IconElectionBox;
