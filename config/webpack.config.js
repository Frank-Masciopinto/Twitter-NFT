'use strict';

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      display_nft_Gallery: PATHS.src + '/display_nft_Gallery.js',
      display_nft_floor_price: PATHS.src + '/display_nft_floor_price.js',
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
