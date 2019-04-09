const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('ignore-loader');

module.exports = (env, argv) => {
  const devMode =
    argv && argv.mode && argv.mode !== 'production' ? true : false;
  const clientConfig = {
    entry: './src/client/index.js',
    output: {
      path: __dirname,
      filename: './build/assets/bundle.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(pdf|jpg|png|gif|svg|ico)$/,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                importer: globImporter(),
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: { presets: ['react-app'] }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode
          ? 'build/assets/[name].css'
          : 'build/assets/[name].[hash].css',
        chunkFilename: devMode
          ? 'build/assets/[id].css'
          : 'build/assets/[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: 'src/server/index.html.tmpl',
        inject: false,
        filename: 'build/index.html'
      })
    ]
  };

  const serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    output: {
      path: __dirname,
      filename: 'build/server.js',
      libraryTarget: 'commonjs2'
    },
    devtool: 'cheap-module-source-map',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(scss|pdf|jpg|png|gif|svg|ico)$/,
          loader: 'ignore-loader'
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: { presets: ['react-app'] }
        }
      ]
    }
  };
  return [clientConfig, serverConfig];
};
