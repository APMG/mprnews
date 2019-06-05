import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'apm-titan';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import DropDownList from './DropDownList';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchSlugProps(this.props.pathSlug);
  }

  render() {
    const { isLoaded, response, error } = this.props.weather;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Heading level={2}>{this.props.weather.selectedHeader}</Heading>
          <DropDownList select={this.props} />
          <CurrentWeather weather={response} />
          Generated at:
          {response.properties.generatedAt}
          Updated at:
          {response.properties.updateTime}
          <Forecast weather={response} />
        </div>
      );
    }
  }
}

Weather.propTypes = {
  pathSlug: PropTypes.string,
  fetchSlugProps: PropTypes.func,
  selectedHeader: PropTypes.string,
  weather: PropTypes.object,
  error: PropTypes.object,
  isLoaded: PropTypes.bool,
  response: PropTypes.object
};
