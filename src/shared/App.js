import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';
import WeatherHeader from './components/Weather/WeatherHeader';
import CollectionLink from './components/Collection/CollectionLink';
import WeatherContext from './context/WeatherContext';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: { response: {}, isLoaded: false, error: null },
      defaultCity: null
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const url = `https://api.weather.gov/gridpoints/MPX/109,67/forecast`;

    axios
      .get(url)
      .then((res) => {
        this.setState({
          weather: { response: res.data, isLoaded: true }
        });
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }
  render() {
    console.log('console.log from app/this.state:', this.state);
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
          <WeatherHeader />
        </WeatherContext.Provider>
      </div>
    );
  }
}

export default App;
