import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';

const WeatherSidebar = () => {
  const context = useContext(WeatherContext);

  let currentForecast, tonightsForecast;

  if (context.weatherData.properties) {
    currentForecast = context.weatherData.properties.periods[0];
    tonightsForecast = context.weatherData.properties.periods.find(
      (period) => period.name === 'Tonight'
    );
  }

  return (
    <div className="weatherSidebar">
      {context.weatherData.properties && (
        <>
          <div className="section section-md">
            {currentForecast && (
              <div className="weatherSidebar_label weatherSidebar_label-high">
                High of
                {currentForecast.temperature &&
                  ` ${currentForecast.temperature}°`}
              </div>
            )}
            {tonightsForecast && (
              <div className="weatherSidebar_label weatherSidebar_label-low">
                Low of
                {tonightsForecast.temperature &&
                  ` ${tonightsForecast.temperature}°`}
              </div>
            )}
            {currentForecast && (
              <div className="weatherSidebar_desc">
                {currentForecast.shortForecast}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherSidebar;
