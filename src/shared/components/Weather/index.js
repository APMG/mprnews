import React, { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import Weather from './Weather';
import PropTypes from 'prop-types';

const WeatherWrapper = (props) => {
  const context = useContext(WeatherContext);
  const pathSlug = props['*'];
  return (
    <Weather
      pathSlug={pathSlug}
      weather={context.weather}
      handleOnChange={context.handleOnChange}
      fetchSlugProps={context.fetchSlugProps}
    />
  );
};
WeatherWrapper.propTypes = {
  '*': PropTypes.string
};

export default WeatherWrapper;
