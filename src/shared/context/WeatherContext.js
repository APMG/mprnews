import React from 'react';

const WeatherContext = React.createContext({
  href: null,
  error: null,
  isLoaded: false,
  defaultCity: {
    forecastOffice: 'MPX',
    station: 'KMSP',
    gridpoints: { lat: '109', long: '67' }
  },

  weather: {}
});

export default WeatherContext;
