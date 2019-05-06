import React from 'react';
import { graphql } from 'react-apollo';
import Home from './Home';
import { homeQuery } from './HomeQuery';

class HomeWithData extends React.Component {
  render() {
    const homeSlug = 'homepage';
    const WrappedComponent = graphql(homeQuery('mpr', homeSlug))(Home);

    return <WrappedComponent />;
  }
}

export default HomeWithData;
