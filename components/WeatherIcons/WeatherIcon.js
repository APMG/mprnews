import React from 'react';
import PropTypes from 'prop-types';

const icons = {};

const WeatherIcon = ({ description, ...rest }) => {
  // Check if the icon contains any "trigger" words; if not, render the empty icon
  const Element = icons[description] ? icons[description] : icons.empty;

  return <Element {...rest} />;
};

WeatherIcon.propTypes = {
  description: PropTypes.string
};

export default WeatherIcon;
