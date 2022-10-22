/* eslint-disable import/no-extraneous-dependencies */
const WebpackObfuscator = require('webpack-obfuscator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './template.html',
      minify: false,
    }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5242880,
      cleanupOutdatedCaches: true,
      mode: 'production',
      cacheId: 'assets',
      // Define runtime caching rules.
      runtimeCaching: [
        {
          // Match any request ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

          // Apply a cache-first strategy.
          handler: 'StaleWhileRevalidate',

          options: {
            // Use a custom cache name.
            cacheName: 'images',

            // Only cache 10 images.
            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
    }),
  ],
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
      {
        test: path.resolve(__dirname, './manifest.json'),
        type: 'asset/resource',
        generator: {
          filename: './manifest.json',
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
