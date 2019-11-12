import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Icon from '../Icons/Icon';
import { Link } from '@apmg/titan';

const WeatherHeader = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(
          `https://w1.weather.gov/xml/current_obs/KMSP.xml`
        );
        let result = await response;
        if (!result.ok) return;
        result.text().then((data) => {
          const xml = new window.DOMParser().parseFromString(data, 'text/xml');
          setData({
            temperature: xml.getElementsByTagName('temp_f')[0].innerHTML,
            shortForecast: xml.getElementsByTagName('weather')[0].innerHTML
          });
        });
      } catch (err) {
        console.error(err);
        return;
      }
    };

    getData();
  }, []);

  return (
    <div className="weatherHeader">
      {data.temperature ? (
        <>
          <Link href="/weather">
            <div className="weatherHeader_temp">{`${parseInt(
              data.temperature
            )}°`}</div>
            <div className="weatherHeader_text invisible">
              {data.shortForecast}
            </div>
          </Link>
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
