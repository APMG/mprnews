import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Home from './Home';
import { homeQuery } from './HomeQuery';
import SiteConfigContext from '../../context/SiteConfigContext';

const HomeWithData = () => {
  const context = useContext(SiteConfigContext);

  const WrappedComponent = graphql(
    homeQuery(context.slug, {
      options: {
        fetchPolicy: 'network-only'
      }
    })
  )(Home);

  return <WrappedComponent />;
};

export default HomeWithData;
