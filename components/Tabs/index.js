import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  return (
    <ul className="tabs">
      {props.links.map((lnk) => {
        return (
          <li key={lnk.key} className="tabs_item">
            <Link href={lnk.href}>
              <a className={lnk.isActive ? 'tabs_link is-active' : 'tabs_link'}>
                {lnk.key}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

Tabs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      href: PropTypes.string
    })
  )
};
export default Tabs;
