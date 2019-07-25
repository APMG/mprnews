/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Dropdown from '../Dropdown';
import Logo from '../Logo/Logo';
import Nav from './Nav';
import WeatherHeader from '../WeatherHeader/WeatherHeader';
import { dropdownLists } from '../../utils/navConfig';
import NavButtonContents from './NavButtonContents';
import SearchForm from './SearchForm';

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
        <button type="button" className="header_navButton" onClick={toggleMenu}>
          <div className="navIcon">
            <span />
            <span />
            <span />
          </div>
          <span className="invisible">Menu</span>
        </button>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <a className="header_logo" onClick={closeMenu}>
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
          <nav className="nav">
            <div className="nav_header">
              <Link href="/">
                <a>
                  <div className="header_logoImg">
                    <Logo />
                    <span className="invisible">MPR News</span>
                  </div>
                </a>
              </Link>
              <button
                type="button"
                className="nav_closeButton"
                onClick={closeMenu}
              >
                <NavButtonContents label="Close Menu" />
              </button>
            </div>
            <Nav dropdownLists={dropdownLists} closeMenu={closeMenu} />
          </nav>
        </div>

        <WeatherHeader />
        <div className="header_search">
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Header;
