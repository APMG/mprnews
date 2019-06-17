import React from 'react';
import { scaleLinear } from 'd3-scale';

const BUFFER = 10;

const TwoDaysChart = ({ forecast }) => {
  forecast.periods = forecast.periods.slice(0, 48);

  // get low
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

  console.log(forecast);

  return (
    // I set this box to be 500 wide so that, for each of the 48 hours, I'd know I was just moving 10 pixels (with 10 px to spare on either side). Easy math :P. (actually, there's an attr "number" on each of these points that can literally be used to compute this. Just point.number * 10.)
    <svg
      viewBox="0 0 500 100"
      className="chart"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <polyline
        fill="none"
        stroke="#0074d9"
        strokeWidth="3"
        points={`
          10,${tempScale(75)}
          20,${tempScale(76)}
          30,${tempScale(75)}
          40,${tempScale(75)}
          50,${tempScale(73)}`}
      /> */}
      {/* <circle
        fill="red"
        cx={`${forecast.periods[0].number * 10}`}
        cy={`${tempScale(forecast.periods[0].temperature)}`}
        r="2"
      /> */}

      {forecast.periods.map((period) => {
        return (
          <circle
            key={period.number}
            fill="red"
            cx={`${period.number * 10}`}
            cy={`${tempScale(period.temperature)}`}
            data-value={period.temperature}
            r="2"
          />
        );
      })}
    </svg>
  );
};

export default TwoDaysChart;
