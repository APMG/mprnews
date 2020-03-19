import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';

const ampStyles = {
  lowerFooter: {
    backgroundColor: '#4298b5',
    padding: '15px',
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: '1.1em',
    lineHeight: '1.4em',
    fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  flexItem: {
    minWidth: '300px'
  },
  footerFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  footerNav: {
    listStyle: 'none',
    marginLeft: '-30px'
  },
  footerLink: {
    textDecoration: 'none',
    color: 'white'
  },
  footerItem: {
    width: '275px'
  },
  invisible: { display: 'none' }
};

const AmpFooterLower = (props) => {
  let firstNav = props.nav.slice(0, 3);
  let secondNav = props.nav.slice(3, 6);
  let thirdNav = props.nav.slice(6, 9);

  return (
    <div style={ampStyles.lowerFooter}>
      <div>
        <div style={ampStyles.footerFlex}>
          <div style={ampStyles.flexItem}>
            <amp-img
              src="/mpr-logo-footer.svg"
              alt="Minnesota Public Radio"
              width="96"
              height="81"
            />
          </div>
          <nav style={ampStyles.flexItem}>
            <div style={ampStyles.footerFlex}>
              <ul style={ampStyles.footerNav}>
                {firstNav.map((item) => (
                  <li style={ampStyles.footerItem} key={item.href}>
                    <Link style={ampStyles.footerLink} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul style={ampStyles.footerNav}>
                {secondNav.map((item) => (
                  <li style={ampStyles.footerItem} key={item.href}>
                    <Link style={ampStyles.footerLink} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul style={ampStyles.footerNav}>
                {thirdNav.map((item) => (
                  <li style={ampStyles.footerItem} key={item.href}>
                    <Link style={ampStyles.footerLink} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div>
          <small>
            &copy; {new Date().getFullYear()} Minnesota Public Radio. All rights
            reserved.
          </small>{' '}
          <small>Weather data provided by the National Weather Service</small>
        </div>
      </div>
    </div>
  );
};

AmpFooterLower.propTypes = {
  nav: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, href: PropTypes.string })
  )
};

export default AmpFooterLower;
