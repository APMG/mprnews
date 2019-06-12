import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Link from 'next/link';

const FooterPodcasts = (props) => {
  return (
    <div className="footer_podcasts">
      <div className="footer_header">
        <Heading level={4}>
          <Link href={props.href}>
            <a>{props.title}</a>
          </Link>
        </Heading>
      </div>
      <div className="footer_podcastText">
        <p>{props.text}</p>
      </div>
      <Link href={props.href}>
        <a>{props.linkLabel}</a>
      </Link>
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
