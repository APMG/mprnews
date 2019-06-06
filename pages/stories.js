import React from 'react';
import App from '../components/App';
import Collection from '../endpoints/Collection';

/* eslint react/display-name: 0 */

export default () => (
  <App>
    <div>
      <h1>All News</h1>
      <Collection collectionName="all-news" />
    </div>
  </App>
);
