import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer/Footer';

import '../styles/index.scss';

const MainLayout = ({ children }) => (
  <>
    <main className="main">
      <div className="container">{children}</div>
    </main>
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.any
};

export default MainLayout;
