import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';
import { Link } from '@apmg/titan';
import AmpByline from '../AmpByline/AmpByline';

const ampStyles = {
  header: {
    fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
    fontWeight: '700',
  },
  title: {
    display: 'block',
    fontFamily: '"Roboto Condensed", system-ui, -apple-system, sans-serif',
    fontSize: '1.5em',
    lineHeight: '1',
    margin: '0',
  },
  authors: {
    display: 'flex',
  },
  dateline: {
    marginRight: '0.75em',
  },
  link: {
    textDecoration: 'none',
    color: '#00334e',
  },
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

  return (
    <header style={ampStyles.header}>
      {props.tag && (
        <div
          data-mpr-content-topic={props.tag.tagName}
          ref={contentTopicHeaderRef}
        >
          <Link
            style={ampStyles.link}
            href={props.tag.href}
            as={`/${props.tag.to}`}
          >
            {props.tag.tagName}
          </Link>
        </div>
      )}

      <Heading level={props.headingLevel ? props.headingLevel : 1}>
        <span style={ampStyles.title}>{props.title}</span>
      </Heading>

      {props.subtitle && <p data-testid="contentSubtitle">{props.subtitle}</p>}

      <div style={ampStyles.authors}>
        {props.authors && (
          <div
            data-testid="contentByline"
            data-mpr-authors={authorTosStr}
            style={ampStyles.dateline}
          >
            <AmpByline authors={props.authors} />
          </div>
        )}

        {props.dateline && (
          <div style={ampStyles.dateline}>{props.dateline}</div>
        )}

        {props.publishDate && <div>{props.publishDate}</div>}
      </div>
    </header>
  );
};

AmpContentHeader.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  headingLevel: PropTypes.number,
  publishDate: PropTypes.node,
  subtitle: PropTypes.string,
  dateline: PropTypes.string,
  tag: PropTypes.shape({
    to: PropTypes.string,
    href: PropTypes.string,
    tagName: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
};

export default AmpContentHeader;
