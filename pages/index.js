import React from 'react';
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
const title = '';

export default () => (
  <>
    <Metatags title={title} metatags={tags} links={[]} />
    <Home />
  </>
);
