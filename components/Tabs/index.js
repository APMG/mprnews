import React from 'react';
import { Link } from '@apmg/titan';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  return (
    <ul className="tabs">
      {props.links.map((lnk) => {
        return (
          <li key={lnk.key} className="tabs_item">
            <Link
              href={`/schedule?slug=${lnk.href}`}
              as={`/schedule/${lnk.href}`}
              className={`tabs_link ${lnk.isActive && `is-active`}`}
            >
              {lnk.key}
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
