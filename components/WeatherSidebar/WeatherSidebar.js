import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';

const WeatherSidebar = () => {
  const context = useContext(WeatherContext);

  return (
    <div className="weatherSidebar">
      {context.weatherData && (
        <>
          <div className="section section-md">
            {context.weatherData.high && (
              <div className="weatherSidebar_label weatherSidebar_label-high">
                {`High of ${context.weatherData.high}°`}
              </div>
            )}
            {context.weatherData.low && (
              <div className="weatherSidebar_label weatherSidebar_label-low">
                {`Low of ${context.weatherData.low}°`}
              </div>
            )}
            {context.weatherData.shortForecast && (
              <div className="weatherSidebar_desc">
                {context.weatherData.shortForecast}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherSidebar;
