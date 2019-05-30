import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'apm-titan';

import { weatherConfig } from '../../config/index';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
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
          <Heading level={2}>{this.props.selectedId}</Heading>
          Generated at:
          {response.properties.generatedAt}
          <br />
          Updated at:
          {response.properties.updateTime}
          <div>
            <select onChange={isLoaded && this.props.handleOnChange}>
              <option defaultValue="selected">More locations</option>
              {weatherConfig.map((event) => (
                <option
                  id={event.id}
                  name={event.name}
                  key={event.id}
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
  handleOnChange: PropTypes.func,
  selectedId: PropTypes.string,
  weather: PropTypes.object,
  error: PropTypes.object,
  isLoaded: PropTypes.bool,
  response: PropTypes.object
};
