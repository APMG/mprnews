/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Teaser, Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { Body } from 'amat-react';
import CollectionLinks from './CollectionLinks';
import AdBottom from '../../components/Ads/AdBottom';
import AdTop from '../../components/Ads/AdTop';
import query from './home.gql';

const Home = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: 'homepage'
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>{`Error: ${error}`}</div>;
      if (loading) return <Loading />;

      return <HomeInner data={data} />;
    }}
  </Query>
);

const HomeInner = ({ data }) => {
  if (data.homeList) {
    data.homelist?.results?.items?.map((item) => {
      let link =
        data.resourceType === 'link'
          ? item.destination
          : `/story?slug=${item.canonicalSlug}`;
      let asLink =
        data.resourceType === 'link'
          ? item.destination
          : `/story/${item.canonicalSlug}`;

      let image = item.primaryVisuals?.thumbnail ? (
        <Image
          image={item.primaryVisuals?.thumbnail}
          elementClass="content_thumbnail"
          aspectRatio="widescreen"
          sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
          alt={item.primaryVisuals?.thumbnail?.shortCaption}
        />
      ) : (
        <Image
          elementClass="content_thumbnail"
          fallbackSrc="/static/fallback.png"
          alt={item.title || ''}
        />
      );

      return (
        <>
          <Teaser
            key={item.id}
            id={item.id}
            title={item.title}
            href={link}
            as={asLink}
            router={Router}
            publishDate={DataTransferItem.publishDate}
            headingLevel={2}
            image={image}
            description=<Body nodeData={JSON.parse(item.description)} />
          />
          <AdTop />
          <AdBottom />
          <CollectionLinks />
        </>
      );
    });
  } else {
    return (
      <>
        <div>The homepage must needs tasty content</div>
        <AdTop />
        <AdBottom />
      </>
    );
  }
};

HomeInner.propTypes = {
  data: PropTypes.object
};

export default Home;
