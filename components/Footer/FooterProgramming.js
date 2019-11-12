import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { Heading, Button } from '@apmg/titan';
import { hrefType } from '../../utils/utils';

const FooterProgramming = (props) => {
  const openInNewWindow = () => {
    window.open('/listen', 'Listen Page', 'resizable,height=842,width=776');
  };
  return (
    <div className="footer_prog">
      <div className="footer_row">
        <Heading level={3} className="hdg hdg-5">
          {props.title}
        </Heading>
      </div>
      <div className="footer_progListen">
        <Button
          href={props.listenHref}
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            openInNewWindow();
          }}
        >
          {props.listenText}
        </Button>
      </div>
      <div className="footer_progLinks">
        <ul className="vList">
          {props.links.map((link) => {
            return (
              <li key={link.href}>
                <Link
                  href={hrefType(link)}
                  as={link.href}
                  className="link link-plain"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

FooterProgramming.defaultProps = {
  title: 'Program information'
};

FooterProgramming.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string
    })
  ),
  listenHref: PropTypes.string,
  listenText: PropTypes.string
};

export default FooterProgramming;
