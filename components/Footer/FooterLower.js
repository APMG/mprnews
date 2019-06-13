import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const FooterLower = (props) => {
  return (
    <div className="footer_lower">
      <div className="container">
        <div className="footer_lowerContent">
          <div className="footer_logo">
            <img
              src="/static/mpr-logo-footer.svg"
              alt="Minnesota Public Radio"
            />
          </div>
          <div className="footer_nav">
            <ul className="footer_navList">
              {props.nav.map((item) => (
                <li key={item.href} className="footer_navItem">
                  <Link href={item.href}>
                    <a className="footer_navLink">{item.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer_lowerSmall">
          <small className="footer_copyright">
            &copy; {new Date().getFullYear()} Minnesota Public Radio. All rights
            reserved.
          </small>{' '}
          <small className="footer_disclaimer">
            Weather data provided by the National Weather Service
          </small>
        </div>
      </div>
    </div>
  );
};

FooterLower.propTypes = {
  nav: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, href: PropTypes.string })
  )
};

export default FooterLower;
