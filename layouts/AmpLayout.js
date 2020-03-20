import React from 'react';
import PropTypes from 'prop-types';
import AmpHeader from '../components/AmpHeader/AmpHeader';
import AmpFooter from '../components/AmpFooter/AmpFooter';

const ampStyles = {
  ampContainer: {
    margin: '25px'
  }
};

const AmpLayout = ({ children }) => (
  <>
    <AmpHeader />
    <main>
      <div style={ampStyles.ampContainer}>{children}</div>
    </main>
    <AmpFooter />
  </>
);

AmpLayout.propTypes = {
  children: PropTypes.any
};

export default AmpLayout;
