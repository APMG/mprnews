import React, { useEffect, useRef } from 'react';
import { Pagination, Heading } from '@apmg/titan';
import PropTypes from 'prop-types';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
import Icon from '../../components/Icons/Icon';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const AllNews = ({ data: { allNews } }) => {
  const contentTopicAllNewsRef = useRef(null);
  let createAllNewsName = 'allNews';
  useEffect(() => {
    if (contentTopicAllNewsRef) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'sendUWContentTopic',
        contentTopic: createAllNewsName
      });
    } else {
      console.error('you broke the ads');
    }
  }, [createAllNewsName]);
  return (
    <>
      <Metatags
        title={allNews.title}
        fullSlug={allNews.canonicalSlug}
        description={allNews.descriptionText}
        image={fishForSocialMediaImage(allNews)}
        topic={allNews.title}
        contentType="website"
      />

      <section
        className="collection page-purpose"
        data-mpr-content-topic={'all-news'}
        ref={contentTopicAllNewsRef}
      >
        <div className="collection_header">
          <Heading level={1} className="hdg hdg-section">
            All News
          </Heading>
        </div>
        <div className="collection_items">
          {allNews.items.map((item) => {
            let isNewspartners = false;
            if (item.canonicalSlug === 'newspartners') {
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
            hrefPrefix={`collection?slug=all-news`}
            asPrefix={`all-news`}
            currentPage={allNews.currentPage}
            totalPages={allNews.totalPages}
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
            lastSymbol={allNews.totalPages}
            prevNextClass="btn btn-primary"
          />
        </div>
      </section>
    </>
  );
};

AllNews.propTypes = {
  pageNum: PropTypes.number,
  data: PropTypes.shape({
    allNews: PropTypes.object
  })
};

export default AllNews;
