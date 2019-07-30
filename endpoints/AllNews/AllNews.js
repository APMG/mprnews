import React from 'react';
import Error from 'next/error';
import { Pagination, Heading, Loading } from '@apmg/titan';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './allNews.gql';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';
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
  const socialImage = fishForSocialMediaImage(allNews);
  const tags = [
    {
      key: 'description',
      name: 'description',
      content: allNews.descriptionText
    },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage },
    {
      key: 'mpr-content-topic',
      name: 'mpr-content-topic',
      content: 'all-news'
    }
  ];

  return (
    <>
      <Metatags title={allNews.title} metatags={tags} links={[]} />

      <section
        className="collection page-purpose"
        data-mpr-content-topic={'all-news'}
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
            totalElements={1000}
            elementsPerPage={allNews.pageSize}
            currentPage={allNews.currentPage}
            nextPage={allNews.nextPage}
            previousPage={allNews.previousPage}
            linkPrefix={`all-news`}
            linksToShow={3}
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
