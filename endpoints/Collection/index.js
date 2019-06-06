/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './collection.gql';

const Collection = ({ collectionName }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: collectionName
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <CollectionInner collection={data.collection} />;
    }}
  </Query>
);

const CollectionInner = ({ collection }) => {
  return (
    <div className="collection">
      <ul>
        {collection.results?.items?.map((item) => {
          let slug = item.canonicalSlug;

          return (
            <li key={item.id}>
              <Link
                as={`/story/${slug}`}
                href={{ pathname: '/story', query: { slug: slug } }}
              >
                <a>{item.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

CollectionInner.propTypes = {
  collection: PropTypes.object
};

Collection.propTypes = {
  collectionName: PropTypes.string
};

export default Collection;
