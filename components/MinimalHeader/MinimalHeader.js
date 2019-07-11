/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Logo from '../Logo/Logo';

const MinimalHeader = () => {
  const classes = classNames('header', 'header-minimal');

  return (
    <div className="headerContainer">
      <header className={classes}>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <a className="header_logo">
            <div className="header_logoImg">
              <Logo />
              <span className="invisible">MPR News</span>
            </div>
          </a>
        </Link>
      </header>
    </div>
  );
};

export default MinimalHeader;
