import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WeatherIconHaze = ({ elementClass, x, y, width, height, fill }) => {
  const classes = classNames({
    weatherIcon: true,
    weatherIcon_haze: true,
    [elementClass]: elementClass,
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
        d="M4.37,15.62c0-0.24,0.08-0.44,0.25-0.61c0.18-0.17,0.38-0.25,0.6-0.25h2.04c0.23,0,0.42,0.08,0.58,0.25
	c0.15,0.17,0.23,0.37,0.23,0.61c0,0.24-0.08,0.44-0.23,0.6c-0.15,0.17-0.35,0.25-0.58,0.25H5.23c-0.23,0-0.43-0.08-0.6-0.25
	C4.46,16.05,4.37,15.85,4.37,15.62z M7.23,8.71c0-0.23,0.08-0.43,0.23-0.61c0.2-0.17,0.41-0.25,0.64-0.25
	c0.21,0,0.41,0.08,0.59,0.25l1.43,1.46c0.16,0.15,0.24,0.35,0.24,0.59c0,0.24-0.08,0.44-0.24,0.6c-0.16,0.16-0.36,0.24-0.6,0.24
	c-0.24,0-0.44-0.08-0.59-0.24L7.47,9.32C7.31,9.15,7.23,8.95,7.23,8.71z M7.39,18.02c0-0.22,0.08-0.41,0.23-0.55
	c0.16-0.14,0.37-0.22,0.64-0.22h5.71c0.27,0,0.48,0.07,0.64,0.22c0.16,0.14,0.24,0.33,0.24,0.55c0,0.27-0.08,0.48-0.23,0.64
	c-0.16,0.16-0.37,0.24-0.65,0.24H8.26c-0.27,0-0.48-0.08-0.64-0.23S7.39,18.29,7.39,18.02z M8.38,20.97c0-0.22,0.09-0.42,0.28-0.6
	c0.18-0.18,0.39-0.27,0.6-0.27c0.26,0,0.47,0.09,0.63,0.26c0.16,0.18,0.24,0.38,0.24,0.61c0,0.28-0.08,0.49-0.23,0.65
	s-0.37,0.23-0.64,0.23c-0.23,0-0.44-0.08-0.61-0.24C8.47,21.45,8.38,21.23,8.38,20.97z M9.79,15.91v-0.07
	c0.03-1.26,0.47-2.35,1.31-3.28c0.84-0.93,1.87-1.49,3.1-1.69h0.05c0.19-0.04,0.45-0.06,0.76-0.06c0.31,0,0.57,0.02,0.76,0.06h0.04
	c1.22,0.19,2.26,0.76,3.1,1.69c0.84,0.93,1.28,2.02,1.31,3.28v0.07c0,0.16-0.08,0.24-0.23,0.24h-1.13c-0.12,0-0.2-0.03-0.25-0.09
	c-0.05-0.06-0.07-0.12-0.07-0.18c-0.04-0.93-0.4-1.72-1.08-2.37c-0.68-0.65-1.49-0.97-2.44-0.97s-1.76,0.32-2.44,0.97
	c-0.68,0.65-1.04,1.44-1.08,2.37c0,0.06-0.03,0.12-0.08,0.18c-0.05,0.06-0.14,0.09-0.26,0.09h-1.13
	C9.87,16.15,9.79,16.07,9.79,15.91z M10.8,20.97c0-0.23,0.08-0.43,0.24-0.61c0.16-0.17,0.37-0.26,0.63-0.26h3.83
	c0.22,0,0.42,0.09,0.6,0.27c0.18,0.18,0.28,0.38,0.28,0.6c0,0.26-0.09,0.48-0.27,0.64s-0.38,0.24-0.61,0.24h-3.83
	c-0.27,0-0.48-0.08-0.64-0.23C10.87,21.46,10.8,21.25,10.8,20.97z M14.14,7.89V5.86c0-0.24,0.08-0.44,0.25-0.61S14.76,5,15,5
	s0.43,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.61v2.03c0,0.23-0.08,0.43-0.25,0.58S15.23,8.71,15,8.71s-0.44-0.08-0.6-0.23
	S14.14,8.12,14.14,7.89z M15.5,18.02c0-0.21,0.09-0.39,0.27-0.54s0.38-0.23,0.61-0.23s0.43,0.08,0.61,0.23s0.27,0.33,0.27,0.54
	c0,0.26-0.09,0.48-0.27,0.64c-0.18,0.16-0.38,0.24-0.61,0.24s-0.44-0.08-0.61-0.24C15.59,18.49,15.5,18.28,15.5,18.02z M17.04,20.97
	c0-0.23,0.08-0.43,0.24-0.61c0.16-0.17,0.38-0.26,0.64-0.26h1.86c0.26,0,0.47,0.09,0.63,0.26c0.16,0.18,0.24,0.38,0.24,0.61
	c0,0.28-0.08,0.49-0.23,0.65c-0.15,0.16-0.37,0.23-0.64,0.23h-1.86c-0.27,0-0.48-0.08-0.64-0.23
	C17.12,21.46,17.04,21.25,17.04,20.97z M17.92,18.02c0-0.21,0.09-0.39,0.27-0.54s0.38-0.23,0.6-0.23h3.07c0.22,0,0.4,0.07,0.54,0.22
	c0.14,0.15,0.22,0.33,0.22,0.55c0,0.27-0.07,0.48-0.21,0.64c-0.14,0.16-0.32,0.24-0.55,0.24h-3.07c-0.23,0-0.43-0.08-0.61-0.24
	C18.01,18.49,17.92,18.28,17.92,18.02z M19.66,10.15c0-0.25,0.08-0.45,0.23-0.59l1.42-1.46c0.18-0.17,0.38-0.25,0.59-0.25
	c0.23,0,0.43,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.61c0,0.24-0.08,0.45-0.24,0.61l-1.46,1.42c-0.18,0.16-0.38,0.24-0.6,0.24
	c-0.23,0-0.41-0.08-0.56-0.24C19.74,10.59,19.66,10.39,19.66,10.15z M21.92,15.62c0-0.23,0.08-0.43,0.24-0.61
	c0.17-0.17,0.36-0.25,0.57-0.25h2.02c0.23,0,0.43,0.09,0.6,0.26c0.17,0.17,0.26,0.37,0.26,0.6c0,0.23-0.09,0.43-0.26,0.6
	c-0.17,0.17-0.37,0.25-0.6,0.25h-2.02c-0.23,0-0.43-0.08-0.58-0.25S21.92,15.86,21.92,15.62z"
      />
    </svg>
  );
};

WeatherIconHaze.propTypes = {
  elementClass: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

export default WeatherIconHaze;
