import React from 'react';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const Main = ({ children }) => (
  <div className="main">
    <div className="container">{children}</div>
  </div>
);

Main.propTypes = {
  children: PropTypes.any
};

export default Main;
