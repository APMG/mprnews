import React, { useEffect, useRef } from 'react';
import { Heading } from '@apmg/titan';
import { Body } from '@apmg/amat';
import PropTypes from 'prop-types';
import CollectionContributors from './CollectionContributors';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Pagination from '../../components/Pagination/Pagination';

const Collection = ({ data, slug, pageNum }) => {
  return (
    <CollectionInner
      collectionName={slug}
      collection={data}
      pageNum={parseInt(pageNum)}
    />
  );
};

const CollectionInner = ({ collection, pageNum, collectionName }) => {
  const contentTopicCollectionRef = useRef(null);
  let checkCollectionName = `${collection?.title}`;
  if (!checkCollectionName) {
    checkCollectionName = 'default';
  }
  //No array passed for useEffect expected behavior is to let useEffect run on rerender
  useEffect(() => {
    if (contentTopicCollectionRef) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'sendUWContentTopic',
        contentTopic: checkCollectionName
      });
    } else {
      console.error('you broke the ads');
    }
  }, [checkCollectionName]);
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
        ref={contentTopicCollectionRef}
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
  pageNum: PropTypes.number,
  collectionName: PropTypes.string
};

Collection.propTypes = {
  data: PropTypes.object,
  slug: PropTypes.string,
  pageNum: PropTypes.number
};

export default Collection;
