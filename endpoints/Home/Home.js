/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Loading } from '@apmg/titan';
import query from './home.gql';
import HomeGrid from '../../grids/HomeGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import Icon from '../../components/Icons/Icon';
import HomeFooter from './HomeFooter';
import HomeRail from './HomeRail';
import HomeTop from './HomeTop';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import Metatags from '../../components/Metatags/Metatags';

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
  const alerts = JSON.parse(data.alertConfig.json);
  const homeStoryConfig = JSON.parse(data.homeStoryConfig.json);
  const firstItem = data.homeList.results.items[0];

  const showInfoAlert = () => {
    return alerts?.info?.alert && alerts?.info?.show_on?.indexOf('home') > -1
      ? true
      : false;
  };

  return (
    <div className="page-purpose" data-mpr-content-topic="homepage">
      <Metatags
        metatags={[
          {
            key: 'mpr-content-topic',
            name: 'mpr-content-topic',
            content: 'homepage'
          }
        ]}
        links={[]}
      />
      <HomeGrid
        blowout={homeStoryConfig?.top_story_blowout}
        sidebar={<Sidebar />}
        first={<FullTeaser item={firstItem} />}
        rail={<HomeRail updraft={data.updraft?.results?.items?.[0]} />}
        top={showInfoAlert() ? <HomeTop info={alerts.info} /> : null}
        footer={<HomeFooter />}
      >
        <div className="vList vList-collection">
          {data.homeList.results.items.map((item, index) => {
            if (index === 0) return;
            return (
              <FullTeaser
                key={item.id}
                item={item}
                size={
                  index >= homeStoryConfig?.promoted_stories
                    ? 'condensed'
                    : null
                }
              />
            );
          })}
        </div>
        <div className="hList home_more">
          <div>
            <Link href="/allnews?slug=all-news" as={'/all-news'}>
              <a className="btn btn-primary">
                <span>More News </span>
                <Icon name="chevronRight" />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/collection?slug=arts" as={'/arts'}>
              <a className="btn btn-primary">
                <span>More Arts </span>
                <Icon name="chevronRight" />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/collection?slug=environment" as={'/environment'}>
              <a className="btn btn-primary">
                <span>More Environment </span>
                <Icon name="chevronRight" />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/collection?slug=politics" as={'/politics'}>
              <a className="btn btn-primary">
                <span>More Politics </span>
                <Icon name="chevronRight" />
              </a>
            </Link>
          </div>
        </div>
      </HomeGrid>
    </div>
  );
};

HomeInner.propTypes = {
  data: PropTypes.object
};

export default Home;
