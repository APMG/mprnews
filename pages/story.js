import React from 'react';
import PropTypes from 'prop-types';
import App from '../page-components/App';
import Story from '../page-components/Story';

/* eslint react/display-name: 0 */

// export default withRouter(({ router }) => {
//   return (
//     <App>
//       <Story slug={router.query.slug} />
//     </App>
//   );
// });
const StoryPage = (props) => (
  <App>
    <Story slug={props.slug} />
  </App>
);

StoryPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};

StoryPage.propTypes = {
  slug: PropTypes.string
};

export default StoryPage;
