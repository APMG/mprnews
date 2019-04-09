import React from 'react';
import PropTypes from 'prop-types';

class Story extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.path} page</h1>
      </div>
    );
  }
}

Story.propTypes = {
  path: PropTypes.string
};

export default Story;
