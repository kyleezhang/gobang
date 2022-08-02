import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import WebpackBaseConfig from './webpack.base';

const config: webpack.Configuration = merge(WebpackBaseConfig, {
  mode: 'production',
});

export default config;
