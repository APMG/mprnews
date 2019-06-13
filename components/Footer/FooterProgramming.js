import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Heading } from '@apmg/titan';

const FooterProgramming = (props) => {
  return (
    <div className="footer_prog">
      <Heading level={4} className="invisible">
        {props.title}
      </Heading>
      <div className="footer_progListen">
        <Button href={props.listenHref} type="primary">
          {props.listenText}
        </Button>
      </div>
      <ul className="vList">
        {props.links.map((link) => {
          return (
            <li key={link.href}>
              <Link href={link.href}>
                <a>{link.label}</a>
              </Link>
            </li>
          );
        })}
      </ul>
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
