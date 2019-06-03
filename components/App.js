import React from 'react';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const App = ({ children }) => <main>{children}</main>;

App.propTypes = {
  children: PropTypes.any
};

export default App;
