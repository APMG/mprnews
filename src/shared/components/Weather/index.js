import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import Weather from './Weather';
import PropTypes from 'prop-types';

const WeatherWrapper = () => {
  const context = useContext(WeatherContext);

  return (
    <Weather
      href={context.href}
      weather={context.weather}
      default={context.defaultCity}
      handleOnChange={context.handleOnChange}
      // windowLocationHref={context.windowLocationHref}
      // getNameFromApi={context.getNameFromApi}
    />
  );
};

WeatherWrapper.propTypes = {
  '*': PropTypes.string
};
export default WeatherWrapper;
