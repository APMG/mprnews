import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';
import WeatherHeader from './components/Weather/WeatherHeader';
import CollectionLink from './components/Collection/CollectionLink';
// import GeoLocation from '../shared/components/Weather/GeoLocation';
// import WeatherContext from './context/WeatherContext';
// import axios from 'axios';
// import { navigate } from '@reach/router';

// import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   href: null,
    //   weather: { response: {}, isLoaded: false, error: null },
    //   handleOnChange: this.handleOnChange.bind(this)
    // };
  }

  // componentDidMount() {
  //   const weatherPath = window.location?.pathname.match(/weather/g);
  //   console.log(weatherPath);
  //   if ((weatherPath.length > 1) | (weatherPath[0] == 'weather')) {
  //     this.fetchWeatherData();
  //   }
  // }

  // fetchWeatherData() {
  //   const url = `https://api.weather.gov/points/${this.windowLocationHref()}/forecast`;

  //   axios
  //     .get(url)
  //     .then((res) => {
  //       this.setState({
  //         weather: { response: res.data, isLoaded: true }
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({ isLoaded: true, error });
  //     });
  // }

  // windowLocationHref() {
  //   let pathname = window.location.pathname.match(/\/([^\/]+)\/?$/)[1];
  //   const weatherPath = window.location.pathname.match(/weather/g)[0];
  //   if (weatherPath === 'weather' && this.state.href == null) {
  //     this.setState({
  //       href: pathname
  //     });

  //     return pathname;
  //   } else if (this.state.href !== null) {
  //     return this.state.href;
  //   }
  // }

  // handleOnChange(event) {
  //   {
  //     console.log('select target: 🎽', event.target.value);
  //   }

  //   this.setState({
  //     href: `${event.target.value}`
  //   });
  //   navigate(`/weather/${event.target.value}`);

  //   return this.fetchWeatherData();
  // }
  render() {
    return (
      <div>
        {/* <WeatherContext.Provider value={this.state}> */}
        <Link to="/">
          <img
            src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg"
            alt=""
          />
        </Link>
        {/* <GeoLocation /> */}
        <WeatherHeader />
        <CollectionLink />
        <Routes />
        {/* </WeatherContext.Provider> */};
      </div>
    );
  }
}

export default App;
