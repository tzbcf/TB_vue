/**
 * FileName : webpack.dev.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:46:39
 * Description : 
 * -----
 * Last Modified: 2019-11-20 11:44:14
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
const merge = require('webpack-merge');
const base = require('./webpack.conf.js');
const webpack = require('webpack');
const path = require("path");
const resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}

module.exports = merge(base, {
    mode: 'development', // 不压缩代码,加快编译速度
    devtool: 'source-map', // 提供源码映射文件调试使用
    output: {
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader", "postcss-loader"], // 使用vue-style-loader直接插入到style标签中
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.styl(us)?$/,
                use: ["vue-style-loader", "css-loader", 'postcss-loader', "stylus-loader"],
                exclude: /node_modules/,
                include: [resolve('src')]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'initial' // +++ initial(初始块)、async(按需加载块)、all(全部块)
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 帮助减少不需要的信息展示
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })
    ],
    devServer: {
        port: 8000,
        // 通过localhost或IP进行访问
        host: '0.0.0.0',
        // 若编译过程中有错误，显示到网页上,便于定位错误
        overlay: {
            errors: true,
        },
        //热加载
        hot: true,
        compress: true, //启用 gzip 压缩
        // quiet: true,
        contentBase: path.join(__dirname, '../public')
    }
})

