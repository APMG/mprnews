import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Collection from '../endpoints/Collection';

/* eslint react/display-name: 0 */

export default () => (
  <MainLayout>
    <div>
      <h1>All News</h1>
      <Collection collectionName="all-news" />
    </div>
  </MainLayout>
);
