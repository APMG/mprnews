import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './collection.gql';
import Content from '../../components/Content';

const Collection = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'mprnews',
      slug: 'angela-davis'
    }}
  >
    {({ loading, error, data: { episode } }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <CollectionInner episode={episode} />;
    }}
  </Query>
);

const CollectionInner = ({ collection }) => {
  return (
    <article className="story">
      <Content
        title={collection.title}
        body={collection.body}
        embeddedAssetJson={collection.embeddedAssetJson}
      />
    </article>
  );
};

CollectionInner.propTypes = {
  collection: PropTypes.object
};

export default Collection;
