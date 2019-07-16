import React, { useEffect, useState, useContext } from 'react';
import { Heading } from '@apmg/titan';
import fetch from 'isomorphic-unfetch';
import LocationContext from '../../context/LocationContext';
import Link from 'next/link';

const WeatherSidebar = () => {
  const [data, setData] = useState({});
  const context = useContext(LocationContext);

  useEffect(() => {
    const getData = async (lat, long) => {
      let response = await fetch(
        `https://api.weather.gov/points/${lat},${long}/forecast`
      );
      let result = await response.json();
      setData(result);
    };

    getData(context.location.lat, context.location.long);
  }, {});

  let currentForecast, tonightsForecast;

  if (data.properties) {
    currentForecast = data.properties.periods[0];
    tonightsForecast = data.properties.periods.find(
      (period) => period.name === 'Tonight'
    );
  }

  return (
    <div className="weatherSidebar">
      {data.properties ? (
        <>
          <Link href="/weather/:id" as="weather">
            <a className="infoLink_title">
              <Heading level={2} className="hdg hdg-4">
                Forecast
              </Heading>
            </a>
          </Link>

          <div className="weatherSidebar_section weatherSidebar_section-now">
            <div className="weatherSidebar_label">{currentForecast.name}</div>
            {currentForecast.temperatureTrend ? (
              <div className="weatherSidebar_temp">{`${currentForecast.temperature}° ${currentForecast.temperatureUnit} and ${currentForecast.temperatureTrend}`}</div>
            ) : (
              <div className="weatherSidebar_temp">{`${currentForecast.temperature}° ${currentForecast.temperatureUnit}`}</div>
            )}
            <div className="weatherSidebar_desc">{`${currentForecast.shortForecast}`}</div>
          </div>
          <div className="weatherSidebar_section weatherSidebar_section-later">
            <div className="weatherSidebar_label">{tonightsForecast.name}</div>
            {tonightsForecast.temperatureTrend ? (
              <div className="weatherSidebar_temp">{`${tonightsForecast.temperature}° ${tonightsForecast.temperatureUnit} and ${tonightsForecast.temperatureTrend}`}</div>
            ) : (
              <div className="weatherSidebar_temp">{`${tonightsForecast.temperature}° ${tonightsForecast.temperatureUnit}`}</div>
            )}
            <div className="weatherSidebar_desc">{`${tonightsForecast.shortForecast}`}</div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default WeatherSidebar;
