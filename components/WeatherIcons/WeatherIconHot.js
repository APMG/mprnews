import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WeatherIconHot = ({ elementClass, x, y, width, height, fill }) => {
  const classes = classNames({
    weatherIcon: true,
    weatherIcon_hot: true,
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
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M4.14,14.76c0-0.24,0.09-0.44,0.27-0.61c0.17-0.17,0.38-0.25,0.62-0.25h2.06c0.24,0,0.44,0.08,0.6,0.25
	c0.17,0.17,0.25,0.37,0.25,0.61c0,0.25-0.08,0.46-0.25,0.63c-0.17,0.17-0.37,0.25-0.6,0.25H5.03c-0.25,0-0.46-0.08-0.63-0.25
	C4.22,15.22,4.14,15.01,4.14,14.76z M7.06,7.74c0-0.23,0.08-0.44,0.24-0.62C7.5,6.96,7.71,6.87,7.96,6.87
	c0.21,0,0.41,0.08,0.59,0.25l1.45,1.48c0.17,0.16,0.25,0.36,0.25,0.6c0,0.24-0.08,0.44-0.25,0.6c-0.17,0.17-0.36,0.25-0.6,0.25
	c-0.26,0-0.46-0.08-0.61-0.25l-1.5-1.44C7.15,8.19,7.06,7.98,7.06,7.74z M9.67,14.76c0-0.71,0.14-1.39,0.43-2.04
	c0.28-0.65,0.67-1.22,1.14-1.69c0.48-0.47,1.05-0.85,1.7-1.13S14.28,9.47,15,9.47c0.96,0,1.84,0.24,2.66,0.72
	c0.82,0.48,1.47,1.12,1.94,1.94c0.47,0.81,0.71,1.69,0.71,2.63c0,0.15-0.01,0.29-0.03,0.42c-0.28-0.17-0.6-0.25-0.97-0.25
	c-0.24,0-0.48,0.05-0.72,0.15c0.01-0.07,0.01-0.18,0.01-0.32c0-0.98-0.35-1.81-1.06-2.5c-0.71-0.69-1.56-1.04-2.55-1.04
	c-0.99,0-1.83,0.35-2.54,1.04s-1.05,1.52-1.05,2.5v0.18c-0.29,0.02-0.57,0.1-0.84,0.25c-0.01,0.01-0.04,0.03-0.1,0.07
	s-0.12,0.09-0.19,0.14s-0.14,0.11-0.23,0.19s-0.18,0.16-0.26,0.24C9.7,15.51,9.67,15.15,9.67,14.76z M9.7,18.41v-0.15
	c-0.01-0.09,0-0.2,0.02-0.33c0.05-0.36,0.19-0.7,0.42-1.02c0.13-0.16,0.22-0.27,0.27-0.31c0.01-0.02,0.02-0.04,0.04-0.06l0.04-0.04
	c0.03-0.01,0.07-0.05,0.12-0.1c0.02-0.02,0.05-0.05,0.08-0.08s0.06-0.04,0.07-0.06c0.05-0.05,0.1-0.08,0.14-0.1l0.17-0.11
	c0.14-0.09,0.31-0.14,0.5-0.14h0.03c0.1,0,0.19,0.01,0.26,0.03c0.03,0.01,0.07,0.03,0.13,0.07v0.01c0.14,0.06,0.26,0.16,0.34,0.29
	c0.08,0.13,0.13,0.27,0.13,0.42c0,0.17-0.05,0.31-0.14,0.42c-0.06,0.09-0.14,0.17-0.22,0.23c-0.02,0.01-0.04,0.02-0.06,0.03
	c-0.02,0.01-0.04,0.02-0.04,0.02l-0.06,0.04c-0.04,0.03-0.07,0.06-0.1,0.08s-0.06,0.06-0.11,0.11c-0.04,0.05-0.08,0.09-0.11,0.14
	c-0.03,0.04-0.06,0.1-0.09,0.15c-0.03,0.06-0.05,0.12-0.05,0.17v0.15c0.04,0.15,0.08,0.27,0.11,0.36c0.07,0.14,0.18,0.28,0.34,0.44
	c0.01,0.02,0.09,0.1,0.24,0.25c0.86,0.78,1.27,1.62,1.21,2.5c-0.02,0.3-0.09,0.59-0.21,0.87c-0.12,0.28-0.26,0.51-0.43,0.7
	c-0.16,0.19-0.29,0.33-0.39,0.43c-0.1,0.09-0.18,0.16-0.25,0.21c-0.01,0.01-0.03,0.02-0.06,0.04c-0.03,0.02-0.06,0.04-0.07,0.04
	c-0.08,0.04-0.15,0.06-0.22,0.07c-0.09,0.01-0.15,0.02-0.2,0.02c-0.3,0-0.54-0.1-0.71-0.3c-0.14-0.17-0.2-0.37-0.18-0.59
	c0.02-0.22,0.13-0.4,0.33-0.53L11,22.75c0.01-0.01,0.03-0.03,0.05-0.04c0.02-0.02,0.04-0.04,0.07-0.06
	c0.03-0.02,0.06-0.05,0.08-0.08c0.03-0.03,0.06-0.07,0.08-0.1c0.03-0.04,0.06-0.08,0.08-0.12c0.03-0.04,0.06-0.09,0.08-0.14
	c0.03-0.05,0.05-0.1,0.07-0.15c0.02-0.05,0.03-0.1,0.05-0.16c0.01-0.06,0.02-0.12,0.02-0.17c0.02-0.2-0.03-0.4-0.15-0.6
	c-0.05-0.11-0.12-0.22-0.22-0.33c-0.07-0.08-0.12-0.13-0.15-0.16c-0.09-0.11-0.14-0.17-0.15-0.18c-0.02-0.01-0.04-0.03-0.07-0.06
	s-0.05-0.04-0.06-0.05c-0.15-0.14-0.26-0.26-0.34-0.36c-0.12-0.16-0.21-0.26-0.24-0.32c-0.19-0.26-0.32-0.52-0.39-0.78
	c-0.04-0.14-0.07-0.25-0.08-0.32c0-0.02-0.01-0.05-0.02-0.08S9.7,18.44,9.7,18.41z M13.58,18.08c0-0.06,0-0.1,0.01-0.14
	c0.02-0.22,0.09-0.43,0.2-0.64c0.11-0.21,0.22-0.39,0.35-0.53c0.13-0.14,0.25-0.27,0.38-0.38s0.23-0.19,0.31-0.25l0.12-0.07
	c0.15-0.09,0.32-0.14,0.5-0.14c0.11,0,0.21,0.01,0.3,0.03c0.01,0,0.02,0.01,0.05,0.02c0.03,0.02,0.05,0.03,0.06,0.04
	c0.01,0,0.02,0,0.03,0.01c0.01,0,0.03,0.02,0.07,0.05c0.2,0.12,0.32,0.3,0.38,0.54c0,0.02,0,0.04,0,0.07c0,0.02,0,0.04,0,0.05
	c0,0.03-0.01,0.07-0.02,0.12s-0.02,0.08-0.02,0.09c-0.07,0.23-0.21,0.39-0.42,0.5c-0.33,0.22-0.51,0.45-0.53,0.69
	c-0.01,0.08-0.01,0.15,0,0.22c0.02,0.12,0.08,0.25,0.17,0.39c0.11,0.16,0.19,0.27,0.24,0.32c0.16,0.16,0.25,0.25,0.28,0.27
	c0.12,0.11,0.28,0.28,0.47,0.51c0.54,0.65,0.79,1.32,0.74,2c-0.02,0.3-0.09,0.59-0.21,0.87c-0.12,0.28-0.26,0.51-0.43,0.7
	c-0.16,0.18-0.3,0.33-0.4,0.43c-0.11,0.1-0.19,0.17-0.25,0.21l-0.12,0.08c-0.11,0.04-0.17,0.06-0.21,0.07
	c-0.11,0.01-0.18,0.02-0.2,0.02h-0.03c-0.08,0-0.14-0.01-0.19-0.02c-0.02,0-0.05,0-0.08-0.01c-0.03-0.01-0.06-0.01-0.07-0.01
	c-0.01,0-0.02,0-0.03-0.01c-0.01-0.01-0.02-0.01-0.04-0.02c-0.01-0.01-0.02-0.01-0.03-0.01c-0.15-0.11-0.24-0.17-0.26-0.21
	c-0.16-0.18-0.22-0.38-0.19-0.6c0.03-0.22,0.14-0.39,0.34-0.53l0.03-0.04c0.02-0.02,0.05-0.05,0.09-0.08l0.12-0.12l0.13-0.16
	l0.12-0.19l0.09-0.22l0.04-0.24c0.01-0.4-0.22-0.82-0.69-1.27c-0.19-0.17-0.33-0.31-0.44-0.43C13.79,19.37,13.54,18.72,13.58,18.08z
	 M14.12,6.92V4.85c0-0.24,0.09-0.45,0.26-0.62c0.17-0.17,0.38-0.25,0.61-0.25c0.24,0,0.45,0.08,0.62,0.25
	c0.17,0.17,0.25,0.38,0.25,0.62v2.07c0,0.24-0.08,0.43-0.25,0.59S15.24,7.74,15,7.74c-0.24,0-0.44-0.08-0.61-0.23
	C14.21,7.35,14.12,7.16,14.12,6.92z M17.48,17.93c0.02-0.22,0.09-0.43,0.2-0.64c0.11-0.21,0.22-0.39,0.35-0.53
	c0.13-0.14,0.25-0.27,0.38-0.38c0.12-0.11,0.22-0.19,0.3-0.25l0.13-0.07c0.02-0.02,0.06-0.04,0.1-0.08
	c0.11-0.04,0.24-0.07,0.38-0.07c0.34,0,0.59,0.13,0.77,0.38c0.05,0.07,0.08,0.14,0.1,0.23c0.01,0.02,0.02,0.05,0.02,0.08v0.11
	c0,0.31-0.15,0.55-0.45,0.7c-0.32,0.21-0.49,0.44-0.52,0.69c-0.04,0.34,0.19,0.74,0.68,1.2c0.88,0.77,1.28,1.61,1.23,2.5
	c-0.02,0.3-0.09,0.59-0.21,0.87c-0.12,0.28-0.27,0.51-0.43,0.7c-0.17,0.19-0.3,0.33-0.39,0.43s-0.18,0.16-0.25,0.21
	c-0.16,0.1-0.3,0.15-0.41,0.16c-0.03,0.01-0.08,0.01-0.15,0.01c-0.3,0-0.53-0.1-0.69-0.3c-0.15-0.17-0.21-0.37-0.19-0.59
	s0.13-0.4,0.32-0.53c0.03-0.01,0.09-0.06,0.18-0.14s0.18-0.21,0.29-0.38c0.1-0.18,0.16-0.35,0.17-0.53c0.02-0.4-0.22-0.82-0.7-1.27
	c-0.41-0.36-0.73-0.75-0.94-1.16C17.51,18.86,17.42,18.4,17.48,17.93z M19.77,9.21c0-0.25,0.08-0.45,0.23-0.6l1.46-1.48
	c0.18-0.17,0.38-0.25,0.61-0.25c0.24,0,0.44,0.09,0.61,0.26s0.26,0.38,0.26,0.61c0,0.25-0.09,0.46-0.26,0.62l-1.48,1.44
	c-0.18,0.17-0.38,0.25-0.61,0.25c-0.23,0-0.43-0.08-0.58-0.25C19.85,9.65,19.77,9.44,19.77,9.21z M22.07,14.76
	c0-0.22,0.09-0.42,0.26-0.61c0.16-0.17,0.35-0.25,0.58-0.25h2.06c0.24,0,0.45,0.09,0.62,0.26s0.27,0.37,0.27,0.6
	c0,0.24-0.09,0.45-0.26,0.62c-0.18,0.17-0.38,0.26-0.63,0.26h-2.06c-0.24,0-0.45-0.08-0.6-0.25C22.15,15.22,22.07,15.01,22.07,14.76
	z"
      />
    </svg>
  );
};

WeatherIconHot.propTypes = {
  elementClass: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
};

export default WeatherIconHot;
