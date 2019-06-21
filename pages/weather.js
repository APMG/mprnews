import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import MainLayout from '../layouts/MainLayout';
import Weather from '../endpoints/Weather/Weather';
import { weatherConfig } from '../utils/defaultData';
import { fetchWeather } from '../utils/fetchWeather';

const WeatherPage = ({ data }) => {
  if (!data) return <Error statusCode={404} />;
  return (
    <MainLayout>
      <div>
        <section className="stories section">
          <Weather data={data} />
        </section>
      </div>
    </MainLayout>
  );
};

WeatherPage.getInitialProps = async ({ req, res }) => {
  let location =
    req.daySlug !== 'weather'
      ? weatherConfig.find((config) => config.id === req.daySlug)
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
