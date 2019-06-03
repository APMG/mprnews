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
import TwitterWithData from '../components/Twitter';
import EpisodeWithData from '../components/Episode';
import EpisodePreviewWithData from '../components/Episode/Preview';
import StoryPreviewWithData from '../components/Story/Preview';

const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <CollectionWithData path="/topic/*" />
      <PageWithData path="/page/*" />
      <EpisodeWithData path="/episode/*" />
      <EpisodePreviewWithData path="/preview/episodes/*" />
      <StoryWithData path="/story/*" />
      <StoriesWithData path="/stories" />
      <StoryPreviewWithData path="/preview/stories/*" />
      <Weather path="/weather/*" />
      <Event path="/event/*" />
      <TwitterWithData path="/story/card/*" />
      <NotFound default />
    </Router>
  );
};
export default Routes;
