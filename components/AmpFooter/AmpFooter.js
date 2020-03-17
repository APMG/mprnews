/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Heading, Link } from '@apmg/titan';
import config from '../Footer/footerConfig';
import AmpFooterLower from './AmpFooterLower';
import AmpFooterProgramming from './AmpFooterProgramming';

const ampStyles = {
  header: {
    padding: '15px',
    borderBottom: '2px solid gray'
  },
  footerPodcasts: {
    maxWidth: '400px'
  },
  footerConnect: {
    minWidth: '300px'
  },
  footerProgramming: {
    minWidth: '300px'
  },
  footerUpper: {
    backgroundColor: '#c2f2ff',
    padding: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  list: {
    listStyle: 'none',
    marginLeft: '-45px'
  },
  invisible: { display: 'none' },
  icon: { height: '15px' }
};

const AmpFooter = () => {
  return (
    <footer>
      <div style={ampStyles.footerUpper}>
        <div style={ampStyles.footerPodcasts}>
          <div>
            <Heading level={3}>
              <Link href="/[...slug]" as={config.podcastLinkHref}>
                {config.podcastTitle}
              </Link>
            </Heading>
          </div>
          <div>
            <div>
              <p>{config.podcastText}</p>
            </div>
          </div>
        </div>
        <div style={ampStyles.footerConnect}>
          <div>
            <Heading level={3} elementClass="hdg hdg-5">
              Connect with us
            </Heading>
          </div>
          <ul style={ampStyles.list}>
            {config.contact.map((link) => {
              return (
                <li key={link.href}>
                  {link.href.startsWith('mailto:') ||
                  link.href.startsWith('tel:') ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link href="/newsletter">
            <a href="/newsletter">Subscribe to email newsletters</a>
          </Link>
        </div>
        <AmpFooterProgramming
          listenText={config.listenText}
          listenHref={config.listenHref}
          links={config.programmingLinks}
          title={config.programmingTitle}
        />
      </div>
      <AmpFooterLower nav={config.nav} />
    </footer>
  );
};

export default AmpFooter;
