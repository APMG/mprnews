import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ToSentence from '../ToSentence/ToSentence';

const Byline = (props) => {
  function parseToCompLink(authors) {
    let results = [];

    authors.forEach((author) =>
      results.push(
        <Link href={author}>
          <a className="link link-plain">{author.name}</a>
        </Link>
      )
    );
    return results;
  }
  const authors = parseToCompLink(props.authors);

  return (
    <>
      <ToSentence items={authors} />
    </>
  );
};

Byline.propTypes = {
  authors: PropTypes.array
};

export default Byline;
