import React, { Component } from 'react';
import Routes from '../shared/routes/routes';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';
import WeatherHeader from './components/Weather/WeatherHeader';
import CollectionLink from './components/Collection/CollectionLink';

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
        <WeatherHeader />
        <CollectionLink />
        <Routes />
      </div>
    );
  }
}

export default App;
