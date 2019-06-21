import React, { useEffect, useState } from 'react';
import { weatherConfig } from '../../utils/defaultData';
import fetch from 'isomorphic-unfetch';
import { Loading } from '@apmg/titan';
import Icon from '../Icons/Icon';

export default function weatherHeaderRequest() {
  const [data, setData] = useState({});
  const { lat, long } = weatherConfig[0];

  useEffect(() => {
    const getData = async (latitude, longitude) => {
      let response = await fetch(
        `https://api.weather.gov/points/${latitude},${longitude}/forecast`
      );
      let result = await response.json();
      setData(result);
    };

    getData(lat, long);
  }, {});

  return (
    <div className="weatherHeader">
      {data.properties ? (
        <>
          <a href="/weather">
            <div className="weatherHeader_temp">
              {data.properties.periods[0].temperature}°{' '}
            </div>
            <div className="weatherHeader_text invisible">
              {data.properties.periods[0].shortForecast}
            </div>
          </a>
          <div className="weatherButton">
            <Icon elementClass="icon-weatherHeader" name="location" />
            <div className="invisible">Get Geolocation</div>
            <div className="weatherHeader_default">MSP</div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
