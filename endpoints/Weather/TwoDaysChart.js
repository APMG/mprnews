import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';

const BUFFER = 10;

const TwoDaysChart = ({ forecast }) => {
  forecast.periods = forecast.periods.slice(0, 48);

  let lo =
    forecast.periods.reduce(
      (min, b) => Math.min(min, b.temperature),
      forecast.periods[0].temperature
    ) - BUFFER;

  let hi =
    forecast.periods.reduce(
      (max, b) => Math.max(max, b.temperature),
      forecast.periods[0].temperature
    ) + BUFFER;

  let tempScale = scaleLinear()
    .domain([lo, hi])
    .range([0, 100]);

  return (
    // I set this box to be 500 wide so that, for each of the 48 hours, I'd know I was just moving 10 pixels (with 10 px to spare on either side). Easy math :P. (actually, there's an attr "number" on each of these points that can literally be used to compute this. Just point.number * 10.)
    <svg
      viewBox="0 0 500 100"
      className="chart"
      xmlns="http://www.w3.org/2000/svg"
    >
      {forecast.periods.map((period) => {
        return (
          <WeatherIcon
            key={period.number}
            width={10}
            height={10}
            x={`${period.number * 10}`}
            y={`${tempScale(period.temperature)}`}
            iconUrl={period.icon}
          />
        );
      })}
    </svg>
  );
};

TwoDaysChart.propTypes = {
  forecast: PropTypes.object
};

export default TwoDaysChart;
