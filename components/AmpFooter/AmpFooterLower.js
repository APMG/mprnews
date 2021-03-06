import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';

const ampStyles = {
  lowerFooter: {
    backgroundColor: '#4298b5',
    padding: '15px',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.1em',
    lineHeight: '1.4em',
    fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
  },
  footerColumns: {
    display: 'block',
    margin: '1em auto',
    columnCount: '4',
    columnWidth: '15em',
    columnGap: '1em',
  },
  footerLogo: {
    breakAfter: 'column',
  },
  footerNav: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  footerLink: {
    textDecoration: 'none',
    color: 'white',
  },
  footerItem: {
    fontSize: '90%',
    lineHeight: '1',
    margin: '0 0 1em',
    fontWeight: '700',
    textAlign: 'left',
    breakInside: 'avoid',
  },
  invisible: { display: 'none' },
};

const AmpFooterLower = (props) => {
  return (
    <div style={ampStyles.lowerFooter}>
      <div>
        <div style={ampStyles.footerColumns}>
          <div style={ampStyles.footerLogo}>
            <amp-img
              src="/mpr-logo-footer.svg"
              alt="Minnesota Public Radio"
              width="96"
              height="81"
            />
          </div>
          <nav>
            <ul style={ampStyles.footerNav}>
              {props.nav.map((item) => (
                <li style={ampStyles.footerItem} key={item.href}>
                  <Link style={ampStyles.footerLink} href={item.href}>
                    {item.label}
                  </Link>
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
  ),
};

export default AmpFooterLower;
