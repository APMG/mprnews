import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';

const FooterApps = (props) => {
  return (
    <div className="footer_apps">
      <div className="footer_header">
        <Heading level={4}>{props.title}</Heading>
      </div>
      <div className="footer_appImg">
        <img src={props.imageSrc} alt="" />
      </div>
      <div className="footer_appList">
        <ul className="vList">
          {props.links.map((link) => {
            return (
              <li key={link.href}>
                <a href={link.href}>
                  {link.image ? (
                    <img src={link.image} alt={link.label} />
                  ) : (
                    <>{link.label}</>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

FooterApps.propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      image: PropTypes.string,
      label: PropTypes.string
    })
  )
};

export default FooterApps;
