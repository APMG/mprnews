import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import query from '../../endpoints/Weather/weather.gql';
import { fetchWeather } from '../../utils/fetchWeather';
import { weatherConfig } from '../../utils/defaultData';
import Weather from '../../endpoints/Weather/Weather';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';
import adCleanup from '../../utils/adCleanup';
import initApollo from '../../lib/init-apollo';

const WeatherPage = (props, { errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />;
  const { location, weather, alerts, updraft, forecast } = props;
  console.log('city props', props);
  useEffect(() => {
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  });

  return (
    <Weather
      location={location}
      weather={weather}
      alerts={alerts}
      updraft={updraft}
      forecast={forecast}
    />
  );
};

WeatherPage.getInitialProps = async ({ query: { city }, res }) => {
  const ApolloClient = initApollo();
  let updraft, errorCode;

  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: 'weather-and-climate',
      pageNum: parseInt(1),
      pageSize: parseInt(10)
    }
  })
    .then((result) => {
      updraft = result.data;
      if (!updraft.collection) {
        res.statusCode = 404;

        errorCode = res.statusCode > 200 ? res.statusCode : false;
      }

      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }
    })
    .catch(() => {
      if (res) res.statusCode = 500;
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });
  const location = weatherConfig.find((config) => config.id === city);
  const { weather, forecast, alerts } = await fetchWeather(
    location.lat,
    location.long
  );

  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    res.setHeader('Cache-Control', 'public, max-age=300');
    return {
      updraft,
      location,
      weather,
      forecast,
      alerts,
      errorCode
    };
  }

  adCleanup();
  return {
    updraft,
    location,
    weather,
    forecast,
    alerts
  };
};

WeatherPage.propTypes = {
  data: PropTypes.object,
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default WeatherPage;
