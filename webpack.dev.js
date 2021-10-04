/* eslint-disable import/no-extraneous-dependencies */
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/dev'),
    library: {
      type: 'umd',
    },
    // prevent error: `Uncaught ReferenceError: self is not defined`
    globalObject: 'this',
  },
});
