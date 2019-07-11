import React, { useEffect, useState, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import LocationContext from '../../context/LocationContext';
import Icon from '../Icons/Icon';
import { getClosestHourMatch } from '../../utils/utils';

const WeatherHeader = () => {
  const [data, setData] = useState({});
  const context = useContext(LocationContext);

  useEffect(() => {
    const getData = async (lat, long) => {
      let response = await fetch(
        `https://api.weather.gov/points/${lat},${long}/forecast/hourly`
      );
      let result = await response.json();
      let match = getClosestHourMatch(result.properties.periods);
      console.log(match);
      setData(match);
    };

    getData(context.location.lat, context.location.long);
  }, {});

  return (
    <div className="weatherHeader">
      {data.temperature ? (
        <>
          <a href="/weather">
            <div className="weatherHeader_temp">{`${data.temperature}°`}</div>
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
