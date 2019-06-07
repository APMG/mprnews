import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import DropDownList from './DropDownList';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSlugProps(this.props.pathSlug);
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
          <Heading level={2}>{this.props.weather.selectedLocationName}</Heading>
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
  getSlugProps: PropTypes.func,
  selectedLocationName: PropTypes.string,
  weather: PropTypes.object,
  error: PropTypes.object,
  isLoaded: PropTypes.bool,
  response: PropTypes.object
};
