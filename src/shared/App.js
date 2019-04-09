import React, { Component } from 'react';
import Routes from './routes';
import PropTypes from 'prop-types';
import SiteConfigContext from './SiteConfigContext';

class App extends Component {
  render() {
    return (
      <div>
        <img src="//mpr.apmcdn.org/news/1550179261168/img/mprnews.svg" alt="" />
        <SiteConfigContext.Provider>
          <Routes />
        </SiteConfigContext.Provider>
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
