import React from 'react';
import PropTypes from 'prop-types';
import { globals } from '../../config/globals';
import Head from 'next/head';
import JsonLd from './JsonLd';

const Metatags = (props) => {
  const combinedTitle = props.title
    ? `${props.title} | ${globals.siteName}`
    : globals.siteName;
  const fullUrl = props.fullSlug
    ? `${globals.hostnameProd}/${props.fullSlug}`
    : null;

  return (
    <Head>
      <title>{combinedTitle}</title>
      {props.noFollow && <meta name="robots" content="noindex,nofollow" />}
      {props.topic && (
        <meta
          name="mpr-content-topic"
          content={props.topic}
          key="mpr-content-topic"
        />
      )}

      {props.title && (
        <>
          <meta name="title" content={props.title} key="title" />
          <meta
            name="twitter:title"
            content={props.title}
            key="twitter:title"
          />
          <meta property="og:title" content={props.title} key="og:title" />
        </>
      )}

      {props.description && (
        <>
          <meta
            name="description"
            content={props.description.trim()}
            key="description"
          />
          <meta
            name="twitter:description"
            content={props.description.trim()}
            key="twitter:description"
          />
          <meta
            property="og:description"
            content={props.description.trim()}
            key="og:description"
          />
        </>
      )}

      {props.rssUrl && (
        <link
          title={props.title}
          href={props.rssUrl}
          rel="alternate"
          type="application/rss+xml"
        />
      )}

      {props.image && (
        <>
          <meta
            name="twitter:image"
            content={props.image}
            key="twitter:image"
          />
          <meta property="og:image" content={props.image} key="og:image" />
        </>
      )}

      {props.imageWidth && (
        <meta property="og:image:width" content={props.imageWidth} />
      )}
      {props.imageHeight && (
        <meta property="og:image:height" content={props.imageHeight} />
      )}

      {props.imageAlt && (
        <meta name="twitter:image:alt" content={props.imageAlt} />
      )}

      {props.originalSourceUrl && (
        <link rel="canonical" href={props.originalSourceUrl} />
      )}

      {props.fullSlug && (
        <>
          <link rel="canonical" href={fullUrl} key="canonical" />
          <meta property="og:url" content={fullUrl} key="og:url" />
        </>
      )}

      {props.contentType && (
        <meta property="og:type" content={props.contentType} key="og:type" />
      )}

      {props.isAmp && props.fullSlug && (
        <link
          rel="amphtml"
          href={`${globals.hostnameProd}/amp/${props.fullSlug}`}
          key="amphtml"
        />
      )}

      {/* Twitter do not track */}
      <meta name="twitter:dnt" content="on" />

      {/* Google Search Console/Webmaster Tools Verifications */}
      <meta
        name="google-site-verification"
        content="3mdQkyZQ0hy2oLHqV_shtyaKyvb-xVslxgr2kdV8RQw"
      />

      {/* FB app ID */}
      <meta property="fb:pages" content="99142348590" />

      {/* Any custom meta tags */}
      {props.children}
      {props.contentType === 'article' && (
        <JsonLd
          title={props.title}
          fullSlug={props.fullSlug}
          description={props.description}
          image={props.image}
          contentType="NewsArticle"
          publishDate={props.publishDate}
          modifiedDate={props.modifiedDate}
          authors={props.authors}
        />
      )}
    </Head>
  );
};

Metatags.propTypes = {
  fullSlug: PropTypes.string, // This should include any routing prefixes, e.g. '/story'
  children: PropTypes.node,
  contentType: PropTypes.oneOf(['article', 'profile', 'website']),
  description: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  isAmp: PropTypes.bool,
  title: PropTypes.string,
  rssUrl: PropTypes.string,
  topic: PropTypes.string,
  publishDate: PropTypes.string,
  modifiedDate: PropTypes.string,
  authors: PropTypes.array,
  noFollow: PropTypes.bool,
  originalSourceUrl: PropTypes.string
};

export default React.memo(Metatags);
