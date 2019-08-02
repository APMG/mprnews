import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import Link from 'next/link';
import Byline from '../Byline/Byline';

const ContentHeader = (props) => {
  let authorsTag = [];

  if (props.authors?.length > 0) {
    props.authors.forEach((author) => {
      authorsTag.push(author.title);
    });
  }

  const authorTosStr = JSON.stringify(authorsTag);

  const contentTopicHeaderRef = useRef(null);
  //No array passed for useEffect
  //expected behavior is to let useEffect  run on rerender
  useEffect(() => {
    // console.log('content header ref', contentTopicHeaderRef);
    if (!contentTopicHeaderRef) {
      console.log('no topic info in content header', contentTopicHeaderRef);
      return;
    } else if (contentTopicHeaderRef) {
      console.log(
        'RELOAD ads check info in content header',
        contentTopicHeaderRef
      );
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'sendUWContentTopic',
        contentTopic: props.tag.tagName
      });
    } else {
      console.error('you broke something');
    }
  }, [props.tag.tagName]);

  return (
    <header className="content_header">
      {props.tag && (
        <div
          className="content_topic page-purpose"
          data-mpr-content-topic={props.tag.tagName}
          ref={contentTopicHeaderRef}
        >
          <Link
            href={`/collection?slug=${props.tag.to}`}
            as={`/${props.tag.to}`}
          >
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
    tagName: PropTypes.string
  }),
  title: PropTypes.string.isRequired
};

export default ContentHeader;
