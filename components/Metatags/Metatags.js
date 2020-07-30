import React from 'react';
import PropTypes from 'prop-types';
import { JsonLd } from 'react-schemaorg';
import { globals } from '../../config/globals';
import Head from 'next/head';

const Metatags = (props) => {
  const combinedTitle = props.title
    ? `${props.title} | ${globals.siteName}`
    : globals.siteName;
  const fullUrl = props.fullSlug
    ? `${globals.hostnameProd}/${props.fullSlug}`
    : null;
  const canonicalUrl = props.originalSourceUrl
    ? props.originalSourceUrl
    : fullUrl;
  const socialTitle = props.shortTitle ? props.shortTitle : props.title;
  const authors = props.authors
    ? props.authors.reduce((acc = [], curr) => {
        acc.push({ '@type': 'Person', name: curr.title });
        return acc;
      }, [])
    : [{ '@type': 'Organization', name: 'MPR News' }];
  const datePublished = props.publishDate?.props?.dateTime;
  const dateModified = props.updatedAt?.props?.dateTime || datePublished;

  return (
    <Head>
      <title>{combinedTitle}</title>

      {/* Google Rich Results */}
      {props.contentType === 'article' && (
        <>
          <JsonLd
            item={{
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl,
              },
              headline: props.title,
              image: [props.image],
              datePublished: datePublished,
              dateModified: dateModified,
              description: props.description.trim(),
              author: authors.length > 1 ? authors : authors[0],
              publisher: {
                '@type': 'Organization',
                name: 'MPR News',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.mprnews.org/opengraph-fallback.png',
                },
              },
            }}
          />
        </>
      )}

      {props.noFollow && <meta name="robots" content="noindex,nofollow" />}
      {props.topic && (
        <meta
          name="mpr-content-topic"
          content={props.topic}
          key="mpr-content-topic"
        />
      )}

      {socialTitle && (
        <>
          <meta name="title" content={socialTitle} key="title" />
          <meta
            name="twitter:title"
            content={socialTitle}
            key="twitter:title"
          />
          <meta property="og:title" content={socialTitle} key="og:title" />
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

      {canonicalUrl && (
        <>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" content={canonicalUrl} key="og:url" />
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
  shortTitle: PropTypes.string,
  rssUrl: PropTypes.string,
  topic: PropTypes.string,
  publishDate: PropTypes.string,
  updatedAt: PropTypes.string,
  authors: PropTypes.array,
  noFollow: PropTypes.bool,
  originalSourceUrl: PropTypes.string,
};

export default React.memo(Metatags);
