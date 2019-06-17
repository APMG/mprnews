import React from 'react';
import PropTypes from 'prop-types';
import { format, closestIndexTo } from 'date-fns';
import { Heading, Button } from '@apmg/titan';
import Icon from '../../components/Icons/Icon';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';
import { CtoF, torrToInhg } from '../../utils/utils';

const CurrentWeather = ({ weather, forecast }) => {
  const getValueOfMostRecent = (arr) => {
    let currentTime = Date.parse(weather.updateTime);
    if (arr.length <= 0) return 'N/A';

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
            <WeatherIcon iconUrl={forecast.periods[0].icon} />
            <Heading level={3} elementClass="hdg-temp">{`${CtoF(
              getValueOfMostRecent(weather.temperature.values)
            )}°`}</Heading>
            <Heading level={4} elementClass="hdg-forecast">
              {forecast.periods[0].shortForecast}
            </Heading>
          </div>

          <div className="weather_currentStats">
            <div className="weather_share">
              {/* TODO: ask how we do click-to-share content and how we want to do it for this. */}
              <Button elementClass="btn-shareWeather">
                <Icon name="twitter" />
              </Button>
              <Button elementClass="btn-shareWeather">
                <Icon name="facebook" />
              </Button>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Feels like</td>
                  <td>{`${CtoF(
                    getValueOfMostRecent(weather.apparentTemperature.values)
                  )}° F`}</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{`${getValueOfMostRecent(
                    weather.relativeHumidity.values
                  )}%`}</td>
                </tr>
                <tr>
                  <td>Chance of rain</td>
                  <td>{`${getValueOfMostRecent(
                    weather.probabilityOfPrecipitation.values
                  )}%`}</td>
                </tr>
                <tr>
                  <td>Wind</td>
                  <td>{`${forecast.periods[0].windSpeed} ${forecast.periods[0].windDirection}`}</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{`${torrToInhg(
                    getValueOfMostRecent(weather.pressure.values)
                  )} inHg`}</td>
                </tr>
                <tr>
                  <td>Dew Point</td>
                  <td>{`${CtoF(
                    getValueOfMostRecent(weather.temperature.values)
                  )}° F`}</td>
                </tr>
                <div className="weather_currentUpdated">
                  {`Last updated at ${format(
                    weather.updateTime,
                    'h:mm A	MMM D, YYYY'
                  )}`}
                </div>
                {/* We used to provide sunset and sunrise, but weather.gov does not provide this. In lieu of this, I've added some more stats that they do provide and that I have found useful in other weather apps. */}
              </tbody>
            </table>
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
