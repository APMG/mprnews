/* eslint react/display-name: 0 */
import React from 'react';
import Main from '../layouts/Main';
import Weather from '../endpoints/Weather';
import WeatherContext from '../endpoints/Weather/WeatherContext';
import axios from 'axios';
import Router from 'next/router';

class WeatherPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectLocation: null,
      weather: { response: {}, isLoaded: false, error: null },
      handleOnChange: this.handleOnChange.bind(this)
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const pathname = window.location.pathname.split('/');
    const geoLocation = pathname[pathname.length - 1];
    const coordinates = geoLocation.match(/-?\d+(\.\d+)?,\s*(-?\d+(\.\d+)?)/g)
      ? geoLocation
      : `44.9434,-93.0965`;

    let url = `https://api.weather.gov/points/${coordinates}/forecast`;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          weather: { response: res.data, isLoaded: true }
        });
      })
      .catch((error) => {
        this.setState({ weather: { isLoaded: true, error: error } });
      });
  }

  handleOnChange(event) {
    this.setState({
      selectLocation: `${event.target.value}`
    });
    Router.push(`/weather/${event.target.value}`);

    return this.fetchWeatherData();
  }

  render() {
    return (
      <Main>
        <WeatherContext.Provider value={this.state}>
          <Weather />
        </WeatherContext.Provider>
      </Main>
    );
  }
}

export default WeatherPage;
