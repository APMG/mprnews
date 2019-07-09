/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Teaser, Loading } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { Body } from '@apmg/amat';
import query from './home.gql';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';
import HomeGrid from '../../grids/HomeGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeFooter from './HomeFooter';
import HomeRail from './HomeRail';
import HomeTop from './HomeTop';

const Home = () => {
  return (
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
};

const HomeInner = ({ data }) => {
  const { info } = JSON.parse(data.potlatch.json);
  const firstItem = data.homeList.results.items[0];

  const showAlert = () => {
    return info?.alert && info?.show_on?.indexOf('home') > -1 ? true : false;
  };

  return (
    <HomeGrid
      sidebar={<Sidebar />}
      first={
        <Teaser
          key={firstItem.id}
          id={firstItem.id}
          title={firstItem.title}
          href={linkByTypeHref(firstItem)}
          as={linkByTypeAs(firstItem)}
          publishDate={firstItem.publishDate}
          headingLevel={2}
          image={
            firstItem.primaryVisuals?.thumbnail ? (
              <Image
                image={firstItem.primaryVisuals?.thumbnail}
                elementClass="content_thumbnail"
                aspectRatio="widescreen"
                sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                alt={firstItem.primaryVisuals?.thumbnail?.shortCaption}
              />
            ) : null
          }
          description=<Body nodeData={JSON.parse(firstItem.description)} />
        />
      }
      rail={<HomeRail updraft={data.updraft?.results?.items?.[0]} />}
      top={showAlert() ? <HomeTop info={info} /> : null}
      footer={<HomeFooter />}
    >
      <div className="vList vList-collection">
        {data.homeList.results.items.map((item, index) => {
          if (index === 0) return;

          return (
            <Teaser
              key={item.id}
              id={item.id}
              title={item.title}
              href={linkByTypeHref(item)}
              as={linkByTypeAs(item)}
              publishDate={item.publishDate}
              headingLevel={2}
              elementClass="teaser-condensed"
              image={
                item.primaryVisuals?.thumbnail ? (
                  <Image
                    image={item.primaryVisuals?.thumbnail}
                    elementClass="content_thumbnail"
                    aspectRatio="widescreen"
                    sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                    alt={item.primaryVisuals?.thumbnail?.shortCaption}
                  />
                ) : null
              }
              description=<Body nodeData={JSON.parse(item.description)} />
            />
          );
        })}
      </div>
      <Link href="/">
        <a className="home_more">More News</a>
      </Link>
    </HomeGrid>
  );
};

HomeInner.propTypes = {
  data: PropTypes.object
};

export default Home;
