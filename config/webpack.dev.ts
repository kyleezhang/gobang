import * as webpack from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import ESlintWebpackPlugin from 'eslint-webpack-plugin';
import WebpackBaseConfig from './webpack.base';

const config: webpack.Configuration = merge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    static: './dist',
  },
  plugins: [
    new ESlintWebpackPlugin({
      extensions: ['.js', '.ts'],
    }),
  ],
});

export default config;
