import React, { useContext } from 'react';
import WeatherContext from './WeatherContext';
import Weather from './Weather';
import PropTypes from 'prop-types';
import Metatags from '../../components/Metatags/Metatags';

const WeatherWrapper = (props) => {
  const context = useContext(WeatherContext);
  const pathSlug = props['*'];
  const title = 'Minneapolis St. Paul weather';

  return (
    <>
      <Metatags title={title} metatags={[]} links={[]} />
      <Weather
        pathSlug={pathSlug}
        weather={context.weather}
        handleOnChange={context.handleOnChange}
        getSlugProps={context.getSlugProps}
      />
    </>
  );
};

WeatherWrapper.propTypes = {
  '*': PropTypes.string
};

export default WeatherWrapper;
