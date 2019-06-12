import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import MainLayout from '../layouts/MainLayout';
import Weather from '../endpoints/Weather/Weather';
import { weatherConfig } from '../utils/defaultData';
import { fetchWeather } from '../utils/fetchWeather';

const defaultLocation = weatherConfig[0];

const WeatherPage = ({ data }) => (
  <MainLayout>
    <div>
      <section className="stories section">
        <Heading level={2}>Weather</Heading>
        <Weather location={defaultLocation} data={data} />
      </section>
    </div>
  </MainLayout>
);

// getInitialProps can only be used in the /pages directory in Next.js
WeatherPage.getInitialProps = async () => {
  const data = await fetchWeather(defaultLocation.lat, defaultLocation.long);

  return {
    data: data
  };
};

WeatherPage.propTypes = {
  data: PropTypes.object
};

export default WeatherPage;
