import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { Heading } from '@apmg/titan';

const FooterLower = (props) => {
  return (
    <div className="footer_lower">
      <Heading level={3} className="invisible">
        Additional Information
      </Heading>
      <div className="container">
        <div className="footer_lowerContent">
          <div className="footer_logo">
            <img src="/mpr-logo-footer.svg" alt="Minnesota Public Radio" />
          </div>
          <nav className="footer_nav">
            <ul className="footer_navList">
              {props.nav.map((item) => (
                <li key={item.href} className="footer_navItem">
                  <Link href={item.href} className="footer_navLink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
