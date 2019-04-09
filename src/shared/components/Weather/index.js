import React from 'react';
import PropTypes from 'prop-types';

class Weather extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.path} page</h1>
      </div>
    );
  }
}

Weather.propTypes = {
  path: PropTypes.string
};

export default Weather;
