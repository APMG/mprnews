import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.path} page</h1>
      </div>
    );
  }
}

Event.propTypes = {
  path: PropTypes.string
};

export default Event;
