import React from 'react';
import PropTypes from 'prop-types';
import { format, closestIndexTo } from 'date-fns';
import { Heading } from '@apmg/titan';
import Icon from '../../components/Icons/Icon';
import WeatherIcon from '../../components/WeatherIcons/WeatherIcon';
import { CtoF, degToCompass, mpsToMph, torrToInhg } from '../../utils/utils';

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
    <div className="weather_current">
      <div className="weather_share">
        <button>
          <Icon name="twitter" />
        </button>
        <button>
          <Icon name="facebook" />
        </button>
      </div>
      <div className="weather_currentHeader">
        <Heading level={3}>Current Conditions</Heading>
        <div>{format(weather.updateTime, 'h:mm A	MMM D, YYYY')}</div>
      </div>
      <div className="weather_currentIcon">
        {/* This one (thank goodness) automatically sorts by time and puts the current one first */}
        <WeatherIcon iconUrl={forecast.periods[0].icon} />
        <div>{forecast.periods[0].shortForecast}</div>
      </div>
      <div className="weather_currentTemp">
        <div>{`${CtoF(
          getValueOfMostRecent(weather.temperature.values)
        )}°`}</div>
        <div>{`Feels like ${CtoF(
          getValueOfMostRecent(weather.apparentTemperature.values)
        )}°`}</div>
      </div>
      <table className="weather_currentStats">
        <tbody>
          <tr>
            <td>Wind</td>
            <td>{`${degToCompass(
              getValueOfMostRecent(weather.windDirection.values)
            )} ${mpsToMph(
              getValueOfMostRecent(weather.windSpeed.values)
            )} mph`}</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{`${torrToInhg(
              getValueOfMostRecent(weather.pressure.values)
            )}`}</td>
          </tr>
          <tr>
            <td>Dew Point</td>
            <td>{`${CtoF(
              getValueOfMostRecent(weather.temperature.values)
            )}° F`}</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{`${getValueOfMostRecent(
              weather.relativeHumidity.values
            )}`}</td>
          </tr>
          {/* We used to provide sunset and sunrise, but weather.gov does not provide this. */}
        </tbody>
      </table>
    </div>
  );
};

CurrentWeather.propTypes = {
  weather: PropTypes.object,
  forecast: PropTypes.object
};

export default CurrentWeather;
