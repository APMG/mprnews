import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Home from '../endpoints/Home/Home';
import Metatags from '../components/Metatags/Metatags';

/* eslint react/display-name: 0 */

const tags = [
  {
    key: 'description',
    name: 'description',
    content: "Minnesota's Online Source for News That Matters"
  },
  {
    key: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  }
];
const title = 'Minnesota Public Radio News';

export default () => (
  <MainLayout>
    <Metatags title={title} metatags={tags} links={[]} />
    <Home />
  </MainLayout>
);
