import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import CollectionLink from './CollectionLink';

const Collection = (props) => {
  const { data } = props;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <CollectionLink />
      <h2>Collection from cms</h2>
      <ul>
        {data.collectionList.map((collection) => (
          <li key={collection.id}>{collection.title}</li>
        ))}
      </ul>
    </div>
  );
};
Collection.propTypes = {
  data: PropTypes.object
};
export default Collection;
