import React from 'react';
import { Link } from '@apmg/titan';
import FullTeaser from '../../components/FullTeaser/FullTeaser';
import HomeFooter from './HomeFooter';
import HomeGrid from '../../grids/HomeGrid';
import HomeRail from './HomeRail';
import Icon from '../../components/Icons/Icon';
import Metatags from '../../components/Metatags/Metatags';
import Sidebar from '../../components/Sidebar/Sidebar';
import { showInfoAlert } from '../../utils/utils';
import Alert from '../../components/Alert/Alert';

const Home = (data) => {
  const alerts = JSON.parse(data.alertConfig.json);
  const homeStoryConfig = JSON.parse(data.homeStoryConfig.json);
  JSON.parse(data.electionConfig.json); //@TODO use this for election widget
  const firstItem = data.homeList.results.items[0];
  const homepageTopic = 'homepage';
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
        sidebar={<Sidebar homepageTopic={homepageTopic} />}
        first={<FullTeaser item={firstItem} />}
        rail={<HomeRail updraft={data.updraft?.results?.items?.[0]} />}
        top={
          showInfoAlert(alerts, 'home') ? (
            <div className="section section-md">
              <Alert info={alerts.info} />
            </div>
          ) : null
        }
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
            <Link
              href="/collection?slug=arts"
              as={'/arts'}
              className="btn btn-primary"
            >
              <span>More Arts </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
          <div>
            <Link
              href="/collection?slug=environment"
              as={'/environment'}
              className="btn btn-primary"
            >
              <span>More Environment </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
          <div>
            <Link
              href="/collection?slug=politics"
              as={'/politics'}
              className="btn btn-primary"
            >
              <span>More Politics </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
        </div>
      </HomeGrid>
    </div>
  );
};

export default Home;
