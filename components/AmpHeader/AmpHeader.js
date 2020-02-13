/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from '@apmg/titan';
import classNames from 'classnames';
import Logo from '../Logo/Logo';

const AmpHeader = () => {
  const classes = classNames('header', 'header-minimal');

  return (
    <div className="headerContainer">
      <header className={classes}>
        <Link href="/" className="header_logo">
          <div className="header_logoImg">
            <Logo />
            <span className="invisible">MPR News</span>
          </div>
        </Link>
      </header>
    </div>
  );
};

export default AmpHeader;
