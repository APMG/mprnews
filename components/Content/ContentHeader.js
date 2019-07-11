import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Link from 'next/link';
import { format } from 'date-fns';
import Byline from '../Byline/Byline';

const ContentHeader = (props) => {
  let authorsTag = [];

  if (props.authors?.length > 0) {
    props.authors.forEach((author) => {
      authorsTag.push(author.title);
    });
  }

  const authorTosStr = JSON.stringify(authorsTag);

  return (
    <header className="content_header">
      {props.tag && (
        <div className="content_topic">
          <Link href={props.tag.to}>
            <a className="link link-none">{props.tag.tagName}</a>
          </Link>
        </div>
      )}

      <Heading
        level={props.headingLevel ? props.headingLevel : 1}
        className="hdg hdg-1 hdg-headline"
      >
        {props.title}
      </Heading>

      {props.subtitle && (
        <p className="content_subtitle" data-testid="contentSubtitle">
          {props.subtitle}
        </p>
      )}

      <div className="content_meta">
        {props.authors?.length ? (
          <div
            className="content_byline"
            data-testid="contentByline"
            data-mpr-authors={authorTosStr}
          >
            <Byline authors={props.authors} />
          </div>
        ) : null}

        {props.dateline && (
          <div className="content_dateline">{props.dateline} </div>
        )}
        {props.publishDate && (
          <time className="content_pubdate" dateTime={props.publishDate}>
            {format(props.publishDate, 'MMMM D, YYYY')}
          </time>
        )}
      </div>
    </header>
  );
};

ContentHeader.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string
    })
  ),
  headingLevel: PropTypes.number,
  publishDate: PropTypes.string,
  subtitle: PropTypes.string,
  dateline: PropTypes.string,
  tag: PropTypes.shape({
    to: PropTypes.string,
    tagName: PropTypes.string
  }),
  title: PropTypes.string.isRequired
};

export default ContentHeader;
