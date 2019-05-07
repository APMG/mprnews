import React from 'react';
import { Router } from 'apm-titan';
import Home from '../components/Home';
import StoryWithData from '../components/Story';
import Weather from '../components/Weather';
import Event from '../components/Event';
import StoriesWithData from '../components/Stories/';
import PageWithData from '../components/Page';
import NotFound from '../components/Errors/NotFound';
import CollectionWithData from '../components/Collection';

const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <CollectionWithData path="/collection" />
      <PageWithData path="/page/*" />
      <StoryWithData path="/story/*" />
      <StoriesWithData path="/stories" />
      <Weather path="/weather/*" />
      <Event path="/event" />
      <NotFound default />
    </Router>
  );
};
export default Routes;
