import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import NavButtonContents from './NavButtonContents';
import Logo from './Logo';

const Nav = (props) => {
  return (
    <nav className="nav">
      <div className="nav_header">
        <Link to="/">
          <div className="header_logoImg">
            <Logo />
            <span className="invisible">MPR News</span>
          </div>
        </Link>
        <button className="nav_closeButton" onClick={props.closeMenu}>
          <NavButtonContents label="Close Menu" />
        </button>
      </div>
      <ul className="nav_list">
        {props.items.map((item, index) => (
          <li key={item + index} className="nav_item">
            <span className="nav_title">{item.linkgroup}</span>
            <ul className="nav_items">
              {item.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="nav_link">{link.text}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  closeMenu: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      linkgroup: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          class: PropTypes.string,
          href: PropTypes.string
        })
      )
    })
  )
};

export default Nav;
