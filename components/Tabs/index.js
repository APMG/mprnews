import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  return (
    <ul className="tabs">
      {props.links.map((lnk) => {
        return (
          <li key={lnk}>
            <Link href={`/schedule/${lnk}`}>
              <a className={props.className}>{lnk.toUpperCase()}</a>
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
      className: PropTypes.string
    })
  )
};
export default Tabs;
