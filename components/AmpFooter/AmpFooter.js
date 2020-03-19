/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Heading, Link } from '@apmg/titan';
import config from '../Footer/footerConfig';
import Logo from '../Logo/Logo';
import Icon from '../Icons/Icon';
import AmpFooterLower from './AmpFooterLower';
import AmpFooterProgramming from './AmpFooterProgramming';

const ampStyles = {
  footerUpper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButton: {
    display: 'flex',
    padding: '15px',
    backgroundColor: '#e5e6e6',
    border: '2px solid #cacdce',
    borderRadius: '3px',
    marginBottom: '25px',
    fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
    color: '#4a4e4f',
    fontWeight: 'bold',
    cursor: 'pointer',
    outline: '0',
    transition:
      'background-color 0.2s, border 0.2s, color 0.2s, box-shadow 0.2s'
  },
  footerLeft: {
    display: 'flex',
    flexDirection: 'column'
  },
  footerLink: {
    textDecoration: 'none'
  },
  invisible: { display: 'none' }
};

const AmpFooter = () => {
  return (
    <footer>
      <Link style={ampStyles.footerLink} href="/">
        <div style={ampStyles.footerUpper}>
          <div style={ampStyles.footerButton}>
            <div style={ampStyles.footerLeft}>
              <span>For more news, visit</span>
              <Logo width="175px" />
            </div>
            <Icon name="chevronRight" />
          </div>
        </div>
      </Link>
      <AmpFooterLower nav={config.nav} />
    </footer>
  );
};

export default AmpFooter;
