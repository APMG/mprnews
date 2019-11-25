import React from 'react';
import config from './footerConfig';
import { Heading } from '@apmg/titan';
import FooterContact from './FooterContact';
import FooterLower from './FooterLower';
import FooterPodcasts from './FooterPodcasts';
import FooterSubscribe from './FooterSubscribe';
import FooterProgramming from './FooterProgramming';

const Footer = () => {
  return (
    <footer className="footer">
      <Heading level={2} className="invisible">
        About MPR News
      </Heading>
      <div className="footer_upper">
        <FooterPodcasts
          title={config.podcastTitle}
          href={config.podcastLinkHref}
          text={config.podcastText}
          linkLabel={config.podcastLinkLabel}
        />
        <FooterContact links={config.contact} />
        <FooterSubscribe />
        <FooterProgramming
          listenText={config.listenText}
          listenHref={config.listenHref}
          links={config.programmingLinks}
          title={config.programmingTitle}
        />
      </div>
      <FooterLower nav={config.nav} />
    </footer>
  );
};

export default Footer;
