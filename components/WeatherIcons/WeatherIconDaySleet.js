import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WeatherIconDaySleet = ({ elementClass, x, y, width, height, fill }) => {
  const classes = classNames({
    weatherIcon: true,
    'weatherIcon_day-sleet': true,
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
        d="M1.49,16.92L1.49,16.92c0-1.17,0.36-2.19,1.08-3.09s1.64-1.48,2.74-1.74c0.31-1.37,1.01-2.49,2.1-3.38
	c1.1-0.88,2.35-1.32,3.77-1.32c0.99,0,1.9,0.22,2.72,0.66c0.5-0.53,1.09-0.95,1.76-1.25c0.67-0.3,1.37-0.45,2.09-0.45
	c0.95,0,1.83,0.24,2.64,0.71c0.81,0.47,1.45,1.11,1.92,1.92c0.47,0.81,0.71,1.69,0.71,2.64c0,1.23-0.38,2.33-1.14,3.29
	c0.29,0.61,0.43,1.28,0.43,2.02c0,0.88-0.21,1.7-0.64,2.45c-0.42,0.75-1,1.36-1.74,1.81c-0.73,0.46-1.54,0.7-2.42,0.72
	c-0.13,0-0.2-0.06-0.2-0.18v-1.34c0-0.12,0.07-0.18,0.2-0.18c0.86-0.04,1.58-0.39,2.18-1.03c0.6-0.64,0.9-1.4,0.9-2.26
	c0-0.89-0.32-1.65-0.97-2.29s-1.41-0.96-2.31-0.96h-1.61c-0.12,0-0.18-0.06-0.18-0.17l-0.08-0.59c-0.11-1.08-0.58-1.99-1.4-2.72
	c-0.82-0.73-1.78-1.1-2.86-1.1c-1.1,0-2.05,0.37-2.86,1.1c-0.81,0.73-1.27,1.64-1.37,2.72L6.88,13.5c-0.03,0.09-0.11,0.13-0.22,0.13
	l-0.51,0.04c-0.84,0.1-1.55,0.45-2.11,1.06s-0.84,1.34-0.84,2.18v0.05h0.03c0.01,0.98,0.38,1.78,1.11,2.43
	c0.22,0.19,0.47,0.36,0.74,0.49v0.02c0.41,0.19,0.82,0.29,1.21,0.31c0.11,0,0.17,0.06,0.17,0.17v1.34c0,0.11-0.06,0.17-0.17,0.17
	c-0.52-0.03-1.01-0.13-1.48-0.3v0.02c-0.83-0.29-1.54-0.77-2.11-1.43s-0.95-1.44-1.11-2.31v-0.04c-0.01-0.01-0.01-0.02-0.01-0.03
	C1.51,17.54,1.49,17.25,1.49,16.92z M6.99,24.09c0-0.03,0.01-0.07,0.02-0.13c0.01-0.05,0.02-0.09,0.02-0.12l0.09-0.59
	c0.07-0.24,0.2-0.41,0.41-0.53c0.2-0.12,0.43-0.14,0.68-0.08c0.23,0.07,0.39,0.2,0.51,0.41c0.11,0.2,0.13,0.41,0.07,0.62l-0.14,0.6
	c-0.1,0.44-0.35,0.66-0.76,0.66c-0.03,0-0.08,0-0.15-0.01s-0.11-0.01-0.13-0.01c-0.21-0.06-0.36-0.17-0.46-0.33
	C7.04,24.43,6.99,24.26,6.99,24.09z M7.73,21.15c0-0.24,0.08-0.43,0.23-0.59c0.16-0.16,0.35-0.23,0.59-0.23s0.43,0.08,0.59,0.23
	c0.16,0.16,0.23,0.35,0.23,0.59c0,0.23-0.08,0.42-0.23,0.58s-0.35,0.23-0.59,0.23c-0.23,0-0.42-0.08-0.57-0.24
	C7.81,21.56,7.73,21.37,7.73,21.15z M9.37,27.13c0-0.04,0.01-0.11,0.04-0.23l0.13-0.58c0.07-0.23,0.21-0.4,0.41-0.51
	c0.21-0.12,0.42-0.14,0.63-0.07c0.23,0.04,0.41,0.17,0.53,0.37c0.12,0.2,0.15,0.43,0.08,0.68l-0.13,0.59
	c-0.1,0.41-0.37,0.61-0.8,0.61c-0.05,0-0.13-0.01-0.24-0.04c-0.22-0.06-0.38-0.17-0.49-0.33C9.42,27.46,9.37,27.3,9.37,27.13z
	 M9.9,4.62c0-0.24,0.08-0.44,0.25-0.6c0.17-0.16,0.38-0.24,0.63-0.24c0.24,0,0.44,0.08,0.6,0.24l0.63,0.66
	c0.17,0.17,0.25,0.37,0.25,0.6c0,0.24-0.1,0.46-0.3,0.64c-0.2,0.18-0.4,0.26-0.61,0.23c-0.21-0.02-0.39-0.11-0.55-0.27l-0.65-0.66
	C9.99,5.05,9.9,4.85,9.9,4.62z M10.16,24.23c0-0.23,0.08-0.43,0.23-0.58c0.16-0.16,0.35-0.23,0.59-0.23s0.43,0.08,0.59,0.23
	c0.16,0.16,0.23,0.35,0.23,0.58c0,0.24-0.08,0.43-0.23,0.59c-0.16,0.16-0.35,0.23-0.59,0.23c-0.22,0-0.41-0.08-0.58-0.25
	C10.24,24.64,10.16,24.45,10.16,24.23z M10.78,21.96c0-0.09,0.01-0.18,0.03-0.26l0.23-0.9c0.07-0.23,0.21-0.41,0.41-0.53
	c0.21-0.12,0.42-0.15,0.64-0.08c0.24,0.07,0.41,0.2,0.53,0.4c0.12,0.2,0.14,0.4,0.07,0.62l-0.26,0.9c-0.08,0.27-0.22,0.46-0.41,0.57
	s-0.41,0.12-0.64,0.06c-0.2-0.04-0.35-0.14-0.45-0.3C10.81,22.26,10.76,22.11,10.78,21.96z M13.54,24.1c0-0.03,0-0.07,0.01-0.13
	c0.01-0.06,0.01-0.09,0.01-0.11l0.09-0.59c0.07-0.24,0.2-0.41,0.41-0.53c0.2-0.12,0.43-0.14,0.68-0.08c0.23,0.07,0.4,0.21,0.51,0.41
	c0.12,0.21,0.14,0.42,0.07,0.63l-0.14,0.6c-0.1,0.43-0.35,0.65-0.76,0.65c-0.03,0-0.08,0-0.15-0.01c-0.07-0.01-0.11-0.01-0.13-0.01
	c-0.2-0.06-0.35-0.17-0.45-0.33C13.59,24.43,13.54,24.27,13.54,24.1z M14.28,21.16c0-0.24,0.08-0.43,0.23-0.59
	c0.16-0.16,0.35-0.23,0.59-0.23c0.24,0,0.43,0.08,0.59,0.23c0.16,0.16,0.23,0.35,0.23,0.59c0,0.23-0.08,0.43-0.23,0.58
	c-0.16,0.16-0.35,0.23-0.59,0.23c-0.23,0-0.43-0.08-0.58-0.25C14.36,21.57,14.28,21.38,14.28,21.16z M15.31,9.05
	c0.84,0.76,1.4,1.74,1.7,2.93h0.31c1.38,0,2.55,0.48,3.52,1.45c0.31-0.55,0.47-1.16,0.47-1.82c0-0.98-0.35-1.81-1.04-2.5
	c-0.69-0.68-1.53-1.03-2.51-1.03C16.8,8.08,15.98,8.4,15.31,9.05z M16.91,3.78V1.73c0-0.24,0.08-0.44,0.25-0.61
	c0.17-0.17,0.37-0.26,0.6-0.26c0.24,0,0.44,0.08,0.6,0.25c0.16,0.17,0.24,0.38,0.24,0.62v2.05c0,0.24-0.08,0.45-0.24,0.62
	C18.2,4.57,18,4.65,17.76,4.65c-0.23,0-0.43-0.09-0.6-0.26C16.99,4.22,16.91,4.02,16.91,3.78z M22.49,6.07
	c0-0.24,0.08-0.44,0.23-0.6l1.44-1.45c0.15-0.17,0.34-0.25,0.58-0.25c0.24,0,0.44,0.08,0.6,0.25c0.18,0.16,0.26,0.36,0.26,0.6
	c0,0.24-0.09,0.44-0.26,0.6L23.9,6.68c-0.19,0.19-0.4,0.27-0.63,0.26c-0.23-0.02-0.41-0.1-0.55-0.26
	C22.56,6.52,22.49,6.32,22.49,6.07z M23.26,17.98c0-0.24,0.08-0.44,0.25-0.61c0.17-0.17,0.37-0.25,0.6-0.25
	c0.23,0,0.43,0.09,0.61,0.26l0.62,0.63c0.18,0.17,0.26,0.38,0.26,0.61c0,0.24-0.09,0.44-0.26,0.6c-0.14,0.17-0.32,0.26-0.54,0.26
	l-0.02-0.02c-0.24,0-0.44-0.08-0.62-0.24l-0.65-0.64C23.35,18.41,23.26,18.21,23.26,17.98z M24.73,11.61c0-0.24,0.08-0.44,0.25-0.6
	c0.17-0.16,0.37-0.24,0.61-0.24h2.06c0.24,0,0.45,0.08,0.61,0.24s0.25,0.36,0.25,0.6c0,0.24-0.08,0.44-0.25,0.61
	c-0.17,0.17-0.37,0.25-0.61,0.25h-2.06c-0.24,0-0.44-0.09-0.6-0.27C24.81,12.05,24.73,11.85,24.73,11.61z"
      />
    </svg>
  );
};

WeatherIconDaySleet.propTypes = {
  elementClass: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
};

export default WeatherIconDaySleet;
