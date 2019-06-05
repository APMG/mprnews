import React from 'react';

const WeatherContext = React.createContext({
  weather: {
    response: {},
    isloaded: '',
    error: '',
    selectedCoordinates: null,
    selectedHeader: null
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
