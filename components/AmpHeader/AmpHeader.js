import React from 'react';
import { Link } from '@apmg/titan';
import Logo from '../Logo/Logo';

const ampStyles = {
  header: {
    padding: '15px',
    borderBottom: '2px solid gray'
  },
  invisible: { display: 'none' }
};

const AmpHeader = () => {
  return (
    <header style={ampStyles.header}>
      <Link href="/">
        <div>
          <Logo />
          <span style={ampStyles.invisible}>MPR News</span>
        </div>
      </Link>
    </header>
  );
};

export default AmpHeader;
