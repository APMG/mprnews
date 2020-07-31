import React from 'react';
import PropTypes from 'prop-types';
import { globals } from '../../config/globals';

const JsonLd = (props) => {
  const authors = props.authors
    ? props.authors.reduce((acc = [], curr) => {
        acc.push({ '@type': 'Person', name: curr.title });
        return acc;
      }, [])
    : [{ '@type': 'Organization', name: 'MPR News' }];

  const fullUrl = props.fullSlug
    ? `${globals.hostnameProd}/${props.fullSlug}`
    : '';

  const metadata = {
    '@context': 'https://schema.org',
    '@type': props.contentType,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    headline: props.title,
    image: [props.image],
    datePublished: props.publishDate,
    dateModified: props.updatedAt || props.publishDate,
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(metadata),
      }}
    />
  );
};

JsonLd.propTypes = {
  contentType: PropTypes.string,
  fullSlug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  publishDate: PropTypes.string,
  updatedAt: PropTypes.string,
  authors: PropTypes.array,
};
export default JsonLd;
