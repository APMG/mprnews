const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
require('dotenv').config({ path: `.env.${process.env.RAILS_ENV}` });
const fs = require('fs');
const webpack = require('webpack');
module.exports = withSass(
  withImages({
    webpack: (config) => {
      const originalEntry = config.entry;
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      config.entry = async () => {
        const entries = await originalEntry();

        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./client/polyfills.js')
        ) {
          entries['main.js'].unshift('./client/polyfills.js');
        }

        return entries;
      };

      return config;
    },
    distDir: 'build',
    generateBuildId: async () => {
      // When process.env.YOUR_BUILD_ID is undefined we fall back to the default
      try {
        return fs.readFileSync('REVISION').toString();
      } catch (err) {
        return null;
      }
    }
  })
);
