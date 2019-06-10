const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
require('dotenv').config();
const webpack = require('webpack');
module.exports = withSass(
  withImages({
    webpack: (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    },
    distDir: 'build'
  })
);