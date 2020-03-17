import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';

const ampStyles = {
  lowerFooter: {
    backgroundColor: '#4298b5',
    padding: '15px',
    textAlign: 'center'
  },
  flexItem: {
    minWidth: '300px'
  },
  footerFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerNav: {
    listStyle: 'none',
    marginLeft: '-30px'
  },
  invisible: { display: 'none' }
};

const AmpFooterLower = (props) => {
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
            <ul style={ampStyles.footerNav}>
              {props.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
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
