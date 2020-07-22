import React from 'react';
import { weatherConfig } from '../utils/defaultData';

const WeatherContext = React.createContext({
  location: weatherConfig[0],
  handleLocationChange() {},
  weatherData: {
    high: 0,
    low: 0,
    shortForecast: ''
  }
});

export default WeatherContext;
