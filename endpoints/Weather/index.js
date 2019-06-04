import React, { useContext } from 'react';
import WeatherContext from './WeatherContext';
import Weather from './Weather';
import PropTypes from 'prop-types';

const WeatherWrapper = (props) => {
  const context = useContext(WeatherContext);
  const pathSlug = props['*'];
  return (
    <Weather
      pathSlug={pathSlug}
      selectLocation={context.href}
      isLoaded={context.isLoaded}
      error={context.error}
      weather={context.weather}
      handleOnChange={context.handleOnChange}
    />
  );
};

WeatherWrapper.propTypes = {
  '*': PropTypes.string
};

export default WeatherWrapper;
