import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Heading, Button } from '@apmg/titan';
import { hrefType } from '../../utils/utils';

const FooterProgramming = (props) => {
  const openInNewTab = () => {
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
        <Link href={props.listenHref}>
          <Button
            href="/listen"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              openInNewTab();
            }}
          >
            {props.listenText}
          </Button>
        </Link>
      </div>
      <div className="footer_progLinks">
        <ul className="vList">
          {props.links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={hrefType(link)} as={link.href}>
                  <a className="link link-plain">{link.label}</a>
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
