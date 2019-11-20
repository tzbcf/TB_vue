/**
 * FileName : webpack.build.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:47:19
 * Description : 
 * -----
 * Last Modified: 2019-11-20 11:48:18
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */


const merge = require('webpack-merge');
const base = require('./webpack.conf.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 串行压缩
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); // 并行压缩代码，增强性能
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin')
const resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}

module.exports = merge(base, {
    mode: 'production', // 压缩代码
    output: {
        publicPath: "./"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // 使用vue-style-loader直接插入到style标签中
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.styl(us)?$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
                exclude: /node_modules/,
                include: [resolve('src')]
            },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        runtimeChunk: true,
        minimizer: [
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true
            // }),
            new ParallelUglifyPlugin({
                cacheDir: 'cache/',
                uglifyJS: {
                    output: false,
                },
                compress: {
                    warnings: true,
                    drop_console: true
                }
            }),
            new OptimizeCSSAssetsPlugin({}),
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
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, '../src/')
            ]),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        }),
        new MiniCssExtractPlugin({
            filename:  'css/[name].[hash].css',
            chunkFilename:  'css/[id].[hash].css',
        }),
    ],
})