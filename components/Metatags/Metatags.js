import React from 'react';
import PropTypes from 'prop-types';
import { globals } from '../../config/globals';
import Head from 'next/head';

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
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.string,
  isAmp: PropTypes.bool,
  title: PropTypes.string,
  topic: PropTypes.string
};

export default React.memo(Metatags);
