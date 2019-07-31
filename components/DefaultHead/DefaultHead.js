import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { globals } from '../../config/globals';
import fallbackImage from '../../static/opengraph-fallback.png';
import faviconpng from '../../static/favicon.png';
import favicon from '../../static/favicon.ico';
import appletouch from '../../static/apple-touch-icon.png';

const DefaultHead = (props) => {
  const combinedTitle = props.title
    ? `${props.title} | ${globals.siteName}`
    : globals.siteName;

  const gtmId = 'GTM-KTT2Z2';
  const gtmScriptHtml = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
      {'gtm.start': new Date().getTime(),event:'gtm.js'}
    );
    var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
    j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${gtmId}');`;
  const createScript = () => {
    return { __html: gtmScriptHtml };
  };

  return (
    <Head>
      <meta charSet="utf-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0"
        key="viewport"
      />
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge,chrome=1"
        key="httpEquiv"
      />

      <title>{combinedTitle}</title>

      <meta name="mpr-site" content="news" key="mpr-site" />
      <meta name="title" content={combinedTitle} key="title" />
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
      <meta name="twitter:title" content={combinedTitle} key="twitter:title" />
      <meta name="twitter:image" content={fallbackImage} key="twitter:image" />

      {/* Opengraph */}
      <meta
        property="og:site_name"
        content={globals.siteName}
        key="og:site_name"
      />
      <meta property="og:title" content={combinedTitle} key="og:title" />
      <meta property="og:image" content={fallbackImage} key="og:image" />
      <meta
        property="og:description"
        content={globals.siteDescription}
        key="og:description"
      />
      <meta property="og:type" content="website" key="og:type" />

      {/* Favicons */}
      <link rel="icon" type="image/png" href={faviconpng} key="icon" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={favicon}
        key="shortcut icon"
      />
      <link rel="apple-touch-icon" href={appletouch} key="apple-touch-icon" />

      {/* Other assets */}
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif:400,400i|Roboto+Condensed:700|Roboto:400,700&display=swap&subset=latin-ext"
        rel="stylesheet"
      />
      <script dangerouslySetInnerHTML={createScript()}></script>
    </Head>
  );
};

DefaultHead.propTypes = {
  title: PropTypes.string
};

export default React.memo(DefaultHead);
