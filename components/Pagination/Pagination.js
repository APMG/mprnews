import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@apmg/titan';
import { prevIndex, nextIndex } from '../../utils/utils';
import Icon from '../Icons/Icon';

const Pagination = ({ collection, collectionName, pageNum }) => {
  return (
    <nav>
      {collection.results.currentPage < collection.results.totalPages + 1 && (
        <div className="banner banner-pagination">
          <div className="section">
            {pageNum > 1 && (
              <Link
                as={`/${collectionName}/${prevIndex(pageNum)}`}
                href={`/collection?slug=${collectionName}&pageNum=${prevIndex(
                  pageNum
                )}`}
                className="btn btn-secondary"
              >
                <Icon name="chevronLeft" />
                Previous page
              </Link>
            )}
            {collection.results.currentPage < collection.results.totalPages && (
              <Link
                as={`/${collectionName}/${nextIndex(
                  pageNum,
                  collection.results.totalPages
                )}`}
                href={`/collection?slug=${collectionName}&pageNum=${nextIndex(
                  pageNum,
                  collection.results.totalPages
                )}`}
                className="btn btn-secondary"
              >
                Next page
                <Icon name="chevronRight" />
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
