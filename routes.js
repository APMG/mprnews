const routes = require('next-routes');

module.exports = routes()
  .add('stories')
  .add('story', '/story/:slug');
