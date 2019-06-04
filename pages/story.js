import React from 'react';
import { withRouter } from 'next/router';
import App from '../page-components/App';
import Story from '../page-components/Story';

/* eslint react/display-name: 0 */

export default withRouter((props) => (
  <App>
    <Story slug={props.router.query.slug} />
  </App>
));
