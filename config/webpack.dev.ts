import * as webpack from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import ESlintWebpackPlugin from 'eslint-webpack-plugin';
import WebpackBaseConfig from './webpack.base';

const config: webpack.Configuration = merge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    port: 8082,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ESlintWebpackPlugin({
      extensions: ['.js', '.ts'],
    }),
  ],
});

export default config;
