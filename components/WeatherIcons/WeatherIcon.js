import React from 'react';
import PropTypes from 'prop-types';

const icons = {};

const WeatherIcon = (props) => {
  const { name, ...rest } = props;

  // Check if the icon is in the list; if not, render the empty icon
  const Element = icons[name] ? icons[name] : icons.empty;

  return <Element {...rest} />;
};

WeatherIcon.propTypes = {
  name: PropTypes.string
};

export default WeatherIcon;
