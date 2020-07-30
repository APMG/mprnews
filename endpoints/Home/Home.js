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
import PresidentialPrimaryWidget from '../../components/PresidentialPrimaryWidget/PresidentialPrimaryWidget';

const Home = (data) => {
  const alerts = JSON.parse(data.alertConfig.json);
  const homeStoryConfig = JSON.parse(data.homeStoryConfig.json);
  const electionConfig = data.electionConfig?.json
    ? JSON.parse(data.electionConfig.json)
    : null;
  const covidConfig = data.covidConfig?.json
    ? JSON.parse(data.covidConfig.json)
    : {};

  const firstItem = data.homeList.results.items[0];
  const homepageTopic = 'homepage';
  return (
    <div className="page-purpose" data-mpr-content-topic="homepage">
      <Metatags
        metatags={[
          {
            key: 'mpr-content-topic',
            name: 'mpr-content-topic',
            content: 'homepage',
          },
        ]}
        links={[]}
      />
      <HomeGrid
        blowout={homeStoryConfig?.top_story_blowout}
        sidebar={<Sidebar homepageTopic={homepageTopic} />}
        first={<FullTeaser item={firstItem} />}
        rail={
          <HomeRail
            updraft={data.updraft?.results?.items?.[0]}
            showElectionLink={
              electionConfig &&
              (electionConfig.states?.length ||
                electionConfig.show_election_logo)
                ? true
                : false
            }
            covid={covidConfig}
          />
        }
        top={
          showInfoAlert(alerts, 'home') ? (
            <div className="section section-md">
              <Alert info={alerts.info} />
            </div>
          ) : null
        }
        widget={
          electionConfig &&
          (electionConfig.states?.length ||
            electionConfig.show_delegate_count) ? (
            <PresidentialPrimaryWidget
              states={electionConfig.states}
              showDelegateCount={electionConfig.show_delegate_count}
            />
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
              href="/[...slug]"
              as="/health/covid-19"
              className="btn btn-primary"
            >
              <span>COVID-19 </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
          <div>
            <Link
              href="/[...slug]"
              as={'/politics/election-2020'}
              className="btn btn-primary"
            >
              <span>Elections 2020 </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
          <div>
            <Link
              href="/[...slug]"
              as={'/crime-law-and-justice/killing-of-george-floyd'}
              className="btn btn-primary"
            >
              <span>Floyd killing </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
          <div>
            <Link
              href="/[...slug]"
              as={'/social-issues/race'}
              className="btn btn-primary"
            >
              <span>Race </span>
              <Icon name="chevronRight" />
            </Link>
          </div>
        </div>
      </HomeGrid>
    </div>
  );
};

export default Home;
