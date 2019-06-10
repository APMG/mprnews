import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Nav from './Nav';
import Logo from './Logo';
import WeatherHeader from '../WeatherHeader/index';
import Icon from '../Icons/Icon';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // Mobile menu state
    this.state = {
      menuOpen: false
    };
  }

  // Toggle mobile menu
  toggleMenu = () => {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  };

  // Close mobile menu
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    // Mobile menu classes
    const headerClasses = classNames('header', {
      'is-open': this.state.menuOpen,
      'is-closed': !this.state.menuOpen
    });

    const items = [{ text: 'Sections' }, { text: 'Members' }, { text: 'More' }];

    return (
      <div className="headerContainer">
        <header className={headerClasses} data-testid="header">
          <button className="header_navButton" onClick={this.toggleMenu}>
            <div className="navIcon">
              <span />
              <span />
              <span />
            </div>
            <span className="invisible">Menu</span>
          </button>
          <Link href="/" onClick={this.closeMenu}>
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
            onClick={this.closeMenu}
          />
          <div className="header_nav">
            <Nav items={items} />
          </div>

          <WeatherHeader />
          <div className="header_search ">
            <Icon elementClass="icon-search" name="search" />
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
