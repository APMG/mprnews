import React from 'react';
import config from './footerConfig';
import FooterApps from './FooterApps';
import FooterContact from './FooterContact';
import FooterLower from './FooterLower';
import FooterPodcasts from './FooterPodcasts';
import FooterSubscribe from './FooterSubscribe';
import FooterProgramming from './FooterProgramming';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_upper">
        <FooterApps
          title={config.appsTitle}
          imageSrc={config.appsImg}
          links={config.apps}
        />
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
        />
      </div>
      <FooterLower nav={config.nav} />
    </footer>
  );
};

export default Footer;
