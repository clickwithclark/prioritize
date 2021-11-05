/* eslint-disable import/no-extraneous-dependencies */
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new MiniCssExtractPlugin({ filename: './css/[name].[contenthash].css' })],
  output: {
    filename: './js/[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    // library: {
    //   type: 'umd',
    // },
    // // prevent error: `Uncaught ReferenceError: self is not defined`
    // globalObject: 'this',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: true,
          mangle: true,
          sourceMap: false,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devtool: 'hidden-source-map',
  // watch: true,
});
