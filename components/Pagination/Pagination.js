import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { prevIndex, nextIndex } from '../../utils/utils';

const Pagination = ({ collection, collectionName, pageNum }) => {
  return (
    <nav>
      {collection.results.currentPage < collection.results.totalPages + 1 && (
        <div className="banner banner-pagination">
          <div className="section">
            {pageNum > 1 && (
              <button
                onClick={() =>
                  Router.push(`/topic/${collectionName}/${prevIndex(pageNum)}`)
                }
              >
                PREV
              </button>
            )}
            {collection.results.currentPage < collection.results.totalPages && (
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
            )}
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
