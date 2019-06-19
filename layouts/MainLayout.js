import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import AudioPlayer from '../components/AudioPlayer';

import '../styles/index.scss';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <AudioPlayer />
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
