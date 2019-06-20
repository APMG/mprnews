import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { prevIndex, nextIndex } from './PaginationUtils';

const Pagination = ({ collection, collectionName, pageNum }) => {
  return (
    <nav>
      {collection.results.currentPage < collection.results.totalPages + 1 && (
        <div className="banner banner-pagination">
          <div className="section">
            <button
              onClick={() =>
                Router.push(`/topic/${collectionName}/${prevIndex(pageNum)}`)
              }
              disabled={pageNum <= 1}
            >
              PREV
            </button>
            <button
              onClick={() =>
                Router.push(
                  `/topic/${collectionName}/${nextIndex(
                    pageNum,
                    collection.results.totalPages
                  )}`
                )
              }
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  collectionName: PropTypes.string,
  collection: PropTypes.object,
  pageNum: PropTypes.number
};

export default Pagination;
