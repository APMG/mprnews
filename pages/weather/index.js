import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { Loading } from '@apmg/titan';
import { fetchWeather } from '../../utils/fetchWeather';
import { weatherConfig } from '../../utils/defaultData';
import Weather from '../../endpoints/Weather/Weather';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements,
} from '../../utils/membershipUtils';
import adCleanup from '../../utils/adCleanup';
import query from '../../endpoints/Weather/weather.gql';
import initApollo from '../../lib/init-apollo';

const WeatherPage = ({ data, errorCode }) => {
  const [weatherData, setWeatherData] = useState(data);
  const [loading, setLoading] = useState(true);

  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  const fetchTheWeather = async () => {
    const location = weatherConfig[0];
    let weather, forecast, alerts;

    try {
      ({ weather, forecast, alerts } = await fetchWeather(
        location.lat,
        location.long
      ));
    } catch (err) {
      console.error(err);
    }

    setWeatherData((prevState) => {
      return {
        ...prevState,
        location,
        weather,
        forecast,
        alerts,
      };
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchTheWeather();
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Weather
      updraft={weatherData.updraft}
      alerts={weatherData.alerts}
      location={weatherData.location}
      forecast={weatherData.forecast}
      weather={weatherData.weather}
    />
  );
};

WeatherPage.getInitialProps = async ({ res }) => {
  const ApolloClient = initApollo();
  let updraft, errorCode;
  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: 'weather-and-climate',
      pageNum: parseInt(1),
      pageSize: parseInt(10),
    },
  }).then((result) => {
    updraft = result.data;
    if (!updraft.collection) {
      res.statusCode = 404;

      errorCode = res.statusCode > 200 ? res.statusCode : false;
    }

    if (res) {
      res.setHeader('Cache-Control', 'public, max-age=60');

      return {
        data: {
          updraft,
        },
        errorCode,
      };
    }
  });

  adCleanup();
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    res.setHeader('Cache-Control', 'public, max-age=60');
    return {
      data: {
        updraft,
      },
      errorCode,
    };
  }

  return {
    data: {
      updraft,
    },
  };
};

WeatherPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object,
};

export default WeatherPage;
