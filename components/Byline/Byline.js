import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import ToSentence from '../ToSentence/ToSentence';
import { sortByOrder } from '../../utils/utils';

const Byline = (props) => {
  if (!props || !props.authors) return null;

  function parseToCompLink(authors) {
    let results = [];
    let sortedAuthors = sortByOrder(authors);
    sortedAuthors.forEach((author) =>
      results.push(
        <Link
          href="/people/[...slug]"
          as={author.as}
          className="link link-plain"
        >
          {author.title}
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
  authors: PropTypes.array,
};

export default Byline;
