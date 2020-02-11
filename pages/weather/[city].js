import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { fetchWeather } from '../../utils/fetchWeather';
import { weatherConfig } from '../../utils/defaultData';
import Weather from '../../endpoints/Weather/Weather';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';

const WeatherPage = ({ data, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  });

  return <Weather data={data} />;
};

WeatherPage.getInitialProps = async ({ query: { city }, res }) => {
  const location = weatherConfig.find((config) => config.id === city);
  const { weather, forecast, alerts } = await fetchWeather(
    location.lat,
    location.long
  );

  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    res.setHeader('Cache-Control', 'public, max-age=300');
    return {
      data: {
        location,
        weather,
        forecast,
        alerts
      },
      errorCode
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
