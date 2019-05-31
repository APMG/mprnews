import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { Link, navigate } from 'apm-titan';
import SiteConfigContext from './context/SiteConfigContext';
import mprNewsConfig from './config/config';
import WeatherHeader from './components/WeatherHeader/index';
import CollectionLink from './components/Collection/CollectionLink';
import WeatherContext from './context/WeatherContext';
import '../shared/styles/index.scss';
import { weatherConfig } from './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCoordinates: null,
      selectedId: null,
      coordinates: null,
      defaultWeather: {
        id: 'minneapolis',
        name: 'MSP Airport',
        lat: '44.8848',
        long: '-93.2223',
        forecastOffice: 'MPX'
      },
      weather: { isLoaded: false, error: null },
      handleOnChange: this.handleOnChange.bind(this),
      fetchProps: this.fetchProps.bind(this)
    };
  }

  fetchProps(slug) {
    const coordinates = weatherConfig.find(
      (weather) => weather.id.indexOf(slug) > -1
    );
    if (coordinates === this.state.coordinates) return;
    this.setState(
      {
        coordinates: `${coordinates.lat},${coordinates.long}`
      },
      this.fetchWeatherData(`${coordinates.lat},${coordinates.long}`)
    );
  }

  componentDidMount() {
    console.log('componentdidMount', this.state);
  }

  fetchWeatherData(coordinates) {
    let url = `https://api.weather.gov/points/${coordinates}/forecast`;

    console.log('🇨🇱', url);
    axios
      .get(url)
      .then((res) => {
        return this.setState({
          weather: { response: res.data, isLoaded: true }
        });
      })
      .catch((error) => {
        this.setState({ weather: { isLoaded: true, error: error } });
      });
  }

  handleOnChange(event) {
    this.setState(
      {
        ...this.state,
        selectedCoordinates: event.target.value,
        selectedId: event.target[event.target.selectedIndex].id
      },

      this.fetchWeatherData(event.target.value)
    );
    navigate(`/weather/${event.target[event.target.selectedIndex].id}`);
  }
  render() {
    console.log(this);
    return (
      <div>
        <SiteConfigContext.Provider value={mprNewsConfig}>
          <WeatherContext.Provider value={this.state}>
            <Link to="/">
              <img
                src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg"
                alt=""
              />
            </Link>
            <WeatherHeader />
            <CollectionLink />
            <Routes />
          </WeatherContext.Provider>
        </SiteConfigContext.Provider>
      </div>
    );
  }
}
// App.propTypes = {
//   history: PropTypes.string
// };

export default App;
