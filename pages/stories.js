import React from 'react';
import Main from '../layouts/Main';
import Collection from '../endpoints/Collection';

/* eslint react/display-name: 0 */

export default () => (
  <Main>
    <div>
      <h1>All News</h1>
      <Collection collectionName="all-news" />
    </div>
  </Main>
);
