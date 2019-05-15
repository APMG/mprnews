import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';
import { weatherConfig } from '../../config/index';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      href: null,
      error: null,
      isLoaded: false,
      response: []
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.getNameFromApi();
  }

  getNameFromApi() {
    const url = `https://api.weather.gov/points/${this.windowLocationHref()}/forecast`;
    axios
      .get(url)
      .then((res) => {
        this.setState({ isLoaded: true, response: res.data });
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  windowLocationHref() {
    if (this.props['*'] && this.state.href == null) {
      this.setState({
        href: `${this.props['*']}`
      });
      return `${this.props['*']}`;
    } else if (this.state.href !== null) {
      return this.state.href;
    }
  }

  handleOnChange(event) {
    this.setState({
      href: `${event.target.value}`
    });
    navigate(`/weather/${event.target.value}`);

    return this.getNameFromApi();
  }

  render() {
    const { isLoaded, response, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          Generated at:
          {response.properties.generatedAt}
          <br />
          Updated at:
          {response.properties.updateTime}
          <div>
            <h2>Current Conditions</h2>

            <select onChange={isLoaded && this.handleOnChange}>
              <option defaultValue="selected">locations</option>
              {weatherConfig.map((event) => (
                <option
                  key={event.id}
                  name={event.name}
                  value={`${event.lat},${event.long}`}
                >
                  {event.name}
                </option>
              ))}
            </select>

            <ul>
              {response.properties.periods[0].number === 1 &&
                response.properties.periods.splice(0, 1).map((data) => (
                  <div key={data.number}>
                    <li>{data.temperature}°</li>
                    <li>Number : {data.number}</li>
                    <li>Elevation: {response.properties.elevation.value} M </li>
                    <li>
                      {data.name} : {data.shortForecast}
                    </li>
                    <li>WindSpeed : {data.windSpeed}</li>
                    <li>WindDirection : {data.windDirection}</li>
                    Start : {data.startTime} End :{data.endTime}
                    <li>{data.detailedForecast}</li>
                  </div>
                ))}
            </ul>
          </div>
          <hr />
          <h2>Conditions Periods</h2>
          <ul>
            {response.properties.periods.map((data) => (
              <div key={data.number}>
                <li>{data.name}</li>
                <li>Number: {data.number}</li>
                <li>
                  <img src={data.icon} alt={data.name} />
                </li>
                <li>
                  {data.temperature}
                  {data.temperatureUnit}
                </li>
                <li>WindSpeed: {data.windSpeed}</li>
                <li>WindDirection: {data.windDirection}</li>
                <li>Start: {data.startTime}</li>
                <li>End: {data.endTime}</li>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}

Weather.propTypes = {
  '*': PropTypes.string
};
