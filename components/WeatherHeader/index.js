import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import WeatherHeader from './WeatherHeader';
import PropTypes from 'prop-types';

const WeatherHeaderWrapper = (props) => {
  const context = useContext(WeatherContext);
  const pathSlug = props['*'];
  return (
    <WeatherHeader
      pathSlug={pathSlug}
      selectLocation={context.href}
      isLoaded={context.isLoaded}
      error={context.error}
      weather={context.weather}
      handleOnChange={context.handleOnChange}
    />
  );
};
WeatherHeaderWrapper.propTypes = {
  '*': PropTypes.string
};

export default WeatherHeaderWrapper;
