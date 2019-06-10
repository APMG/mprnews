import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';

import '../styles/index.scss';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="main">
      <div className="container">{children}</div>
    </div>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.any
};

export default MainLayout;
