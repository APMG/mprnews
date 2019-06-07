/* eslint-disable react/display-name */
import React from 'react';
import Router from 'next/router';
import { Teaser, Heading, Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { Body } from 'amat-react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './collection.gql';

const Collection = ({ collectionName, endpointName }) => {
  return (
    <Query
      query={query}
      variables={{
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: collectionName
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <div>{`Error: ${error}`}</div>;
        if (loading) return <Loading />;

        return (
          <CollectionInner
            collection={data.collection}
            endpointName={endpointName}
          />
        );
      }}
    </Query>
  );
};

const CollectionInner = ({ collection, endpointName }) => {
  return (
    <>
      <Heading level={2}>{collection.title}</Heading>

      {collection.results.items.map((item) => {
        return (
          <Teaser
            key={item.id}
            id={item.id}
            title={item.title}
            href={`/${endpointName}?slug=${item.canonicalSlug}`}
            as={`/${endpointName}/${item.canonicalSlug}`}
            router={Router}
            publishDate={item.publishDate}
            headingLevel={2}
            image={
              item.primaryVisuals?.lead ? (
                <Image
                  image={item.primaryVisuals.lead}
                  aspectRatio="uncropped"
                  sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                  alt={item.primaryVisuals.lead.longCaption}
                />
              ) : (
                <Image fallbackSrc="/static/fallback.png" alt="" />
              )
            }
            description=<Body nodeData={JSON.parse(item.description)} />
          />
        );
      })}
    </>
  );
};

CollectionInner.propTypes = {
  collection: PropTypes.object,
  endpointName: PropTypes.string
};

Collection.propTypes = {
  collectionName: PropTypes.string,
  endpointName: PropTypes.string
};

export default Collection;
