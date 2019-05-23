import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Collection from './Collection';
import { collectionQuery } from './CollectionQuery';
import SiteConfigContext from '../../context/SiteConfigContext';

import PropTypes from 'prop-types';

const CollectionWithData = (props) => {
  const context = useContext(SiteConfigContext);

  const pageNum = props.id ? props.id : 1;
  const topicSlug = props['*'];

  const WrappedComponent = graphql(
    collectionQuery(context.slug, pageNum, topicSlug),
    {
      options: () => ({
        variables: {
          page: pageNum,
          slug: context.slug
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
