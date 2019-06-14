import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Byline = (props) => {
  function parseToCompLink(authors) {
    let results = [];

    authors.forEach((author) =>
      results.push(
        <Link href={author.href}>
          <a>{author.name.trim()}</a>
        </Link>
      )
    );
    return results;
  }
  const authors = parseToCompLink(props.authors);

  return (
    <>
      {authors.map((author, i) => {
        if (i === authors.length - 1) {
          return <div key={i}>{author}</div>;
        } else if (i === authors.length - 2) {
          return <div key={i}>{author} and </div>;
        }
        return <div key={i}>{author},</div>;
      })}
    </>
  );
};

Byline.propTypes = {
  authors: PropTypes.array
};

export default Byline;
