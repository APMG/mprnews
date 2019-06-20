import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, Button, Loading } from '@apmg/titan';
import Icon from '../../components/Icons/Icon';
import CurrentWeather from './CurrentWeather';
import TwoDaysChart from './TwoDaysChart';
import WeekForecast from './WeekForecast';
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
    const { weather, forecast, weekly, alerts } = await fetchWeather(
      newLocation.lat,
      newLocation.long
    );

    setData({
      location: newLocation,
      weather: weather,
      forecast: forecast,
      weekly: weekly,
      alerts: alerts
    });
    setLoading(false);
  };

  const { location, alerts } = data;

  return loading ? (
    <Loading />
  ) : (
    <section className="weather section">
      <div className="weather_location">
        <div className="weather_heading">
          <Heading level={1} elementClass="hdg-weather">
            {location.name}
          </Heading>
          <div className="weather_share">
            {/* TODO: ask how we do click-to-share content and how we want to do it for this. */}
            <Button elementClass="btn-shareWeather">
              <Icon name="twitter" />
            </Button>
            <Button elementClass="btn-shareWeather">
              <Icon name="facebook" />
            </Button>
          </div>
        </div>

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

      <TwoDaysChart forecast={data.forecast} />

      <WeekForecast forecast={data.forecast} />
    </section>
  );
};

Weather.propTypes = {
  data: PropTypes.object
};

export default Weather;
