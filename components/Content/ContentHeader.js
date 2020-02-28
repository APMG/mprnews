import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { Link } from '@apmg/titan';
import Byline from '../Byline/Byline';

const ContentHeader = (props) => {
  let authorsTag = [];

  let checkTagName = `${props?.tag?.tagName}`;

  if (props.authors?.length > 0) {
    props.authors.forEach((author) => {
      authorsTag.push(author.title);
    });
  }
  if (!checkTagName) {
    checkTagName = 'default';
  }
  const authorTosStr = JSON.stringify(authorsTag);
  const contentTopicHeaderRef = useRef(null);
  //No array passed for useEffect expected behavior is to let useEffect run on rerender
  useEffect(() => {
    if (contentTopicHeaderRef) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'sendUWContentTopic',
        contentTopic: checkTagName
      });
    } else {
      console.error('you broke the ads');
    }
  }, [checkTagName]);

  return (
    <header className="content_header">
      {props.tag && (
        <div
          className="content_topic page-purpose"
          data-mpr-content-topic={props.tag.tagName}
          ref={contentTopicHeaderRef}
        >
          <Link
            href={props.tag.href}
            as={`/${props.tag.to}`}
            className="link link-none"
          >
            {props.tag.tagName}
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
            {props.publishDate}
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
  publishDate: PropTypes.node,
  subtitle: PropTypes.string,
  dateline: PropTypes.string,
  tag: PropTypes.shape({
    to: PropTypes.string,
    href: PropTypes.string,
    tagName: PropTypes.string
  }),
  title: PropTypes.string.isRequired
};

export default ContentHeader;
