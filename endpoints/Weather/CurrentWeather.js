import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Heading } from '@apmg/titan';
import { CtoF, torrToInhg, getValueOfMostRecent } from '../../utils/utils';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';

const CurrentWeather = ({ weather, forecast }) => {
  return (
    <>
      <div className="weather_current">
        <div className="weather_dashboard">
          {/* This one (thank goodness) automatically sorts by time and puts the current one first */}
          <div className="weather_currentForecast">
            <WeatherIcon
              elementClass="weatherIcon-current"
              iconUrl={forecast.periods[0].icon}
              fill={forecast.periods[0].isDaytime ? '#fba301' : '#35145a'}
            />
            <Heading level={3} elementClass="hdg-temp">{`${CtoF(
              getValueOfMostRecent(weather, weather.temperature.values)
            )}°`}</Heading>
            <Heading level={4} elementClass="hdg-forecast">
              {forecast.periods[0].shortForecast}
            </Heading>
          </div>

          <div className="weather_currentStats">
            <div className="weather_attrs">
              <div className="weather_attr">
                <div className="weather_attrName">Feels like</div>
                <div className="weather_attrData">{`${CtoF(
                  getValueOfMostRecent(
                    weather,
                    weather.apparentTemperature.values
                  )
                )}° F`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Humidity</div>
                <div className="weather_attrData">{`${getValueOfMostRecent(
                  weather,
                  weather.relativeHumidity.values
                )}%`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Chance of rain</div>
                <div className="weather_attrData">{`${getValueOfMostRecent(
                  weather,
                  weather.probabilityOfPrecipitation.values
                )}%`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Wind</div>
                <div className="weather_attrData">{`${forecast.periods[0].windSpeed} ${forecast.periods[0].windDirection}`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Pressure</div>
                <div className="weather_attrData">{`${torrToInhg(
                  getValueOfMostRecent(weather, weather.pressure.values)
                )} inHg`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Dew Point</div>
                <div className="weather_attrData">{`${CtoF(
                  getValueOfMostRecent(weather, weather.dewpoint.values)
                )}° F`}</div>
              </div>
            </div>
          </div>
          <div className="weather_currentUpdated">
            {`Last updated at ${format(
              new Date(weather.updateTime),
              'h:mm a	MMM d, yyyy'
            )}`}
          </div>
        </div>
      </div>
    </>
  );
};

CurrentWeather.propTypes = {
  weather: PropTypes.object,
  forecast: PropTypes.object,
};

export default CurrentWeather;
