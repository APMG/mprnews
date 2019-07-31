import React from 'react';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';

/* eslint react/display-name: 0 */

export default () => (
  <>
    <Metatags fullSlug="" topic="homepage" />
    <Home />
  </>
);
