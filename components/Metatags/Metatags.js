import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import fallback_image from '../../static/opengraph-fallback.png';
import faviconpng from '../../static/favicon.png';
import favicon from '../../static/favicon.ico';
import appletouch from '../../static/apple-touch-icon.png';

const Metatags = (props) => {
  const metaDefaults = [
    {
      key: 'viewport',
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0'
    },
    { key: 'charSet', charSet: 'utf-8' },
    {
      key: 'X-UA-Compatible',
      httpEquiv: 'X-UA-Compatible',
      content: 'IE=edge,chrome=1'
    },
    { key: 'mpr-site', name: 'mpr-site', content: 'news' },
    { key: 'twitter:site', name: 'twitter:site', content: '@mprnews' },
    { key: 'twitter:widgets:csp', name: 'twitter:widgets:csp', content: 'on' },
    { key: 'twitter:card', name: 'twitter:card', content: 'summary' },
    {
      key: 'twitter:image',
      name: 'twitter:image',
      content: fallback_image
    },
    { key: 'og:image', name: 'og:image', content: fallback_image }
  ];
  const linkDefaults = [];
  const favicons = [
    { key: 'icon', rel: 'icon', type: 'image/png', href: faviconpng },
    {
      key: 'image/x-icon',
      rel: 'shortcut icon',
      href: favicon,
      type: 'image/x-icon'
    },
    { key: 'apple-touch-icon', rel: 'apple-touch-icon', href: appletouch }
  ];
  // dedupe
  const metatags = metaDefaults.map((row) =>
    Object.assign(row, props.metatags.find((rec) => rec.key == row.key))
  );
  const links = linkDefaults.map((row) =>
    Object.assign(row, props.links.find((rec) => rec.key == row.key))
  );
  return (
    <Head>
      {metatags.map((tag) => {
        return <meta key={tag.key} {...tag} />;
      })}

      {favicons.map((link) => {
        return <link key={link.key} {...link} />;
      })}

      {links.map((link) => {
        return <link key={link.key} {...link} />;
      })}

      <title>{`${props.title} | MPR News`}</title>
    </Head>
  );
};

Metatags.propTypes = {
  metatags: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default Metatags;
