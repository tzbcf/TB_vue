/**
 * FileName : webpack.build.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:47:19
 * Description : 
 * -----
 * Last Modified: 2019-10-22 16:07:39
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */


const merge = require('webpack-merge');
const base = require('./webpack.conf.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base, {
    mode: 'production', // 压缩代码
    output:{
        publicPath: "./"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {
                  compress: {
                    drop_console: true
                  }
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(new MiniCssExtractPlugin({
            filename: "css/[name]_[contenthash].css"
        })),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, '../src/')
            ]),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        }),
    ]
})