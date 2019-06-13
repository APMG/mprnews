import React, { useState } from 'react';
import { format, closestIndexTo } from 'date-fns';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { weatherConfig } from '../../utils/defaultData';
import { fetchWeather } from '../../utils/fetchWeather';
import { CtoF, degToCompass, mpsToMph, torrToInhg } from '../../utils/utils';

const Weather = (props) => {
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(false);

  const getValueOfMostRecent = (arr) => {
    let currentTime = Date.parse(data.weather.updateTime);
    if (arr.length <= 0) return 'N/A';

    let i = closestIndexTo(
      currentTime,
      arr.map((i) => Date.parse(i.validTime.split('/').shift()))
    );
    return arr[i].value;
  };

  const handleChange = async (e) => {
    let newLocation = weatherConfig.find(
      (item) => item.name === e.target.value
    );

    setLoading(true);
    const { weather, forecast, alerts } = await fetchWeather(
      newLocation.lat,
      newLocation.long
    );

    setData({ location: newLocation, weather, forecast, alerts });
    setLoading(false);
  };

  const { location, weather, forecast, alerts } = data;

  return loading ? (
    <Loading />
  ) : (
    <section className="weather">
      <div className="weather_location">
        <Heading level={1}>{location.name}</Heading>

        <select
          className="weather_locationSelect"
          onChange={handleChange}
          value={location.name}
        >
          {weatherConfig.map((loc) => (
            <option key={loc.id} value={`${loc.name}`} label={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {alerts.map((alert) => {
        // This should be a link, but I can't figure out how to link to an endpoint for this alert given this data. However, we do have the raw alert data and could simply set this to expand and show the detailed description for ourselves. I think that's the best approach.
        return (
          <div key={alert.id} className="weather_alert">
            <Heading level={2}>{alert.properties.event}</Heading>
          </div>
        );
      })}

      <div className="weather_share">
        <button>Share via Twitter</button>
        <button>Share via Facebook</button>
      </div>

      <div className="weather_current">
        <div className="weather_currentHeader">
          <Heading level={3}>Current Conditions</Heading>
          <div>{format(weather.updateTime, 'h:mm A	MMM D, YYYY')}</div>
        </div>
        <div className="weather_currentTemp">
          <div>{`${CtoF(
            getValueOfMostRecent(weather.temperature.values)
          )}°`}</div>
          <div>{`Feels like ${CtoF(
            getValueOfMostRecent(weather.apparentTemperature.values)
          )}°`}</div>
        </div>
        <div className="weather_currentIcon">
          {/* This one (thank goodness) automatically sorts by time and puts the current one first */}
          <Image
            fallbackSrc={forecast.periods[0].icon}
            alt={forecast.periods[0].shortForecast}
          />
          <div>{forecast.periods[0].shortForecast}</div>
        </div>
        <div className="weather_currentStats">
          <table>
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
                <td>Dew point</td>
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
      </div>

      <div className="weather_forecast">
        {/* TODO: insert a better visual here for at least the next 48 hours and 7 days */}
        {/* TODO: temperature chart (high/low bar graph) */}
      </div>

      <div className="weather_updraft">
        {/* TODO: Is this a Strelka collection? If so, probably we'll use Teaser objects here. */}
      </div>

      <div className="weather_signup">
        {/* TODO: display signup options (Twitter and SMS) more efficiently */}

        <div className="weather_news">
          {/* TODO: Same as for Updraft: is it a collection? */}
        </div>
      </div>
    </section>
  );
};

Weather.propTypes = {
  data: PropTypes.object
};

export default Weather;
