import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Icon from '../Icons/Icon';

const WeatherHeader = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `https://w1.weather.gov/xml/current_obs/KMSP.xml`
      );
      let result = await response.text();
      const xml = new window.DOMParser().parseFromString(result, 'text/xml');
      setData({
        temperature: xml.getElementsByTagName('temp_f')[0].innerHTML,
        shortForecast: xml.getElementsByTagName('weather')[0].innerHTML
      });
    };

    getData();
  }, {});

  return (
    <div className="weatherHeader">
      {data.temperature ? (
        <>
          <a href="/weather">
            <div className="weatherHeader_temp">{`${parseInt(
              data.temperature
            )}°`}</div>
            <div className="weatherHeader_text invisible">
              {data.shortForecast}
            </div>
          </a>
          <div className="weatherButton">
            <Icon elementClass="icon-weatherHeader" name="location" />
            <div className="invisible">Get Geolocation</div>
            <div className="weatherHeader_default">MSP</div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeatherHeader;
