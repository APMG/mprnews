import React from 'react';

const WeatherContext = React.createContext({
  selectedCoordinates: null,
  selectedId: null,
  weather: { response: {}, isloaded: '', error: '' },
  defaultWeather: {
    id: 'minneapolis',
    name: 'MSP Airport',
    lat: '44.8848',
    long: '-93.2223',
    forecastOffice: 'MPX'
  },
  response: {}
});

export default WeatherContext;
