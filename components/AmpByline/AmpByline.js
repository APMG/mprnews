import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import ToSentence from '../ToSentence/ToSentence';
import { sortByOrder } from '../../utils/utils';

let ampStyles = {
  byline: {
    textDecoration: 'none',
    color: '#00334e',
  },
};

const Byline = (props) => {
  function parseToCompLink(authors) {
    let results = [];
    let sortedAuthors = sortByOrder(authors);
    sortedAuthors.forEach((author) =>
      results.push(
        <Link
          style={ampStyles.byline}
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
