import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';
// import WeatherHeader from './components/Weather/WeatherHeader';
import CollectionLink from './components/Collection/CollectionLink';
import WeatherContext from './context/WeatherContext';
import axios from 'axios';
import { navigate } from '@reach/router';

import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      href: null,
      weather: { response: {}, isLoaded: false, error: null },
      defaultCity: {
        forecastOffice: 'MPX',
        station: 'KMSP',
        gridpoints: { lat: '109', long: '67' }
      },
      handleOnChange: this.handleOnChange.bind(this),
      windowLocationHref: this.windowLocationHref.bind(this)
      // getNameFromApi: this.getNameFromApi.bind(this)
    };
    console.log('props from server:', props.url);
    // console.log(`props ${props.url.match(/\/([^\/]+)\/?$/)[1]}`);
  }

  componentDidMount() {
    console.log(
      'window.location',
      window.location.pathname.match(/\/([^\/]+)\/?$/)[1]
    );

    this.fetchWeatherData();
  }

  fetchWeatherData() {
    // const latitude = this.state.defaultCity.gridpoints.lat;
    // const longitude = this.state.defaultCity.gridpoints.long;
    // const office = this.state.defaultCity.forecastOffice;
    const url = `https://api.weather.gov/points/${this.windowLocationHref()}/forecast`;

    axios
      .get(url)
      .then((res) => {
        this.setState({
          weather: { response: res.data, isLoaded: true }
        });
        // console.log('props', this.props.url);
        // console.log('console.log: fetchWeatherData: this.state:', this.state);
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  windowLocationHref() {
    let pathname = window.location.pathname.match(/\/([^\/]+)\/?$/)[1];
    if (this.state.href == null) {
      this.setState({
        href: pathname
      });

      return pathname;
    } else if (this.state.href !== null) {
      return this.state.href;
    }
  }

  // getNameFromApi() {
  //   const url = `https://api.weather.gov/points/${this.windowLocationHref()}/forecast`;

  //   axios
  //     .get(url)
  //     .then((res) => {
  //       this.setState({ weather: { response: res.data, isLoaded: true } });
  //       console.log('console.log: getNameFromApi: this.state:', this.state);
  //     })
  //     .catch((error) => {
  //       this.setState({ isLoaded: true, error });
  //     });
  // }

  handleOnChange(event) {
    {
      console.log('select target: 🎽', event.target.value);
    }

    this.setState({
      href: `${event.target.value}`
    });
    navigate(`/weather/${event.target.value}`);

    return this.fetchWeatherData();
  }
  render() {
    console.log('console.log: rendering 🏓', this.state);
    return (
      <div>
        <WeatherContext.Provider value={this.state}>
          <Link to="/">
            <img
              src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg"
              alt=""
            />
          </Link>

          <CollectionLink />
          <Routes />
          {/* <WeatherHeader /> */}
        </WeatherContext.Provider>
        ;
      </div>
    );
  }
}

App.propTypes = {
  '*': PropTypes.string,
  url: PropTypes.string
};

export default App;
