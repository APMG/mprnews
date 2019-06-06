import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import axios from 'axios';
import { navigate } from 'apm-titan';
import MainLayout from './components/Layout/MainLayout';
import SiteConfigContext from './context/SiteConfigContext';
import mprNewsConfig from './config/config';
import WeatherContext from './context/WeatherContext';
import '../shared/styles/index.scss';
import { weatherConfig } from './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {
        isLoaded: false,
        error: null,
        selectedCoordinates: null,
        selectedLocationName: null,
        coordinates: null
      },
      handleOnChange: this.handleOnChange.bind(this),
      getSlugProps: this.getSlugProps.bind(this)
    };
  }

  getSlugProps(slug) {
    const coordinates = weatherConfig.find(
      (weather) => weather.id.indexOf(slug) > -1
    );
    if (coordinates === this.state.weather.selectedCoordinates) return;
    this.setState(
      {
        ...this.state.weather,
        weather: {
          selectedCoordinates: `${coordinates.lat},${coordinates.long}`,
          selectedLocationName: coordinates.name
        }
      },
      this.fetchWeatherData(`${coordinates.lat},${coordinates.long}`)
    );
  }

  fetchWeatherData(coordinates) {
    let url = `https://api.weather.gov/points/${coordinates}/forecast`;
    axios
      .get(url)
      .then((res) => {
        return this.setState({
          weather: {
            isLoaded: true,
            selectedLocationName: this.state.weather.selectedLocationName,
            selectedCoordinates: this.state.weather.selectedCoordinates,
            response: res.data
          }
        });
      })
      .catch((error) => {
        this.setState({ weather: { isLoaded: true, error: error } });
      });
  }

  handleOnChange(event) {
    this.setState(
      {
        weather: {
          ...this.state.weather,
          selectedCoordinates: event.target.value,
          selectedLocationName: event.target[event.target.selectedIndex].label
        }
      },
      this.fetchWeatherData(event.target.value)
    );
    navigate(`/weather/${event.target[event.target.selectedIndex].id}`);
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
