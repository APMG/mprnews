import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { CtoF, torrToInhg, getValueOfMostRecent } from '../../utils/utils';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';
import { format } from 'date-fns';

const CurrentWeather = ({ weather, forecast }) => {
  return (
    <>
      <div className="weather_card weather_card-em">
        <div className="weather_dashboard">
          {/* This one (thank goodness) automatically sorts by time and puts the current one first */}
          <div className="weather_currentForecast weather_whitebg">
            <div className="weather_row">
              {forecast.periods[0].shortForecast}
            </div>
            <div className="weather_row">
              <WeatherIcon
                elementClass="weatherIcon-current"
                iconUrl={forecast.periods[0].icon}
                fill={forecast.periods[0].isDaytime ? '#fba301' : '#35145a'}
              />
              <div className="weather_column">
                <Heading level={3} elementClass="hdg-temp">{`${CtoF(
                  getValueOfMostRecent(weather, weather.temperature.values)
                )}`}</Heading>
                <div className="weather_content">
                  Feels like{' '}
                  {`${CtoF(
                    getValueOfMostRecent(
                      weather,
                      weather.apparentTemperature.values
                    )
                  )}°`}
                </div>
              </div>
            </div>
            <div className="weather_row">
              <small className="weather_content">{`Last updated at ${format(
                new Date(weather.updateTime),
                'h:mm a	MMM d, yyyy'
              )}`}</small>
            </div>
          </div>

          <div className="weather_currentForecast">
            <div className="weather_row">
              <strong>Humidity </strong> &nbsp;
              {`${getValueOfMostRecent(
                weather,
                weather.relativeHumidity.values
              )}%`}
            </div>
            <div className="weather_row">
              <strong>Chance of rain </strong> &nbsp;
              {`${getValueOfMostRecent(
                weather,
                weather.probabilityOfPrecipitation.values
              )}%`}
            </div>
            <div className="weather_row">
              <strong>Wind </strong> &nbsp;
              {`${forecast.periods[0].windSpeed} ${forecast.periods[0].windDirection}`}
            </div>
            <div className="weather_row">
              <strong>Pressure</strong> &nbsp;
              {`${torrToInhg(
                getValueOfMostRecent(weather, weather.pressure.values)
              )} inHg`}
            </div>
            <div className="weather_row">
              <strong>Dew Point </strong> &nbsp;
              {`${CtoF(
                getValueOfMostRecent(weather, weather.dewpoint.values)
              )}° F`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CurrentWeather.propTypes = {
  weather: PropTypes.object,
  forecast: PropTypes.object
};

export default CurrentWeather;
