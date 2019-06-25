import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { prevIndex, nextIndex } from '../../utils/utils';
import Icon from '../Icons/Icon';

const Pagination = ({ collection, collectionName, pageNum }) => {
  return (
    <nav>
      {collection.results.currentPage < collection.results.totalPages + 1 && (
        <div className="banner banner-pagination">
          <div className="section">
            {pageNum > 1 && (
              <Link href={`/topic/${collectionName}/${prevIndex(pageNum)}`}>
                <a className="btn btn-secondary">
                  <Icon name="chevronLeft" />
                  Previous page
                </a>
              </Link>
            )}
            {collection.results.currentPage < collection.results.totalPages && (
              <Link
                href={`/topic/${collectionName}/${nextIndex(
                  pageNum,
                  collection.results.totalPages
                )}`}
              >
                <a className="btn btn-secondary">
                  Next page
                  <Icon name="chevronRight" />
                </a>
              </Link>
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
