import React from 'react';
import Head from 'next/head';
import { globals } from '../../config/globals';

const AmpHead = () => {
  const defaultTitle = globals.siteName;

  return (
    <Head>
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge,chrome=1"
        key="httpEquiv"
      />

      <title>{defaultTitle}</title>

      <meta name="mpr-site" content="news" key="mpr-site" />
      <meta name="title" content={defaultTitle} key="title" />
      <meta
        name="description"
        content={globals.siteDescription}
        key="description"
      />

      {/* Twitter */}
      <meta name="twitter:site" content="@MPRNews" key="twitter:site" />
      <meta name="twitter:widgets:csp" content="on" key="twitter:widgets:csp" />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:title" content={defaultTitle} key="twitter:title" />
      <meta
        name="twitter:image"
        content="https://www.mprnews.org/opengraph-fallback.png"
        key="twitter:image"
      />

      {/* Opengraph */}
      <meta
        property="og:site_name"
        content={globals.siteName}
        key="og:site_name"
      />
      <meta property="og:title" content={defaultTitle} key="og:title" />
      <meta
        property="og:image"
        content="https://www.mprnews.org/opengraph-fallback.png"
        key="og:image"
      />
      <meta
        property="og:description"
        content={globals.siteDescription}
        key="og:description"
      />
      <meta property="og:type" content="website" key="og:type" />

      {/* Favicons */}
      <link rel="icon" type="image/png" href="/favicon.png" key="icon" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/favicon.ico"
        key="shortcut icon"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        key="apple-touch-icon"
      />

      {/* Other assets */}
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif:400,400i|Roboto+Condensed:400,700|Roboto:400,700&display=swap&subset=latin-ext"
        rel="stylesheet"
      />
    </Head>
  );
};

export default React.memo(AmpHead);
