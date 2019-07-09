import React from 'react';
import PropTypes from 'prop-types';
import MinimalHeader from '../components/MinimalHeader/MinimalHeader';
import MinimalFooter from '../components/MinimalFooter/MinimalFooter';
// import Footer from '../components/Footer/Footer';

import '../styles/index.scss';

const AmpLayout = ({ children }) => (
  <>
    <MinimalHeader />
    <main className="main">
      <div className="container">{children}</div>
    </main>
    <MinimalFooter />
  </>
);

AmpLayout.propTypes = {
  children: PropTypes.any
};

export default AmpLayout;
