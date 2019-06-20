import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WeatherIconDayRainMix = ({ elementClass, x, y, width, height, fill }) => {
  const classes = classNames({
    weatherIcon: true,
    'weatherIcon_day-rainMix': true,
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
        d="M1.48,16.95c0,1.32,0.46,2.46,1.37,3.4c0.91,0.94,2.04,1.45,3.38,1.51c0.12,0,0.18-0.06,0.18-0.17v-1.33
	c0-0.12-0.06-0.18-0.18-0.18c-0.86-0.04-1.58-0.38-2.17-1s-0.88-1.37-0.88-2.24c0-0.84,0.28-1.58,0.84-2.19
	c0.56-0.62,1.26-0.96,2.1-1.03l0.53-0.08c0.11,0,0.16-0.05,0.16-0.14l0.08-0.55c0.12-1.09,0.59-2,1.38-2.72S10,9.16,11.1,9.16
	s2.05,0.36,2.86,1.08c0.82,0.72,1.28,1.62,1.38,2.69l0.07,0.58c0.02,0.11,0.1,0.17,0.22,0.17h1.6c0.89,0,1.65,0.32,2.29,0.96
	c0.64,0.64,0.96,1.41,0.96,2.31c0,0.87-0.29,1.61-0.88,2.24s-1.31,0.95-2.17,1c-0.13,0-0.2,0.06-0.2,0.18v1.33
	c0,0.11,0.07,0.17,0.2,0.17c1.33-0.04,2.45-0.54,3.37-1.49c0.91-0.95,1.37-2.09,1.37-3.42c0-0.68-0.13-1.34-0.38-2.01
	c0.78-0.96,1.16-2.08,1.16-3.35c0-0.71-0.14-1.38-0.41-2.03c-0.27-0.65-0.65-1.2-1.12-1.67s-1.03-0.84-1.67-1.12
	s-1.33-0.42-2.04-0.42c-1.54,0-2.83,0.58-3.86,1.74c-0.89-0.44-1.81-0.66-2.74-0.66c-1.41,0-2.66,0.44-3.74,1.31s-1.77,2-2.08,3.38
	c-1.12,0.26-2.04,0.83-2.75,1.73C1.83,14.76,1.48,15.79,1.48,16.95z M6.83,23.98c0,0.17,0.05,0.34,0.16,0.51
	c0.11,0.17,0.27,0.28,0.47,0.35c0.23,0.07,0.45,0.06,0.64-0.04c0.2-0.09,0.33-0.28,0.4-0.56l0.14-0.61c0.05-0.23,0.02-0.44-0.1-0.63
	c-0.12-0.2-0.29-0.33-0.52-0.4c-0.23-0.07-0.44-0.04-0.64,0.08S7.06,22.97,7,23.2l-0.14,0.59C6.84,23.85,6.83,23.91,6.83,23.98z
	 M7.6,21.08c0,0.22,0.08,0.41,0.24,0.57C8,21.83,8.19,21.91,8.4,21.91c0.24,0,0.44-0.08,0.6-0.24c0.17-0.16,0.25-0.35,0.25-0.59
	c0-0.23-0.08-0.43-0.25-0.59c-0.17-0.16-0.37-0.24-0.6-0.24c-0.23,0-0.42,0.08-0.58,0.23S7.6,20.85,7.6,21.08z M8.21,18.81
	c-0.01,0.16,0.03,0.31,0.13,0.45c0.1,0.15,0.26,0.25,0.48,0.32c0.21,0.06,0.41,0.04,0.62-0.07C9.65,19.4,9.79,19.23,9.86,19
	l0.27-0.9c0.07-0.24,0.05-0.46-0.07-0.65c-0.12-0.19-0.3-0.32-0.54-0.39c-0.22-0.07-0.43-0.05-0.63,0.07
	c-0.2,0.11-0.34,0.28-0.41,0.5l-0.24,0.92C8.22,18.71,8.21,18.8,8.21,18.81z M9.36,27.1c0,0.17,0.05,0.33,0.16,0.49
	c0.11,0.16,0.27,0.27,0.49,0.33c0.09,0.02,0.17,0.03,0.24,0.03c0.43,0,0.7-0.2,0.8-0.61l0.13-0.59c0.06-0.26,0.03-0.48-0.08-0.68
	s-0.29-0.32-0.52-0.37c-0.21-0.07-0.42-0.05-0.63,0.07c-0.21,0.12-0.34,0.29-0.41,0.51L9.4,26.88C9.37,26.99,9.36,27.07,9.36,27.1z
	 M9.92,4.66c0,0.24,0.08,0.44,0.24,0.6l0.66,0.64c0.14,0.16,0.32,0.24,0.54,0.26c0.22,0.02,0.43-0.07,0.62-0.26
	c0.16-0.16,0.24-0.36,0.24-0.59c0-0.24-0.08-0.44-0.24-0.6l-0.63-0.65C11.2,3.9,11,3.82,10.77,3.8c-0.23,0-0.43,0.08-0.6,0.25
	C10.01,4.22,9.92,4.42,9.92,4.66z M10.15,24.2c0,0.23,0.08,0.42,0.24,0.58c0.16,0.16,0.36,0.24,0.58,0.24
	c0.24,0,0.43-0.08,0.59-0.23c0.16-0.16,0.23-0.35,0.23-0.59c0-0.23-0.08-0.42-0.23-0.58c-0.16-0.16-0.35-0.23-0.59-0.23
	c-0.24,0-0.43,0.08-0.59,0.23S10.15,23.97,10.15,24.2z M10.77,21.93c-0.01,0.15,0.03,0.31,0.14,0.47c0.1,0.16,0.25,0.26,0.45,0.3
	c0.23,0.06,0.44,0.04,0.64-0.06s0.33-0.29,0.41-0.56l0.26-0.9c0.07-0.22,0.05-0.43-0.07-0.63c-0.12-0.2-0.29-0.33-0.53-0.4
	c-0.22-0.07-0.43-0.04-0.64,0.08s-0.34,0.3-0.41,0.53l-0.22,0.9C10.78,21.74,10.77,21.83,10.77,21.93z M13.53,24.08
	c0,0.17,0.05,0.33,0.15,0.48c0.1,0.15,0.25,0.26,0.46,0.32c0.03,0,0.08,0.01,0.14,0.02c0.06,0.01,0.11,0.02,0.14,0.02
	c0.41,0,0.66-0.22,0.76-0.66l0.14-0.6c0.07-0.21,0.05-0.42-0.07-0.63c-0.12-0.21-0.29-0.34-0.51-0.41
	c-0.25-0.06-0.48-0.04-0.68,0.08s-0.34,0.29-0.41,0.53l-0.09,0.59c0,0.01,0,0.05-0.01,0.11C13.54,24,13.53,24.04,13.53,24.08z
	 M14.27,21.12c0,0.23,0.08,0.42,0.24,0.57c0.15,0.16,0.34,0.24,0.58,0.24s0.43-0.08,0.59-0.23c0.16-0.16,0.23-0.35,0.23-0.58
	c0-0.24-0.08-0.43-0.23-0.59c-0.16-0.16-0.35-0.23-0.59-0.23s-0.43,0.08-0.59,0.23S14.27,20.88,14.27,21.12z M14.88,18.81
	c0,0.17,0.05,0.33,0.16,0.48c0.11,0.15,0.27,0.26,0.49,0.32c0.02,0,0.06,0.01,0.12,0.02c0.06,0.01,0.11,0.02,0.14,0.02
	c0.11,0,0.23-0.03,0.37-0.09c0.21-0.11,0.34-0.28,0.4-0.52l0.24-0.9c0.06-0.23,0.04-0.44-0.07-0.63s-0.28-0.33-0.5-0.4
	c-0.23-0.07-0.45-0.05-0.64,0.06c-0.2,0.11-0.33,0.27-0.4,0.51l-0.28,0.91c0,0.02,0,0.05-0.01,0.11
	C14.89,18.73,14.88,18.77,14.88,18.81z M15.23,9.09c0.66-0.66,1.48-0.99,2.47-0.99c0.99,0,1.83,0.34,2.52,1.02s1.04,1.5,1.04,2.48
	c0,0.66-0.18,1.29-0.53,1.88c-0.98-0.98-2.15-1.47-3.5-1.47h-0.31C16.64,10.91,16.07,9.94,15.23,9.09z M16.88,3.83
	c0,0.23,0.08,0.42,0.23,0.58c0.15,0.15,0.35,0.23,0.59,0.23c0.24,0,0.45-0.08,0.62-0.23c0.17-0.15,0.25-0.35,0.25-0.58V1.76
	c0-0.23-0.09-0.43-0.26-0.6c-0.17-0.17-0.38-0.25-0.61-0.25c-0.23,0-0.43,0.08-0.58,0.25c-0.16,0.17-0.23,0.37-0.23,0.6V3.83z
	 M22.4,6.09c0,0.25,0.08,0.45,0.23,0.6c0.36,0.36,0.76,0.36,1.21,0l1.43-1.43c0.17-0.17,0.25-0.38,0.25-0.63
	c0-0.24-0.08-0.44-0.25-0.6c-0.17-0.17-0.37-0.25-0.6-0.25c-0.23,0-0.43,0.08-0.61,0.24L22.63,5.5C22.48,5.65,22.4,5.84,22.4,6.09z
	 M23.18,17.94c0,0.23,0.09,0.43,0.27,0.59l0.61,0.63c0.2,0.16,0.4,0.24,0.61,0.24c0.2,0,0.4-0.08,0.6-0.24
	c0.17-0.16,0.25-0.35,0.25-0.59c0-0.23-0.08-0.43-0.25-0.62l-0.65-0.61c-0.15-0.17-0.34-0.25-0.57-0.25s-0.43,0.08-0.6,0.25
	C23.27,17.51,23.18,17.71,23.18,17.94z M24.66,11.6c0,0.24,0.09,0.43,0.26,0.59c0.18,0.18,0.39,0.27,0.62,0.27h2.03
	c0.23,0,0.43-0.08,0.59-0.25c0.16-0.17,0.24-0.37,0.24-0.61c0-0.24-0.08-0.44-0.24-0.6c-0.16-0.17-0.35-0.25-0.59-0.25h-2.03
	c-0.24,0-0.44,0.08-0.62,0.25S24.66,11.37,24.66,11.6z"
      />
    </svg>
  );
};

WeatherIconDayRainMix.propTypes = {
  elementClass: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
};

export default WeatherIconDayRainMix;
