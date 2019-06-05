import React from 'react';
import App from '../components/App';
import Stories from '../endpoints/Stories';

/* eslint react/display-name: 0 */

export default () => (
  <App>
    <div>
      <h1>Stories</h1>
      <Stories />
    </div>
  </App>
);
