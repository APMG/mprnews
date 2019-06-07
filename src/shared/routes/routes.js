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
import PagePreviewWithData from '../components/Page/Preview';
import Schedule from '../components/Schedule/Schedule';

const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <CollectionWithData path="/topic/*" />
      <PageWithData path="/page/*" />
      <PagePreviewWithData path="/preview/pages/*" />
      <EpisodeWithData path="/episode/*" />
      <EpisodePreviewWithData path="/preview/episodes/*" />
      <StoryWithData path="/story/*" />
      <StoriesWithData path="/stories" />
      <StoryPreviewWithData path="/preview/stories/*" />
      <Weather path="/weather/*" />
      <Event path="/event/*" />
      <TwitterWithData path="/story/card/*" />
      <Schedule path="/schedule/*" />
      <NotFound default />
    </Router>
  );
};
export default Routes;
