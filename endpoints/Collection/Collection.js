import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { Query } from 'react-apollo';
import QueryError from '../../components/QueryError/QueryError';
import query from './collection.gql';
import { Heading, Loading } from '@apmg/titan';
import { Body } from '@apmg/amat';
import CollectionContributors from './CollectionContributors';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Pagination from '../../components/Pagination/Pagination';

const Collection = ({ collectionName, pageNum }) => {
  return (
    <Query
      query={query}
      variables={{
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: collectionName,
        pageNum: pageNum
      }}
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (error) return <QueryError error={error.message} />;
        if (loading) return <Loading />;

        if (data.collection === null) return <ErrorPage statusCode={404} />;

        return (
          <CollectionInner
            collectionName={collectionName}
            collection={data.collection}
            pageNum={parseInt(pageNum)}
          />
        );
      }}
    </Query>
  );
};

const CollectionInner = ({ collection, pageNum, collectionName }) => {
  return (
    <>
      <Metatags
        title={collection.title}
        fullSlug={collection.canonicalSlug}
        description={collection.descriptionText}
        image={fishForSocialMediaImage(collection)}
        topic={collection.title}
        contentType="website"
      />

      <section
        className="collection page-purpose"
        data-mpr-content-topic={collection.title}
      >
        <div className="collection_header">
          <Heading level={1} className="hdg hdg-section">
            {collection.title}
          </Heading>
        </div>
        {collection.body && (
          <div className="collection_body userContent">
            <Body
              nodeData={JSON.parse(collection.body)}
              embedded={JSON.parse(collection.embeddedAssetJson)}
            />
          </div>
        )}
        <aside className="collection_sidebar">
          {collection.contributors?.length ? (
            <CollectionContributors contributors={collection.contributors} />
          ) : null}
        </aside>
        <div className="collection_items">
          {collection.results.items.map((item) => {
            let isNewspartners = false;
            if (collection.canonicalSlug === 'newspartners') {
              isNewspartners = true;
            }

            return (
              <FullTeaser
                item={item}
                newspartners={isNewspartners}
                key={item.id}
              />
            );
          })}
        </div>
        <div className="collection_pagination">
          <Pagination
            collection={collection}
            collectionName={collectionName}
            pageNum={pageNum}
          />
        </div>
      </section>
    </>
  );
};

CollectionInner.propTypes = {
  collection: PropTypes.object,
  collectionName: PropTypes.string,
  pageNum: PropTypes.number
};

Collection.propTypes = {
  collectionName: PropTypes.string,
  pageNum: PropTypes.number
};

export default Collection;
