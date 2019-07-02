import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Heading, Button, Loading } from '@apmg/titan';
import Icon from '../../components/Icons/Icon';
import WeatherAlert from '../../components/WeatherAlert/WeatherAlert';
import CurrentWeather from './CurrentWeather';
import TwoDaysChart from './TwoDaysChart';
import WeeklyForecast from './WeeklyForecast';
import { weatherConfig } from '../../utils/defaultData';
import { fetchWeather } from '../../utils/fetchWeather';
import LocationContext from '../../context/LocationContext';

const Weather = (props) => {
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(false);
  let context = useContext(LocationContext);

  useEffect(() => {
    console.log('use effect called');
    console.log(context.location);
    setLoading(true);

    const href = `/weather/${context.location.id}`;
    const as = href;
    Router.push(href, as, { shallow: true });

    const callFetchWeather = async () => {
      console.log('fetch weather called');
      const { weather, forecast, weekly, alerts } = await fetchWeather(
        context.location.lat,
        context.location.long
      );

      setData({
        location: context.location,
        weather: weather,
        forecast: forecast,
        weekly: weekly,
        alerts: alerts
      });
    };

    callFetchWeather();

    setLoading(false);
  }, [context.location]);

  // const handleChange = async (e) => {
  //   setLoading(true);

  //   let test = context.handleLocationChange(e.target.value);

  //   console.log(test);

  //   const href = `/weather/${context.location.id}`;
  //   const as = href;
  //   Router.push(href, as, { shallow: true });

  //   const { weather, forecast, weekly, alerts } = await fetchWeather(
  //     context.location.lat,
  //     context.location.long
  //   );

  //   setData({
  //     location: context.location,
  //     weather: weather,
  //     forecast: forecast,
  //     weekly: weekly,
  //     alerts: alerts
  //   });
  //   setLoading(false);
  // };

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
          onChange={(e) => {
            context.handleLocationChange(e.target.value);
          }}
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
        return <WeatherAlert key={alert.id} alert={alert} />;
      })}

      <CurrentWeather weather={data.weather} forecast={data.forecast} />

      <WeeklyForecast forecast={data.forecast} />

      <TwoDaysChart forecast={data.forecast} />
    </section>
  );
};

Weather.propTypes = {
  data: PropTypes.object
};

export default Weather;
