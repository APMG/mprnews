import React from 'react';
import PropTypes from 'prop-types';

export default function NotFound(props) {
  return <h1>{`URL ${props.uri} Not Found. 404.`}</h1>;
}

NotFound.propTypes = {
  uri: PropTypes.string
};
