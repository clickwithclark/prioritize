/* eslint-disable import/no-extraneous-dependencies */

// Imports
const WebpackObfuscator = require('webpack-obfuscator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/js/index.js'],
    bootstrap: './src/js/bootstrap.js',
    'font-awesome': './src/js/fontawesome.js',
  },

  devtool: 'source-map',

  // Output rules for processing files
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'], // Process HTML files so assets can be imported
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][hash][ext]', // Cache-busted asset filenames
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext]', // Cache-busted font filenames
        },
      },
      {
        test: path.resolve(__dirname, './manifest.json'),
        type: 'asset/resource',
        generator: {
          filename: './manifest.json', // Output manifest as-is
        },
      },
    ],
  },

  plugins: [
    // Generate final HTML from template
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './template.html',
      minify: false,
    }),

    // Generate a service worker for PWA support
    new WorkboxPlugin.GenerateSW({
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // Set limit to 4 MB
      clientsClaim: true,           // Take control of pages as soon as SW activates
      skipWaiting: true,            // Immediately activate SW instead of waiting
      cleanupOutdatedCaches: true,  // Remove old caches
      navigateFallback: '/index.html', // Fallback for offline navigation (SPA behavior)
      cacheId: 'clark-assets',      // Unique cache namespace

      // Automatically precache Webpack build assets using hashes as revisions
      include: [/\.html$/, /\.js$/, /\.css$/, /\.woff2?$/, /\.png$/, /\.jpe?g$/, /\.svg$/],
      
      runtimeCaching: [
           {
      // Cache CSS files immediately, while allowing updates
      // to be fetched in the background
      urlPattern: /\.(css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'css-cache',
        expiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache CSS for 30 days
        },
      },
    },
        {
          //
          urlPattern: ({ url }) => url.origin === self.location.origin,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'site-pages',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
            },
          },
        },
      ],
    }),

    // Obfuscate JavaScript to protect logic (optional, adjust exclusions as needed)
   /* new WebpackObfuscator({
      rotateStringArray: true,
    }, ['excluded_bundle_name.js']),*/
  ],
};
