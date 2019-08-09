const path = require('path');
const { merge } = require('lodash');
const baseConfig = require('./webpack.config.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Ex = require('extract-text-webpack-plugin');

const mode = 'production';

const entry = {
  bundle: path.resolve(__dirname, '..', 'demo/src/index.js'),
};

const alias = {
  'gg-editor': path.resolve(__dirname, '..', 'src'),
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
  '@antv/g6': {
    root: 'G6',
    commonjs: 'G6',
    commonjs2: 'G6',
    amd: 'G6',
  }
};

const devtool = 'cheap-module-source-map';

const output = {
  path: path.resolve(__dirname, '..', 'demo/dist'),
  filename: '[name].js',
  //chunkFilename: '[name].bundle.js',
  libraryTarget: 'umd',
};

/*const optimization = {
  splitChunks: {
    chunks: 'all'
  }
}
*/

const plugins = [
  new Ex("styles.css"),
  //new BundleAnalyzerPlugin()
]


module.exports = merge(baseConfig, {
  mode,
  entry,
  resolve: {
    alias,
  },
  //optimization,
  externals,
  devtool,
  output,
  plugins
});
