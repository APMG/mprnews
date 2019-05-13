import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';
// import WeatherHeader from './components/Weather/WeatherHeader';
import CollectionLink from './components/Collection/CollectionLink';
import WeatherContext from './context/WeatherContext';
import axios from 'axios';
import {
  navigate,
  createMemorySource,
  createHistory,
  LocationProvider
} from '@reach/router';
import PropTypes from 'prop-types';

// for some types of tests you want a memory source
let source = createMemorySource('/');
let history = createHistory(source);

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
      windowLocationHref: this.windowLocationHref.bind(this),
      getNameFromApi: this.getNameFromApi.bind(this)
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const latitude = this.state.defaultCity.gridpoints.lat;
    const longitude = this.state.defaultCity.gridpoints.long;
    const office = this.state.defaultCity.forecastOffice;
    const url = `https://api.weather.gov/gridpoints/${office}/${latitude},${longitude}/forecast`;

    axios
      .get(url)
      .then((res) => {
        this.setState({
          weather: { response: res.data, isLoaded: true }
        });
        // console.log('console.log: fetchWeatherData: this.state:', this.state);
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
      console.log(this.props['*']);
      return `${this.props['*']}`;
    } else if (this.state.href !== null) {
      return this.state.href;
    }
  }

  getNameFromApi() {
    const url = `https://api.weather.gov/points/${this.windowLocationHref()}/forecast`;

    axios
      .get(url)
      .then((res) => {
        this.setState({ weather: { response: res.data, isLoaded: true } });
        console.log('console.log: getNameFromApi: this.state:', this.state);
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  handleOnChange(event) {
    {
      console.log('select target: 🎽', event.target.value);
    }

    this.setState({
      href: `${event.target.value}`
    });
    navigate(`${event.target.value}`);
    console.log('console.log: handleOnChange: this.state:🏓', this.state);

    return this.windowLocationHref();
  }
  render() {
    // console.log('console.log: rendering 🏓', this.state);
    return (
      <div>
        <LocationProvider history={history}>
          {(context) => {
            console.log(context.location);

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
            </WeatherContext.Provider>;
          }}
        </LocationProvider>
      </div>
    );
  }
}

App.propTypes = {
  '*': PropTypes.string
};

export default App;
