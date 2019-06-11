import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import MainLayout from '../layouts/MainLayout';
import Weather from '../endpoints/Weather/Weather';
import { weatherConfig } from '../utils/defaultData';

const defaultLocation = weatherConfig[0];

const WeatherPage = ({ forecast, alerts }) => {
  return (
    <MainLayout>
      <div>
        <section className="stories section">
          <Heading level={2}>Weather</Heading>
          <Weather
            location={defaultLocation}
            forecast={forecast}
            alerts={alerts}
          />
        </section>
      </div>
    </MainLayout>
  );
};

// getInitialProps can only be used in the /pages directory in Next.js
WeatherPage.getInitialProps = async () => {
  const forecastRes = await fetch(
    `https://api.weather.gov/points/${defaultLocation.lat},${
      defaultLocation.long
    }/forecast`
    // https://api.weather.gov/points/44.8848,-93.2223/forecast
  );
  const forecastData = await forecastRes.json();

  const alertRes = await fetch(
    `https://api.weather.gov/alerts/active?point=${defaultLocation.lat},${
      defaultLocation.long
    }`
    //https://api.weather.gov/alerts/active?point=44.8848,-93.2223
  );
  const alertData = await alertRes.json();

  return { forecast: forecastData.properties, alerts: alertData.features };
  // forecastData.properties should have most of the info we need, while alertData's most relevant information should be in features. We can back out if we somehow need the rest
};

WeatherPage.propTypes = {
  forecast: PropTypes.object,
  alerts: PropTypes.array
};

export default WeatherPage;
