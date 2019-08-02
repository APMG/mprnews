import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Query } from 'react-apollo';
import QueryError from '../../components/QueryError/QueryError';
import query from './home.gql';
import { Loading } from '@apmg/titan';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import HomeFooter from './HomeFooter';
import HomeGrid from '../../grids/HomeGrid';
import HomeRail from './HomeRail';
import HomeTop from './HomeTop';
import Icon from '../../components/Icons/Icon';
import Metatags from '../../components/Metatags/Metatags';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
  return (
    <Query
      query={query}
      variables={{
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: 'homepage'
      }}
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (error) return <QueryError error={error.message} />;
        if (loading) return <Loading />;

        return <HomeInner data={data} />;
      }}
    </Query>
  );
};

const HomeInner = ({ data }) => {
  const contentTopicHomepageRef = useRef(null);
  //No array passed for useEffect
  //expected behavior is to let useEffect  run on rerender
  useEffect(() => {
    // console.log('ct homepage ref', contentTopicHomepageRef);
    if (!contentTopicHomepageRef) {
      console.log('no topic info in content header', contentTopicHomepageRef);
      return;
    } else if (contentTopicHomepageRef) {
      console.log(
        'RELOAD ads check info in content header',
        contentTopicHomepageRef
      );
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'sendUWContentTopic',
        contentTopic: 'homepage'
      });
    } else {
      console.error('you broke something');
    }
  });
  const alerts = JSON.parse(data.alertConfig.json);
  const homeStoryConfig = JSON.parse(data.homeStoryConfig.json);
  const firstItem = data.homeList.results.items[0];

  const showInfoAlert = () => {
    return alerts?.info?.alert && alerts?.info?.show_on?.indexOf('home') > -1
      ? true
      : false;
  };

  return (
    <div
      className="page-purpose"
      data-mpr-content-topic="homepage"
      ref={contentTopicHomepageRef}
    >
      {console.log('Home React DIV')}
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
