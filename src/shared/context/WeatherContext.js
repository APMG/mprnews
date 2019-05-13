import React from 'react';

const WeatherContext = React.createContext({
  // selectedStation: null,
  error: null,
  isLoaded: false,
  // currentLocation: '',
  defaultCity: {
    forecastOffice: 'MPX',
    station: 'KMSP',
    gridpoints: { lat: '109', long: '67' }
  },
  weather: {}
});

export default WeatherContext;
