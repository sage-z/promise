
const path = require('path')
const webpack = require("webpack");
const rules = require('./webpack.rules');
const alias = require('./webpack.alias');
const log = require('electron-log')
log.transports.file.level = false;
log.transports.console.level = 'debug';

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './app/main',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],  
    alias
  },
  plugins: [new webpack.ExternalsPlugin("commonjs", ["leveldown"])]
};