import React from 'react';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const MainLayout = ({ children }) => (
  <div className="main">
    <div className="container">{children}</div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.any
};

export default MainLayout;
