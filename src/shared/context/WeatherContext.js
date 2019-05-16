import React from 'react';

const WeatherContext = React.createContext({
  selectLocation: null,
  error: null,
  isLoaded: false,
  weather: {},
  response: {}
});

export default WeatherContext;
