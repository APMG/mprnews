import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import Weather from './Weather';

const WeatherWrapper = () => {
  const context = useContext(WeatherContext);

  return (
    <Weather
      // selectedStation={context.selectedStation}
      error={context.error}
      isLoaded={context.isLoaded}
      weather={context.weather}
      // currentLocation={context.currentLocation}
      default={context.defaultCity}
    />
  );
};

export default WeatherWrapper;
