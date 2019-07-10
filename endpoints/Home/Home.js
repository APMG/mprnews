/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Button, Loading } from '@apmg/titan';
import query from './home.gql';
import HomeGrid from '../../grids/HomeGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeFooter from './HomeFooter';
import HomeRail from './HomeRail';
import HomeTop from './HomeTop';
import FullTeaser from '../../components/FullTeaser/FullTeaser';

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
      first={<FullTeaser item={firstItem} />}
      rail={<HomeRail updraft={data.updraft?.results?.items?.[0]} />}
      top={showAlert() ? <HomeTop info={info} /> : null}
      footer={<HomeFooter />}
    >
      <div className="vList vList-collection">
        {data.homeList.results.items.map((item, index) => {
          if (index === 0) return;
          return <FullTeaser key={item.id} item={item} size="condensed" />;
        })}
      </div>
      <div className="home_more">
        <Button type="primary" href="/">
          More News
        </Button>
      </div>
    </HomeGrid>
  );
};

HomeInner.propTypes = {
  data: PropTypes.object
};

export default Home;
