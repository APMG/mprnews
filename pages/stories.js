import React from 'react';
import { Heading } from '@apmg/titan';
import MainLayout from '../layouts/MainLayout';
import Collection from '../endpoints/Collection/Collection';

/* eslint react/display-name: 0 */

export default () => (
  <MainLayout>
    <div>
      <section className="stories section">
        <Heading level={2}>Collection of Stories</Heading>
        <Collection collectionName="all-news" endpointName="story" />
      </section>
    </div>
  </MainLayout>
);
