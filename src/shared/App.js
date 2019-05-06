import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import WeatherHeader from './components/Weather/WeatherHeader';

class App extends Component {
  render() {
    return (
      <div>
        <img src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg" alt="" />
        <WeatherHeader />
        <Routes />
      </div>
    );
  }
}

export default App;
