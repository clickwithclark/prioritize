/* eslint-disable import/no-extraneous-dependencies */
const WebpackObfuscator = require('webpack-obfuscator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [new HtmlWebpackPlugin({ template: './src/template/index.html' })],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpe?g|png|gif,svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][hash][ext]',
        },
      },
      {
        test: /\.(woff?2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext]',
        },
      },
    ],
  },
  entry: {
    main: ['./src/js/index.js'],
    bootstrap: './src/js/bootstrap.js',
    'font-awesome': './src/js/fontawesome.js',
  },

  devtool: 'source-map',
};
