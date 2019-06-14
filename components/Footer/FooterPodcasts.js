import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Icon from '../Icons/Icon';
import Link from 'next/link';

const FooterPodcasts = (props) => {
  return (
    <div className="footer_podcasts">
      <div className="footer_row">
        <Heading level={3} className="hdg hdg-5">
          <Link href={props.href}>
            <a>{props.title}</a>
          </Link>
        </Heading>
      </div>
      <div className="footer_row">
        <div className="footer_podcastText">
          <p>{props.text}</p>
        </div>
      </div>
      <div className="footer_footer">
        <Link href={props.href}>
          <a className="link link-plain text-bold">
            {props.linkLabel}
            <Icon name="chevronRight" />
          </a>
        </Link>
      </div>
    </div>
  );
};

FooterPodcasts.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
  linkLabel: PropTypes.string
};

export default FooterPodcasts;
