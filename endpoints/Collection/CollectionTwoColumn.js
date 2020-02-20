import React, { useEffect, useRef } from 'react';
import { Heading, Pagination } from '@apmg/titan';
import { Body } from '@apmg/amat';
import PropTypes from 'prop-types';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Icon from '../../components/Icons/Icon';
import { showInfoAlert } from '../../utils/utils';
import Alert from '../../components/Alert/Alert';

const Collection = ({ data: { collection, alertConfig } }) => {
  let alerts = alertConfig ? JSON.parse(alertConfig.json) : null;
  const contentTopicCollectionRef = useRef(null);
  let checkCollectionName = `${collection?.title}`;

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
        title={collection?.title}
        fullSlug={collection?.canonicalSlug}
        description={collection?.descriptionText}
        image={fishForSocialMediaImage(collection)}
        topic={collection?.title}
        contentType="website"
      />
      {showInfoAlert(alerts, collection?.resourceType) ? (
        <div className="section section-md">
          <Alert info={alerts.info} />
        </div>
      ) : null}
      <section
        className="collection twoColumn page-purpose"
        data-mpr-content-topic={collection?.title}
        ref={contentTopicCollectionRef}
      >
        <div className="collection_header">
          <Heading level={1} className="hdg hdg-section">
            {collection?.title}
          </Heading>
        </div>
        {collection?.body && (
          <div className="collection_body userContent">
            <Body
              nodeData={JSON.parse(collection?.body)}
              embedded={JSON.parse(collection?.embeddedAssetJson)}
            />
          </div>
        )}
        <div className="collection_teaserSection collection_teaserSection-twoColumn">
          <div className="collection_teaserTwoColumn">
            {collection?.results.items.slice(0, 4).map((item) => {
              let isNewspartners = false;
              if (collection?.canonicalSlug === 'newspartners') {
                isNewspartners = true;
              }

              return (
                <FullTeaser
                  item={item}
                  newspartners={isNewspartners}
                  key={item?.id}
                />
              );
            })}
          </div>
          <div className="vList vList-collection">
            {collection?.results.items
              .slice(4, collection?.results.items.length)
              .map((item) => {
                let isNewspartners = false;
                if (collection.canonicalSlug === 'newspartners') {
                  isNewspartners = true;
                }

                return (
                  <FullTeaser
                    item={item}
                    newspartners={isNewspartners}
                    key={item.id}
                    size={'condensed'}
                  />
                );
              })}
          </div>
        </div>
        <div className="collection_pagination">
          <Pagination
            hasFirstAndLast={true}
            inclusiveFirstLast={true}
            buffer={1}
            hrefPrefix={`collection?slug=${collection?.canonicalSlug}`}
            asPrefix={`${collection?.canonicalSlug}`}
            currentPage={collection?.results.currentPage}
            totalPages={collection?.results.totalPages}
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
            lastSymbol={collection?.results.totalPages}
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
