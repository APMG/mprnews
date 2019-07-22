import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import Weather from '../endpoints/Weather/Weather';
import { weatherConfig } from '../utils/defaultData';
import { fetchWeather } from '../utils/fetchWeather';

const WeatherPage = ({ data }) => {
  if (!data) return <Error statusCode={404} />;
  return <Weather data={data} />;
};

WeatherPage.getInitialProps = async ({ req, res }) => {
  let location =
    typeof req !== 'undefined' &&
    req.params !== 'undefined' &&
    typeof req.params.id !== 'undefined'
      ? weatherConfig.find((config) => config.id === req.params.id)
      : weatherConfig[0];

  if (!location && res) return (res.statusCode = 404);

  const { weather, forecast, alerts } = await fetchWeather(
    location.lat,
    location.long
  );
  return {
    data: {
      location,
      weather,
      forecast,
      alerts
    }
  };
};

WeatherPage.propTypes = {
  data: PropTypes.object
};

export default WeatherPage;
