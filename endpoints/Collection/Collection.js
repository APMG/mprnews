import React, { useEffect, useRef } from 'react';
import { Heading, Pagination } from '@apmg/titan';
import { Body } from '@apmg/amat';
import PropTypes from 'prop-types';
import CollectionContributors from './CollectionContributors';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Icon from '../../components/Icons/Icon';
import { showInfoAlert } from '../../utils/utils';
import Alert from '../../components/Alert/Alert';
import ApmRelatedLinkListItemOverride from '../../components/AmatOverrides/ApmRelatedLinkListItemOverride';
import ApmRelatedLinkOverride from '../../components/AmatOverrides/ApmRelatedLinkOverride';
import LinkOverride from '../../components/AmatOverrides/LinkOverride';

const Collection = ({ data: { collection, alertConfig } }) => {
  console.log('✈️🚆 COLLECTION PAGE HIT');
  const alerts = () => {
    if (alertConfig) return JSON.parse(alertConfig.json);
  };
  const img = fishForSocialMediaImage(collection);
  const contentTopicCollectionRef = useRef(null);
  let checkCollectionName = `${collection?.title}`;
  let collectionClassName = checkCollectionName
    .toLowerCase()
    .replace(/\s/g, '');

  if (!checkCollectionName) {
    checkCollectionName = 'default';
  }

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
        image={img?.url}
        imageHeight={img?.height}
        imageWidth={img?.width}
        imageAlt={collection?.primaryVisuals?.social?.shortCaption}
        topic={collection?.title}
        contentType="website"
        noFollow={true}
        originalSourceUrl={collection.originalSourceUrl}
      />
      {showInfoAlert(alerts, collection.resourceType) ? (
        <div className="section section-md">
          <Alert info={alerts.info} />
        </div>
      ) : null}
      <section
        className="collection page-purpose"
        data-mpr-content-topic={collection.title}
        ref={contentTopicCollectionRef}
      >
        <div className="collection_header">
          <Heading
            level={1}
            className={`hdg hdg-section ${collectionClassName}`}
          >
            {collection?.title}
          </Heading>
        </div>
        {collection?.body && (
          <div className="collection_body userContent">
            <Body
              nodeData={JSON.parse(collection.body)}
              embedded={JSON.parse(collection.embeddedAssetJson)}
              overrides={{
                link: LinkOverride,
                apm_related_link: ApmRelatedLinkOverride,
                apm_related_link_list_item: ApmRelatedLinkListItemOverride
              }}
            />
          </div>
        )}
        <aside className="collection_sidebar">
          {collection?.contributors?.length ? (
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
            hasFirstAndLast={true}
            inclusiveFirstLast={true}
            buffer={1}
            hrefPrefix={`[...slug]`}
            asPrefix={`${collection.canonicalSlug}`}
            currentPage={collection.results.currentPage}
            totalPages={collection.results.totalPages}
            firstLastSeparator="..."
            firstSymbol="1"
            nextSymbol={
              <>
                <span>Next</span>
                <Icon name="chevronRight" />
              </>
            }
            prevSymbol={
              <>
                <Icon name="chevronLeft" />
                <span>Prev</span>
              </>
            }
            lastSymbol={collection.results.totalPages}
            prevNextClass="btn btn-primary"
          />
        </div>
      </section>
    </>
  );
};

Collection.propTypes = {
  data: PropTypes.shape({
    alertConfig: PropTypes.object,
    collection: PropTypes.object
  })
};

export default Collection;
