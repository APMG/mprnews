import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import MainLayout from '../layouts/MainLayout';
import Weather from '../endpoints/Weather/Weather';
import { weatherConfig } from '../utils/defaultData';

const defaultLocation = weatherConfig[0];

const WeatherPage = ({
  weather: {
    updateTime,
    temperature,
    apparentTemperature,
    windDirection,
    windSpeed,
    pressure,
    dewpoint,
    relativeHumidity
  },
  forecast,
  alerts
}) => (
  <MainLayout>
    <div>
      <section className="stories section">
        <Heading level={2}>Weather</Heading>
        <Weather
          location={defaultLocation}
          weather={{
            updateTime,
            temperature,
            apparentTemperature,
            windDirection,
            windSpeed,
            pressure,
            dewpoint,
            relativeHumidity
          }}
          forecast={forecast}
          alerts={alerts}
        />
      </section>
    </div>
  </MainLayout>
);

// getInitialProps can only be used in the /pages directory in Next.js
WeatherPage.getInitialProps = async () => {
  const locationRes = await fetch(
    `https://api.weather.gov/points/${defaultLocation.lat},${
      defaultLocation.long
    }`
  );
  const locationData = await locationRes.json();
  const weatherUrl = locationData.properties.forecastGridData;
  const forecastUrl = locationData.properties.forecast;

  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();

  const alertRes = await fetch(
    `https://api.weather.gov/alerts/active?point=${defaultLocation.lat},${
      defaultLocation.long
    }`
  );
  const alertData = await alertRes.json();

  return {
    weather: weatherData.properties,
    forecast: forecastData.properties,
    alerts: alertData.features
  };
};

WeatherPage.propTypes = {
  weather: PropTypes.object,
  forecast: PropTypes.object,
  alerts: PropTypes.array
};

export default WeatherPage;
