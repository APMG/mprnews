import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { fetchWeather } from '../utils/fetchWeather';
import { weatherConfig } from '../utils/defaultData';
import Weather from '../endpoints/Weather/Weather';

const WeatherPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  return <Weather data={data} />;
};

WeatherPage.getInitialProps = async ({ req, res }) => {
  const memberDriveData = res.memberDriveData;
  let findLocation =
    typeof req !== 'undefined' &&
    req.params !== 'undefined' &&
    typeof req.params.id !== 'undefined' &&
    weatherConfig.find((config) => config.id === req.params.id);

  let location = findLocation ? findLocation : weatherConfig[0];

  const { weather, forecast, alerts } = await fetchWeather(
    location.lat,
    location.long
  );

  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    return {
      data: {
        location,
        weather,
        forecast,
        alerts
      },
      errorCode,
      memberDriveData
    };
  }

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
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default WeatherPage;
