import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { weatherConfig } from '../../utils/defaultData';

const Weather = (props) => {
  // console.log(weather);
  const [forecast, setForecast] = useState(props.forecast);
  const [location, setLocation] = useState(props.location);
  const [alerts, setAlerts] = useState(props.alerts);

  // console.log(alerts);

  return (
    <section className="weather">
      {/* TODO: make this align with whatever location has been chosen in the dropdown (Minneapolis by default?) */}
      <div className="weather_location">
        <Heading level={1}>{location.name}</Heading>

        <select className="weather_locationSelect">
          {weatherConfig.map((loc) => (
            <option
              id={loc.id}
              label={loc.name}
              key={loc.id}
              value={`${loc.lat},${loc.long}`}
            >
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {alerts.map((alert) => {
        console.log(alert);
        // TODO: This should be a link, but i don't know how they're generating their link to the more detailed weather page on the current site from the data on this endpoint.
        return (
          <div key={alert.id} className="weather_alert">
            <Heading level={2}>{alert.properties.event}</Heading>
          </div>
        );
      })}

      <div className="weather_share">
        <button>Twitter</button>
        <button>Facebook</button>
      </div>

      <div className="weather_current">
        <div className="weather_currentHeader">
          <Heading level={3}>Current Conditions</Heading>
          <div>Time of last update</div>
        </div>
        <div className="weather_currentTemp">
          <div>77°</div>
          <div>Feels like 77°</div>
        </div>
        <div className="weather_currentIcon">
          <div>*cloud icon*</div>
          <div>Partly cloudy</div>
        </div>
        <div className="weather_currentStats">
          <table>
            <tbody>
              <tr>
                <td>Wind</td>
                <td>WNW 10 mph</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>↓ 30.11 inHg</td>
              </tr>
              <tr>
                <td>Dew point</td>
                <td>38° F</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>24%</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>5:28 AM</td>
              </tr>
              <tr>
                <td>Sunset</td>
                <td>8:59 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="weather_today">
        {/* TODO: insert a better visual for the hour-by-hour weather for today */}
        {/* TODO: temperature chart */}
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
  forecast: PropTypes.object,
  alerts: PropTypes.array
};

export default Weather;
