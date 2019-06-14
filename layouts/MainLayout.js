import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import '../styles/index.scss';

const MainLayout = ({ children }) => (
  <>
    <Header />
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
