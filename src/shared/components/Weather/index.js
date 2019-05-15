import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import Weather from './Weather';

const WeatherWrapper = () => {
  const context = useContext(WeatherContext);

  return (
    <Weather
      href={context.href}
      weather={context.weather}
      default={context.defaultCity}
      handleOnChange={context.handleOnChange}
    />
  );
};

export default WeatherWrapper;
