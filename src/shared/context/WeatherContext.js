import React from 'react';

const WeatherContext = React.createContext({
  // selectedCoordinates: null,
  // selectedName: null,
  weather: {
    response: {},
    isloaded: '',
    error: '',
    selectedCoordinates: null,
    selectedName: null
  },
  defaultWeather: {
    id: 'minneapolis',
    name: 'MSP Airport',
    lat: '44.8848',
    long: '-93.2223',
    forecastOffice: 'MPX'
  }
});

export default WeatherContext;
