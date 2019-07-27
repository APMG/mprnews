import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ToSentence from '../ToSentence/ToSentence';

const Byline = (props) => {
  function parseToCompLink(authors) {
    let results = [];
    console.log('authors', authors);
    authors.forEach((author) =>
      results.push(
        <Link href={`/people?slug=${author.href.split('/')[2]}`} as={author.as}>
          <a className="link link-plain">{author.title}</a>
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
