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

          <div className="section section-md">
            <div className="weatherSidebar_label weatherSidebar_label-high">
              High of
              {currentForecast.temperature &&
                ` ${currentForecast.temperature}°`}
            </div>
            <div className="weatherSidebar_label weatherSidebar_label-low">
              Low of
              {tonightsForecast.temperature &&
                ` ${tonightsForecast.temperature}°`}
            </div>
            <div className="weatherSidebar_desc">{`${currentForecast.shortForecast}`}</div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default WeatherSidebar;
