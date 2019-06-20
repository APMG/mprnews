import React from 'react';
import PropTypes from 'prop-types';
import { format, closestIndexTo } from 'date-fns';
import { Heading } from '@apmg/titan';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';
import { CtoF, torrToInhg } from '../../utils/utils';

const CurrentWeather = ({ weather, forecast }) => {
  const getValueOfMostRecent = (arr) => {
    let currentTime = Date.parse(weather.updateTime);
    if (arr.length <= 0) return '-';

    let i = closestIndexTo(
      currentTime,
      arr.map((i) => Date.parse(i.validTime.split('/').shift()))
    );
    return arr[i].value;
  };

  return (
    <>
      <div className="weather_current">
        <div className="weather_dashboard">
          {/* This one (thank goodness) automatically sorts by time and puts the current one first */}
          <div className="weather_currentForecast">
            <WeatherIcon
              elementClass="weatherIcon-current"
              iconUrl={forecast.periods[0].icon}
            />
            <Heading level={3} elementClass="hdg-temp">{`${CtoF(
              getValueOfMostRecent(weather.temperature.values)
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
                  getValueOfMostRecent(weather.apparentTemperature.values)
                )}° F`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Humidity</div>
                <div className="weather_attrData">{`${getValueOfMostRecent(
                  weather.relativeHumidity.values
                )}%`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Chance of rain</div>
                <div className="weather_attrData">{`${getValueOfMostRecent(
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
                  getValueOfMostRecent(weather.pressure.values)
                )} inHg`}</div>
              </div>
              <div className="weather_attr">
                <div className="weather_attrName">Dew Point</div>
                <div className="weather_attrData">{`${CtoF(
                  getValueOfMostRecent(weather.dewpoint.values)
                )}° F`}</div>
              </div>
            </div>
          </div>
          <div className="weather_currentUpdated">
            {`Last updated at ${format(
              weather.updateTime,
              'h:mm A	MMM D, YYYY'
            )}`}
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
