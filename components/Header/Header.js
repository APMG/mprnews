/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Dropdown from '../Dropdown';
import Logo from './Logo';
import Nav from './Nav';
import { navItems } from './NavItems';
import WeatherHeader from '../WeatherHeader/index';
import Icon from '../Icons/Icon';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerClasses = classNames('header', {
    'is-open': menuOpen,
    'is-closed': !menuOpen
  });

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="headerContainer">
      <header className={headerClasses} data-testid="header">
        <button className="header_navButton" onClick={toggleMenu}>
          <div className="navIcon">
            <span />
            <span />
            <span />
          </div>
          <span className="invisible">Menu</span>
        </button>
        <Link href="/" onClick={closeMenu}>
          <a className="header_logo" data-testid="header-logo">
            <div className="header_logoImg">
              <Logo />
              <span className="invisible">MPR News</span>
            </div>
          </a>
        </Link>

        {/* disabling these eslint jsx-a11y features because this element is for convenience; the menu can still be closed through other means */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="header_navBg"
          data-testid="header-closenav"
          onClick={closeMenu}
        />
        <div className="header_nav">
          <Dropdown />
          <Nav items={navItems} closeMenu={closeMenu} />
        </div>

        <WeatherHeader />
        <div className="header_search ">
          <Icon elementClass="icon-search" name="search" />
        </div>
      </header>
    </div>
  );
};

export default Header;
