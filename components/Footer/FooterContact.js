import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Icon from '../Icons/Icon';

const FooterContact = (props) => {
  return (
    <div className="footer_contact">
      <Heading level={4} elementClass="invisible">
        Connect with us
      </Heading>
      <ul className="footer_contactGrid">
        {props.links.map((link) => {
          return (
            <li key={link.href}>
              <a href={link.href}>
                {link.icon && <Icon name={link.icon} />}
                {link.label}
              </a>
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
