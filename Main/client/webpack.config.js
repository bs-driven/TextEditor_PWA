const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'jate'
      }),

      new MiniCssExtractPlugin(),
      new WorkboxPlugin.GenerateSW(),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-switch.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        ios: {
          'apple-touch-icon': 'JATE',
          "apple-mobile-web-app-capable": true
        },
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 144, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            purpose: 'any',
          }
        ]
      })

      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader'|MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        } 
        
      ],
    },
  };
};
