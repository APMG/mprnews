import React from 'react';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const Main = ({ children }) => <main>{children}</main>;

Main.propTypes = {
  children: PropTypes.any
};

export default Main;
