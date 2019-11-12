/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from '@apmg/titan';
import classNames from 'classnames';
import Logo from '../Logo/Logo';

const MinimalHeader = () => {
  const classes = classNames('header', 'header-minimal');

  return (
    <div className="headerContainer">
      <header className={classes}>
        <Link href="/" className="header_logo">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="header_logoImg">
            <Logo />
            <span className="invisible">MPR News</span>
          </div>
        </Link>
      </header>
    </div>
  );
};

export default MinimalHeader;
