import * as path from 'path';
import * as webpack from 'webpack'
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin'


const config: webpack.Configuration = {
    mode: 'development',
    entry: path.join(__dirname, './lib/index.ts'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist'),
        clean: true,
    },
    module: {
        rules: [{
           test: /\.ts$/,
           use: 'ts-loader' 
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

export default config