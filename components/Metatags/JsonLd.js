import React from 'react';
import PropTypes from 'prop-types';
import { globals } from '../../config/globals';
import fallback_image from '../../static/opengraph-fallback.png';

const JsonLd = (props) => {
  const fullUrl = props.fullSlug
    ? `${globals.hostnameProd}/${props.fullSlug}`
    : null;
  let authors = props.authors.map((author) => {
    return `"author" : {
                "@type": "Person",
                "name": ${author.title}
             }`;
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `{
                    "@context": "https://schema.org",
                    "@type": ${props.contentType},
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": ${fullUrl}
                    },
                    "headline": ${props.title},
                    "image": [ ${props.image}],
                    "datePublished": ${props.publishDate},
                    "dateModified": ${props.updatedAt || props.publishDate},
                    "description": ${props.description},
                    ${authors},
                    "publisher": {
                      "@type": "Organization",
                      "name": "MPR News",
                      "logo": {
                      "@type": "ImageObject",
                      "url": ${globals.hostnameProd}${fallback_image}
                      }
                    }
                  }`
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
  authors: PropTypes.array
};
export default JsonLd;
