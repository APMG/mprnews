import React from 'react';
import { Link } from '@apmg/titan';
import Logo from '../Logo/Logo';

const ampStyles = {
  header: {
    padding: '15px',
    borderBottom: '2px solid gray'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  invisible: { display: 'none' }
};

const AmpHeader = () => {
  return (
    <header style={ampStyles.header}>
      <Link href="/">
        <div style={ampStyles.logo}>
          <Logo width="171px" height="24px" />
          <span style={ampStyles.invisible}>MPR News</span>
        </div>
      </Link>
    </header>
  );
};

export default AmpHeader;
