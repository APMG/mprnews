import React from 'react';
import { graphql } from 'react-apollo';
import Collection from './Collection';
import { collectionQuery } from './CollectionQuery';

import PropTypes from 'prop-types';

const CollectionWithData = (props) => {
  const pageNum = props.id ? props.id : 1;
  const topicSlug = props['*'];
  const collectionSlug = 'mpr';

  const WrappedComponent = graphql(
    collectionQuery(collectionSlug, pageNum, topicSlug),
    {
      options: () => ({
        variables: {
          page: pageNum,
          slug: collectionSlug
        }
      })
    }
  )(Collection);

  return <WrappedComponent />;
};

CollectionWithData.propTypes = {
  id: PropTypes.string,
  '*': PropTypes.string
};

export default CollectionWithData;
