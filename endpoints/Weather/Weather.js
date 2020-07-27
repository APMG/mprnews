import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Heading, Loading } from '@apmg/titan';
import { weatherConfig } from '../../utils/defaultData';
import { fetchWeather } from '../../utils/fetchWeather';
import WeatherAlert from '../../components/WeatherAlert/WeatherAlert';
import CurrentWeather from './CurrentWeather';
import TwoDaysChart from './TwoDaysChart';
import WeeklyForecast from './WeeklyForecast';
import Updraft from './Updraft';
import ShareSocialButtons from '../../components/ShareSocialButtons/ShareSocialButtons';

const Weather = ({ location, weather, alerts, updraft, forecast }) => {
  const [weatherData, setWeatherData] = useState({
    location,
    weather,
    alerts,
    updraft,
    forecast
  });
  console.log('weather', weatherData);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    let newLocation = weatherConfig.find(
      (item) => item.name === e.target.value
    );
    console.log('newlocation', newLocation);
    setLoading(true);

    const href = `/weather/${newLocation.id}`;
    const as = href;
    Router.push(href, as, { shallow: true });

    // const { location } = await fetchWeather(newLocation.lat, newLocation.long);
    console.log('dropdown', weatherData);
    // setWeatherData({
    //   location: newLocation
    // });
    setWeatherData((prevState) => {
      return {
        ...prevState,
        location: newLocation
      };
    });
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="weather section">
      <div className="weather_location">
        <div className="weather_heading">
          <Heading level={1} elementClass="hdg-2">
            {location.name}
          </Heading>
          <div className="weather_share">
            <ShareSocialButtons
              contentUrl={'weather'}
              title={`Weather Forecast for ${location.name}`}
            />
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
        // This should be a link, but I can't figure out how to link to an endpoint for this alert given this  However, we do have the raw alert data and could simply set this to expand and show the detailed description for ourselves. I think that's the best approach.
        return <WeatherAlert key={alert.id} alert={alert} />;
      })}

      <CurrentWeather weather={weather} forecast={forecast} />

      <WeeklyForecast forecast={forecast} />

      <TwoDaysChart forecast={forecast} />
      {updraft && <Updraft item={updraft.collection.results.items[0]} />}
    </section>
  );
};

Weather.propTypes = {
  // data: PropTypes.object
};

export default Weather;
