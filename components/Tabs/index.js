import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  return (
    <ul className="tabs">
      {props.links.map((lnk) => {
        return (
          <li key={lnk.key} className="tabs_item">
            <a
              href={`/schedule?slug=${lnk.href}`}
              className={`tabs_link ${lnk.isActive && `is-active`}`}
            >
              {lnk.key}
            </a>
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
