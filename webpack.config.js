const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
require('ignore-loader');
const fs = require('fs');

let HASH = null;
try {
  HASH = fs
    .readFileSync('REVISION')
    .toString()
    .substring(0, 10);

  fs.writeFile('HASH.json', `"${HASH}"`, function(err) {
    if (err) {
      return console.error(err); //eslint-disable-line
    }
  });
} catch (err) {
  HASH = null;

  fs.unlink('HASH.json', () => {});
}

module.exports = (env, argv) => {
  const devCmsEndpoint = `https://cmsproxy-dev.publicradio.org/api/v1/graphql`;
  const prodCmsEndpoint = `https://cmsproxy.publicradio.org/api/v1/graphql`;

  const graphqlEnv =
    process.env.NODE_ENV === 'development' ? devCmsEndpoint : prodCmsEndpoint;

  const devMode =
    argv && argv.mode && argv.mode !== 'production' ? true : false;

  const clientConfig = {
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
      path: __dirname,
      filename: './build/assets/bundle.js'
    },
    devtool: 'cheap-module-source-map',
    stats: {
      // 'warnings': false
      warningsFilter: ["Can't resolve '../../../HASH.json"]
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
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
      }),
      new CopyPlugin([
        {
          from: './src/shared/config',
          to: !HASH
            ? './build/assets/[path][name].[ext]'
            : `./build/assets/[path][name].${HASH}.[ext]`,
          ignore: ['config.js', '.DS_Store*', 'index.js']
        },
        {
          from: './src/shared/assets',
          to: './build/assets',
          ignore: ['config.js', '.DS_Store*', 'index.js']
        }
      ]),
      new webpack.DefinePlugin({
        'process.env.URL_ENV': JSON.stringify(graphqlEnv)
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
    stats: {
      warningsFilter: ["Can't resolve '../../../HASH.json"]
    },
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
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.URL_ENV': JSON.stringify(graphqlEnv)
      })
    ]
  };

  return [clientConfig, serverConfig];
};
