import React, { Component } from 'react';
import Routes from '../shared/routes';
import PropTypes from 'prop-types';
import '../shared/styles/index.scss';
import { Link } from 'apm-titan';

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
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  headers: PropTypes.shape({
    host: PropTypes.string
  })
};

export default App;
