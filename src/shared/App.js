import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import axios from 'axios';
import { navigate } from 'apm-titan';
import MainLayout from './components/Layout/MainLayout';
import SiteConfigContext from './context/SiteConfigContext';
import mprNewsConfig from './config/config';
import WeatherContext from './context/WeatherContext';
import '../shared/styles/index.scss';

class App extends Component {
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
    navigate(`/weather/${event.target.value}`);

    return this.fetchWeatherData();
  }
  render() {
    return (
      <div>
        <SiteConfigContext.Provider value={mprNewsConfig}>
          <WeatherContext.Provider value={this.state}>
            <MainLayout>
              <Routes />
            </MainLayout>
          </WeatherContext.Provider>
        </SiteConfigContext.Provider>
      </div>
    );
  }
}

export default App;
