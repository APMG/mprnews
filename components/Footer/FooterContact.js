import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Link from 'next/link';
import Icon from '../Icons/Icon';

const FooterContact = (props) => {
  return (
    <div className="footer_contact">
      <div className="footer_row">
        <Heading level={3} elementClass="hdg hdg-5">
          Connect with us
        </Heading>
      </div>
      <ul className="footer_contactList">
        {props.links.map((link) => {
          return (
            <li key={link.href}>
              <Link href={link.href}>
                <a className="link link-plain">
                  {link.icon && <Icon name={link.icon} />} {link.label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FooterContact.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      icon: PropTypes.string,
      label: PropTypes.string
    })
  )
};

export default FooterContact;
