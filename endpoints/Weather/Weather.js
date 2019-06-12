import React, { useState, useEffect } from 'react';
import { format, closestIndexTo } from 'date-fns';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { weatherConfig } from '../../utils/defaultData';
import { CtoF, degToCompass, mpsToMph, torrToInhg } from '../../utils/utils';

const Weather = (props) => {
  // console.log(weather);
  const [location, setLocation] = useState(props.location);
  const [weather, setWeather] = useState(props.weather);
  const [forecast, setForecast] = useState(props.forecast);
  const [alerts, setAlerts] = useState(props.alerts);
  let currentTime = Date.parse(weather.updateTime);

  const getValueOfMostRecent = (arr) => {
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
    setLocation(newLocation);
    const backgroundUrl = `https://api.weather.gov/points/${newLocation.lat},${
      newLocation.long
    }`;
    const locationRes = await fetch(backgroundUrl);
    const locationData = await locationRes.json();

    const weatherUrl = locationData.properties.forecastGridData;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const forecastUrl = locationData.properties.forecast;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const alertUrl = `https://api.weather.gov/alerts/active?point=${
      newLocation.lat
    },${newLocation.long}`;
    const alertRes = await fetch(alertUrl);
    const alertData = await alertRes.json();

    let {
      updateTime,
      temperature,
      apparentTemperature,
      windDirection,
      windSpeed,
      pressure,
      dewpoint,
      relativeHumidity
    } = weatherData.properties;

    setWeather({
      updateTime,
      temperature,
      apparentTemperature,
      windDirection,
      windSpeed,
      pressure,
      dewpoint,
      relativeHumidity
    });
    setForecast(forecastData.properties);
    setAlerts(alertData.features);

    console.log('weather', weather);
  };

  return (
    <section className="weather">
      {/* TODO: make this align with whatever location has been chosen in the dropdown (Minneapolis by default?) */}
      <div className="weather_location">
        <Heading level={1}>{location.name}</Heading>

        <select className="weather_locationSelect" onChange={handleChange}>
          {weatherConfig.map((loc) => (
            <option key={loc.id} value={`${loc.name}`}>
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
  location: PropTypes.object,
  weather: PropTypes.object,
  forecast: PropTypes.object,
  alerts: PropTypes.array
};

export default Weather;
