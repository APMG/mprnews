/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Teaser, Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { Body } from 'amat-react';
import AdBottom from '../../components/Ads/AdBottom';
import AdTop from '../../components/Ads/AdTop';
import query from './home.gql';
import Link from 'next/link';

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
  const { info } = JSON.parse(data.potlatch.json);
  return (
    <>
      {info.alert && info.show_on.indexOf('home') > -1 && (
        <Link href={info.url} className="alert-box">
          {`${info.prefix} ${info.title}`}
        </Link>
      )}
      {data.homeList.results.items.map((item) => {
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
          <Teaser
            key={item.id}
            id={item.id}
            title={item.title}
            href={link}
            as={asLink}
            router={Router}
            publishDate={item.publishDate}
            headingLevel={2}
            image={image}
            description=<Body nodeData={JSON.parse(item.description)} />
          />
        );
      })}
      <AdTop />
      <AdBottom />
    </>
  );
};

HomeInner.propTypes = {
  data: PropTypes.object
};

export default Home;
