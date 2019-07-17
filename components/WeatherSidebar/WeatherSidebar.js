import React, { useEffect, useState, useContext } from 'react';
import { Heading } from '@apmg/titan';
import fetch from 'isomorphic-unfetch';
import LocationContext from '../../context/LocationContext';

const WeatherSidebar = () => {
  const [data, setData] = useState({});
  const context = useContext(LocationContext);

  useEffect(() => {
    const getData = async (lat, long) => {
      try {
        let response = await fetch(
          `https://api.weather.gov/points/${lat},${long}/forecast`
        );
        let result = await response;
        if (!result.ok) return;
        result.json().then((data) => {
          setData(data);
        });
      } catch (err) {
        return;
      }
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

  if (!currentForecast) {
    return <div className="weatherSidebar"></div>;
  }

  return (
    <div className="weatherSidebar">
      {data.properties ? (
        <>
          <Heading level={2} className="hdg hdg-4">
            Forecast
          </Heading>
          <div className="weatherSidebar_section weatherSidebar_section-now">
            <div className="weatherSidebar_label">{currentForecast.name}</div>
            {currentForecast.temperatureTrend ? (
              <div className="weatherSidebar_temp">{`${currentForecast.temperature}° ${currentForecast.temperatureUnit} and ${currentForecast.temperatureTrend}`}</div>
            ) : (
              <div className="weatherSidebar_temp">{`${currentForecast.temperature}° ${currentForecast.temperatureUnit}`}</div>
            )}
            <div className="weatherSidebar_desc">{`${currentForecast.shortForecast}`}</div>
          </div>
          {tonightsForecast ? (
            <div className="weatherSidebar_section weatherSidebar_section-later">
              <div className="weatherSidebar_label">
                {tonightsForecast.name}
              </div>
              {tonightsForecast.temperatureTrend ? (
                <div className="weatherSidebar_temp">{`${tonightsForecast.temperature}° ${tonightsForecast.temperatureUnit} and ${tonightsForecast.temperatureTrend}`}</div>
              ) : (
                <div className="weatherSidebar_temp">{`${tonightsForecast.temperature}° ${tonightsForecast.temperatureUnit}`}</div>
              )}
              <div className="weatherSidebar_desc">{`${tonightsForecast.shortForecast}`}</div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default WeatherSidebar;
