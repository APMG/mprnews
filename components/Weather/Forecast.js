import React from 'react';
import PropTypes from 'prop-types';

const Forecast = (props) => {
  const { weather } = props;
  return (
    <div className="section">
      <ul>
        {weather.properties.periods.map((data) => (
          <div key={data.number}>
            <li>{data.name}</li>
            <li>Number: {data.number}</li>
            <li>
              <img src={data.icon} alt={data.name} />
            </li>
            <li>
              {data.temperature}°{data.temperatureUnit}
            </li>
            <li>WindSpeed: {data.windSpeed}</li>
            <li>WindDirection: {data.windDirection}</li>
            <li>Start: {data.startTime}</li>
            <li>End: {data.endTime}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};
Forecast.propTypes = {
  weather: PropTypes.object
};

export default Forecast;
