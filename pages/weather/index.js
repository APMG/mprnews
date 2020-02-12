import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { Loading } from '@apmg/titan';
import { fetchWeather } from '../../utils/fetchWeather';
import { weatherConfig } from '../../utils/defaultData';
import Weather from '../../endpoints/Weather/Weather';
import {
  fetchMemberDriveStatus,
  addMemberDriveElements
} from '../../utils/membershipUtils';

const WeatherPage = ({ errorCode }) => {
  const [data, setData] = useState({});
  if (errorCode) return <ErrorPage statusCode={errorCode} />;

  useEffect(() => {
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

      setData({ data: { location, weather, forecast, alerts } });
    };

    fetchTheWeather();
    fetchMemberDriveStatus().then((data) => {
      addMemberDriveElements(data);
    });
  }, []);

  return (
    <>
      {Object.keys(data).length > 0 ? (
        <Weather data={data.data} />
      ) : (
        <Loading />
      )}
    </>
  );
};

WeatherPage.getInitialProps = async ({ res }) => {
  if (res) {
    const errorCode = res.statusCode > 200 ? res.statusCode : false;
    res.setHeader('Cache-Control', 'public, max-age=60');
    return { errorCode };
  }

  return {};
};

WeatherPage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default WeatherPage;
