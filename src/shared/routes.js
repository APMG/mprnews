import React from 'react';
import { Router } from 'apm-titan';
import Home from './components/Home';
import Story from './components/Story';
import Weather from './components/Weather';
import Event from './components/Event';
import StoriesWithData from './components/Stories';
import NotFound from './components/Errors/NotFound';

const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <Story path="/story" />
      <StoriesWithData path="/stories" />
      <Weather path="/weather" />
      <Event path="/event" />
      <NotFound default />
    </Router>
  );
};
export default Routes;
