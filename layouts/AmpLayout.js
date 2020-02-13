import React from 'react';
import PropTypes from 'prop-types';
import AmpHeader from '../components/AmpHeader/AmpHeader';
import AmpFooter from '../components/AmpFooter/AmpFooter';

import '../styles/index.scss';

const AmpLayout = ({ children }) => (
  <>
    <AmpHeader />
    <main className="main">
      <div className="container container-amp">{children}</div>
    </main>
    <AmpFooter />
  </>
);

AmpLayout.propTypes = {
  children: PropTypes.any
};

export default AmpLayout;
