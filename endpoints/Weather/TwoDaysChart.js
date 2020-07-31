import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { format } from 'date-fns';
import DragScroll from 'react-dragscroll';
import { Heading } from '@apmg/titan';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';

const BUFFER_TOP = 9;
const BUFFER_BOTTOM = 17;
const CHART_HEIGHT = 300;
const CHART_WIDTH = 1875;
const GRID_WIDTH = 39;
const ICON_SIZE = 41;
const LINE_OPACITY = 0.2;
const WEEKDAY_LABEL_VPOS = CHART_HEIGHT - 35;
const HOUR_LABEL_VPOS = CHART_HEIGHT - 15;
const TEMP_VERT_OFFSET = 55;

const gridLine = (xPos) => (
  <line
    x1={xPos}
    y1={0}
    x2={xPos}
    y2={CHART_HEIGHT}
    stroke="black"
    strokeWidth={0.2}
    opacity={LINE_OPACITY}
  />
);

const TwoDaysChart = ({ forecast }) => {
  let fortyEightHours = forecast.periods.slice(0, 48);

  let lo =
    fortyEightHours.reduce(
      (min, b) => Math.min(min, b.temperature),
      fortyEightHours[0].temperature
    ) - BUFFER_BOTTOM;

  let hi =
    fortyEightHours.reduce(
      (max, b) => Math.max(max, b.temperature),
      fortyEightHours[0].temperature
    ) + BUFFER_TOP;

  let tempPositionScale = scaleLinear()
    .domain([hi, lo])
    .range([0, CHART_HEIGHT]);

  return (
    <>
      <div className="weather_padding">
        <Heading
          level={2}
          elementClass="hdg hdg-3 hdg-section hdg-section-small"
        >
          48 hour forecast
        </Heading>
      </div>
      <div className="weather_card">
        <DragScroll className="weather_chart">
          <svg
            className="weather_chartScrollable"
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {gridLine(0)}
            {fortyEightHours.map((period, i) => {
              let xPos = i * GRID_WIDTH;
              let yPos = tempPositionScale(period.temperature);
              let date = Date.parse(period.startTime.split('/').shift());
              let hour = format(date, 'ha');
              let dayOfWeek =
                hour === '12AM'
                  ? format(new Date(date), 'iii').toUpperCase()
                  : false;

              return (
                <g key={period.number} className="weather_chartPoint">
                  <WeatherIcon
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    x={xPos}
                    y={yPos}
                    iconUrl={period.icon}
                    fill={period.isDaytime ? '#fba301' : '#35145a'}
                  />
                  <g>
                    <text
                      x={`${xPos + GRID_WIDTH / 4}`}
                      y={`${yPos + TEMP_VERT_OFFSET}`}
                    >
                      {period.temperature}
                    </text>
                  </g>

                  <g>
                    <text
                      className="weather_chartPointHour"
                      x={`${xPos + GRID_WIDTH / 2}`}
                      y={HOUR_LABEL_VPOS}
                      textAnchor="middle"
                    >
                      {hour}
                    </text>
                  </g>
                  {dayOfWeek && (
                    <g>
                      <text
                        className="weather_chartPointDay"
                        x={xPos + GRID_WIDTH / 2}
                        y={WEEKDAY_LABEL_VPOS}
                        textAnchor="middle"
                      >
                        {dayOfWeek}
                      </text>
                    </g>
                  )}
                  {gridLine(xPos)}
                </g>
              );
            })}
            {gridLine(CHART_WIDTH)}
          </svg>
        </DragScroll>
      </div>
    </>
  );
};

TwoDaysChart.propTypes = {
  forecast: PropTypes.object,
};

export default TwoDaysChart;
