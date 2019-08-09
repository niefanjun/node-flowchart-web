const path = require('path');
const { merge } = require('lodash');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Ex = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const workDir = __dirname + '/../';

const mode = 'development';

const entry = {
  bundle: [path.resolve(workDir, 'demo/src/index.js'),'webpack-hot-middleware/client?reload=true'],
};

const alias = {
  'gg-editor': path.resolve(workDir, 'src'),
};

const externals = {
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  'react-router-dom': {
    root: 'ReactRouterDOM',
    commonjs: 'react-router-dom',
    commonjs2: 'react-router-dom',
    amd: 'react-router-dom',
  },
  antd: {
    root: 'antd',
    commonjs: 'antd',
    commonjs2: 'antd',
    amd: 'antd',
  },
};

const devtool = 'cheap-module-eval-source-map';

const devServer = {
  contentBase: path.resolve(workDir, 'demo'),
  publicPath: '/dist',
  disableHostCheck: true,
};

const output = {
  path: path.resolve(workDir, 'demo/dist'),
  publicPath: '/',
  filename: '[name].js',
  libraryTarget: 'umd',
};

const plugins = [
  new Ex("styles.css"),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(workDir, 'demo/index.html'),
  })
]

module.exports = merge(baseConfig, {
  mode,
  entry,
  resolve: {
    alias,
  },
  externals,
  devtool,
  //devServer,
  output,
  plugins
});
