import React, { useEffect, useRef } from 'react';
import Error from 'next/error';
import { Pagination, Heading, Loading } from '@apmg/titan';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './allNews.gql';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
import Icon from '../../components/Icons/Icon';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const AllNews = ({ pageNum }) => {
  return (
    <Query
      query={query}
      variables={{
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        pageNum: pageNum
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <div>{`Error: ${error}`}</div>;
        if (loading) return <Loading />;
        if (data.allNews === null) return <Error statusCode={404} />;

        return (
          <AllNewsInner allNews={data.allNews} pageNum={parseInt(pageNum)} />
        );
      }}
    </Query>
  );
};

const AllNewsInner = ({ allNews }) => {
  const contentTopicAllNewsRef = useRef(null);
  let createAllNewsName = 'allNews';
  //No array passed for useEffect expected behavior is to let useEffect run on rerender
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
            slug={'all-news'}
            resourceType={'allnews'}
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
            lastSymbol="Last"
            prevNextClass="btn btn-primary"
          />
        </div>
      </section>
    </>
  );
};

AllNewsInner.propTypes = {
  allNews: PropTypes.object
};

AllNews.propTypes = {
  pageNum: PropTypes.number
};

export default AllNews;
