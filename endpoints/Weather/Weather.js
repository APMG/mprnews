import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import CurrentWeather from './CurrentWeather';
import { weatherConfig } from '../../utils/defaultData';
import { fetchWeather } from '../../utils/fetchWeather';

const Weather = (props) => {
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(false);

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

  const { location, alerts } = data;

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

      <CurrentWeather weather={data.weather} forecast={data.forecast} />

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
