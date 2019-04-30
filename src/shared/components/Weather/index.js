import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCity: {
        id: 'MSP',
        name: 'MSP Airport',
        lat: '44.8848',
        long: '-93.2223'
      },
      href: null,
      error: null,
      isLoaded: false,
      response: [],
      locations: [
        { id: 'MSP', name: 'MSP Airport', lat: '44.8848', long: '-93.2223' },
        { id: 'SP', name: 'St.Paul, MN', lat: '44.9537', long: '-93.0900' },
        { id: 'BEM', name: 'Bemidji, MN', lat: '47.4716', long: '-94.8827' },
        { id: 'BRA', name: 'Brainerd, MN', lat: '46.3527', long: '-94.2020' },
        { id: 'DUL', name: 'Duluth, MN', lat: '46.7867', long: '-92.1005' },
        { id: 'ELY', name: 'Ely, MN', lat: '47.9032', long: '-91.8671' },
        { id: 'EAU', name: 'Eau Claire, WI', lat: '44.8113', long: '-91.4985' },
        { id: 'FAR', name: 'Fargo, ND', lat: '46.8772', long: '-96.7898' },
        { id: 'GRA', name: 'Grand Forks, ND', lat: '47.9253', long: '-97.0329' }
      ]
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  checksPropsToStateToDefault() {
    if (this.props['*'] && this.state.href == null) {
      return this.props['*'];
    } else if (!this.state.href == null) {
      return this.state.href;
    }
  }

  fetchWeatherData() {
    const url = `https://api.weather.gov/points/${this.checksPropsToStateToDefault()}/forecast`;
    axios
      .get(url)
      .then((res) => {
        this.setState({ isLoaded: true, response: res.data });
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  handleOnChange(event) {
    const newLink = event.target.value;
    this.setState({
      href: `/${newLink}`
    });
    navigate(`/weather/${newLink}`);
    return this.fetchWeatherData();
  }

  render() {
    const { error, isLoaded, response } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>{this.props.path} page</h1>
          Generated at:
          {response.properties.generatedAt}
          <br />
          Updated at:
          {response.properties.updateTime}
          <div>
            <h2>Current Conditions</h2>

            <select onChange={this.handleOnChange}>
              {this.state.locations.map((event) => (
                <option key={event.id} value={`${event.lat},${event.long}`}>
                  {event.name}
                </option>
              ))}
            </select>

            <div>
              {/* TODO: the logic in this function is bit off when rerendering to a different city and back*/}
              {response.properties.periods[0].number === 1 &&
                response.properties.periods.splice(0, 1).map((data) => (
                  <div key={2}>
                    <div>{data.temperature}°</div>
                    <p>
                      {data.name} : {data.shortForecast}
                    </p>
                    <p>WindSpeed : {data.windSpeed}</p>
                    <p>WindDirection :{data.windDirection}</p>
                    Start: {data.startTime} End:
                    {data.endTime}
                    <p>{data.detailedForecast}</p>
                  </div>
                ))}
            </div>
          </div>
          <hr />
          <h2>Conditions Periods</h2>
          <ul>
            {response.properties.periods.map((data) => (
              <div key={data.number}>
                <li>
                  <img src={data.icon} alt={data.name} />
                </li>
                <li>{data.number}</li>
                <li>
                  {data.name} : {data.shortForecast}
                </li>
                <li>
                  Temperature : {data.temperature}
                  {data.temperatureUnit}
                </li>
                <li>WindSpeed : {data.windSpeed}</li>
                <li>WindDirection: {data.windDirection}</li>
                <li>Start: {data.startTime}</li>
                <li>End: {data.endTime}</li>
                <li />
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}

Weather.propTypes = {
  path: PropTypes.string,
  '*': PropTypes.string
};
