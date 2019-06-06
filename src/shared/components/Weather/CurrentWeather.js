import React from 'react';
import PropTypes from 'prop-types';

const CurrentWeather = (props) => {
  const { weather } = props;
  return (
    <div className="section">
      <ul>
        {weather.properties.periods[0].number === 1 &&
          weather.properties.periods.splice(0, 1).map((data) => (
            <div key={data.number}>
              <li>{data.temperature}° F</li>
              <li>Number: {data.number}</li>
              <li>Elevation: {weather.properties.elevation.value} M </li>
              <li>
                {data.name} : {data.shortForecast}
              </li>
              <li>WindSpeed : {data.windSpeed}</li>
              <li>WindDirection : {data.windDirection}</li>
              Start : {data.startTime} End :{data.endTime}
              <li>{data.detailedForecast}</li>
            </div>
          ))}
      </ul>
    </div>
  );
};
CurrentWeather.propTypes = {
  weather: PropTypes.object
};

export default CurrentWeather;
