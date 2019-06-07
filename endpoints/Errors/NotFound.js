import React from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => {
  return <h1>{`404 - URL ${props.uri} not found.`}</h1>;
};

NotFound.propTypes = {
  uri: PropTypes.string
};

export default NotFound;
