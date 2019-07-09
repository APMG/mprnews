import React from 'react';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const AmpLayout = ({ children }) => <>{children}</>;

AmpLayout.propTypes = {
  children: PropTypes.any
};

export default AmpLayout;
