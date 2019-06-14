import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Byline = (props) => {
  function parseToCompLink(authors) {
    let results = [];

    authors.forEach((author) =>
      results.push(
        <Link href={author.href}>
          <a className="link link-plain">{author.name}</a>
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
          return <Fragment key={i}>{author}</Fragment>;
        } else if (i === authors.length - 2) {
          return <Fragment key={i}>{author} and </Fragment>;
        }
        return <Fragment key={i}>{author}, </Fragment>;
      })}
    </>
  );
};

Byline.propTypes = {
  authors: PropTypes.array
};

export default Byline;
