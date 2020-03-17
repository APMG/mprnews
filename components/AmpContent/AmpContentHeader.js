import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { Link } from '@apmg/titan';
import Byline from '../Byline/Byline';

const ampStyles = {
  authors: {
    display: 'flex'
  }
};

const AmpContentHeader = (props) => {
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
    <header>
      {props.tag && (
        <div
          data-mpr-content-topic={props.tag.tagName}
          ref={contentTopicHeaderRef}
        >
          <Link href={props.tag.href} as={`/${props.tag.to}`}>
            {props.tag.tagName}
          </Link>
        </div>
      )}

      <Heading level={props.headingLevel ? props.headingLevel : 1}>
        {props.title}
      </Heading>

      {props.subtitle && <p data-testid="contentSubtitle">{props.subtitle}</p>}

      <div style={ampStyles.authors}>
        {props.authors?.length && (
          <div data-testid="contentByline" data-mpr-authors={authorTosStr}>
            <Byline authors={props.authors} />
          </div>
        )}

        {props.dateline && <div>{props.dateline}</div>}

        {props.publishDate && <div>{props.publishDate}</div>}
      </div>
    </header>
  );
};

AmpContentHeader.propTypes = {
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

export default AmpContentHeader;
