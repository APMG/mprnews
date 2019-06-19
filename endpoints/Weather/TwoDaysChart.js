import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { format } from 'date-fns';
import { Heading } from '@apmg/titan';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';

const BUFFER_TOP = 10;
const BUFFER_BOTTOM = 30;
const CHART_HEIGHT = 160;
const CHART_WIDTH = 800;
const LINE_OPACITY = 0.2;

const TwoDaysChart = ({ forecast }) => {
  forecast.periods = forecast.periods.slice(0, 48);

  let lo =
    forecast.periods.reduce(
      (min, b) => Math.min(min, b.temperature),
      forecast.periods[0].temperature
    ) - BUFFER_BOTTOM;

  let hi =
    forecast.periods.reduce(
      (max, b) => Math.max(max, b.temperature),
      forecast.periods[0].temperature
    ) + BUFFER_TOP;

  let tempPositionScale = scaleLinear()
    .domain([hi, lo])
    .range([0, CHART_HEIGHT]);

  return (
    <div className="weather_chart">
      <Heading level={2} elementClass="weather_chartTitle">
        48 hour forecast
      </Heading>
      <svg
        className="weather_chartScrollable"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={CHART_HEIGHT}
          stroke="black"
          strokeWidth={0.2}
          opacity={LINE_OPACITY}
        />
        {forecast.periods.map((period, i) => {
          let xPos = i * 25;
          let yPos = tempPositionScale(period.temperature);
          let date = Date.parse(period.startTime.split('/').shift());
          let hour = format(date, 'hA');
          let dayOfWeek =
            hour === '12AM' ? format(date, 'ddd').toUpperCase() : false;

          return (
            <g key={period.number} className="weather_chartPoint">
              <WeatherIcon
                width={20}
                height={20}
                x={xPos + 3.5}
                y={yPos}
                iconUrl={period.icon}
              />
              <text x={`${xPos + 7.5}`} y={`${yPos + 30}`}>
                {period.temperature}
              </text>
              <text
                className="weather_chartPointHour"
                x={`${xPos + 4.5}`}
                y={CHART_HEIGHT - 5}
              >
                {hour}
              </text>
              {dayOfWeek && (
                <text
                  className="weather_chartPointDay"
                  x={xPos + 5.5}
                  y={CHART_HEIGHT - 18}
                >
                  {dayOfWeek}
                </text>
              )}
              <line
                x1={xPos}
                y1={0}
                x2={xPos}
                y2={CHART_HEIGHT}
                stroke="black"
                strokeWidth={0.2}
                opacity={LINE_OPACITY}
              />
            </g>
          );
        })}
        <line
          x1={CHART_WIDTH}
          y1={0}
          x2={CHART_WIDTH}
          y2={CHART_HEIGHT}
          stroke="black"
          strokeWidth={0.2}
          opacity={LINE_OPACITY}
        />
      </svg>
    </div>
  );
};

TwoDaysChart.propTypes = {
  forecast: PropTypes.object
};

export default TwoDaysChart;
