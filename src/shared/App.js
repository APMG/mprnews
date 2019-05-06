import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';
import RestApiHooksComponent from './components/Weather/WeatherHeader';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img
            src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg"
            alt=""
          />
        </Link>
        <img src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg" alt="" />
        <RestApiHooksComponent />
        <Routes />
      </div>
    );
  }
}

export default App;
