'use strict';

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    devServer:{
      host: '0.0.0.0',
      port: 8002,
    },
    entry: {
      display_nft_Gallery: PATHS.src + '/display_nft_Gallery.js',
      display_nft_floor_price: PATHS.src + '/display_nft_floor_price.js',
      append_hex_image: PATHS.src + '/append_hex_image.js',
      append_hex_tweet_image: PATHS.src + '/append_hex_tweet_image.js',
      popup: PATHS.src + '/popup.js',
      contentScript: PATHS.src + '/contentScript.js',
      background: PATHS.src + '/background.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.m?jsx$||\.jsx$||\.tsx$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"]
            }
          }
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
          {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"
          ],
          }
      ]
    }
  });

module.exports = config;
