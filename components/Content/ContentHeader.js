import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Heading, TagLink } from '@apmg/titan';
import { format } from 'date-fns';

const ContentHeader = ({
  tag,
  headingLevel,
  title,
  subtitle,
  authors,
  publishDate
}) => {
  return (
    <header className="content_header">
      {tag && (
        <div className="content_topic">
          <TagLink
            to={tag.to}
            tagName={tag.tagName}
            elementClass="link link-none"
          />
        </div>
      )}

      <Heading level={headingLevel ? headingLevel : 1} className="hdg hdg-1">
        {title}
      </Heading>

      {subtitle && (
        <p className="content_subtitle" data-testid="contentSubtitle">
          {subtitle}
        </p>
      )}

      <div className="content_meta">
        {authors && (
          <div className="content_byline" data-testid="contentByline">
            {authors.map((author) => {
              return (
                <Link href={author.href} key={author.href}>
                  <a className="link link-none">{`${author.name} `}</a>
                </Link>
              );
            })}
          </div>
        )}

        {publishDate && (
          <time className="content_pubdate" dateTime={publishDate}>
            {format(publishDate, 'MMMM D, YYYY')}
          </time>
        )}
      </div>
    </header>
  );
};

ContentHeader.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    })
  ),
  headingLevel: PropTypes.number,
  publishDate: PropTypes.string,
  subtitle: PropTypes.string,
  tag: PropTypes.shape({
    to: PropTypes.string,
    tagName: PropTypes.string
  }),
  title: PropTypes.string.isRequired
};

export default ContentHeader;
