'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
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
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
          }
      ]
    }
  });

module.exports = config;
