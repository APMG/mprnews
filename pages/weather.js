import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Weather from '../endpoints/Weather';
import WeatherContext from '../endpoints/Weather/WeatherContext';
import axios from 'axios';
import Router from 'next/router';

const WeatherPage = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState({
    response: {},
    isLoaded: false,
    error: null
  });

  const fetchWeatherData = () => {
    const pathname = window.location.pathname.split('/');
    const geoLocation = pathname[pathname.length - 1];
    const coordinates = geoLocation.match(/-?\d+(\.\d+)?,\s*(-?\d+(\.\d+)?)/g)
      ? geoLocation
      : `44.9434,-93.0965`;

    let url = `https://api.weather.gov/points/${coordinates}/forecast`;
    axios
      .get(url)
      .then((res) => {
        setWeather({ response: res.data, isLoaded: true });
      })
      .catch((error) => {
        setWeather({ isLoaded: true, error: error });
      });
  };

  const handleOnChange = (event) => {
    setLocation(`${event.target.value}`);

    Router.push(`/weather/${event.target.value}`);

    return fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
  });

  return (
    <MainLayout>
      <WeatherContext.Provider
        value={{
          location: location,
          weather: weather,
          handleOnChange: handleOnChange
        }}
      >
        <Weather />
      </WeatherContext.Provider>
    </MainLayout>
  );
};

export default WeatherPage;
