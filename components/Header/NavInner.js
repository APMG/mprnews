import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const NavInner = (props) => {
  return (
    <>
      <ul className="nav_list">
        {props.groups.map((item, index) => (
          <li key={index} className="nav_item">
            <span className="nav_title">{item.linkgroup}</span>
            <ul className="nav_items">
              {item.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={`collection?slug=${link.href}`}
                    as={`/${link.href}`}
                  >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid*/}
                    <a className="nav_link" onClick={props.closeMenu}>
                      {link.text}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

NavInner.propTypes = {
  groups: PropTypes.array,
  closeMenu: PropTypes.func
};

export default NavInner;
