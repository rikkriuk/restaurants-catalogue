const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/.*$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-data-cache',
          },
        },
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/images\/small\/.*$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-small-images-cache',
          },
        },
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/images\/medium\/.*$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-medium-images-cache',
          },
        },
      ],
    }),
  ],
};
