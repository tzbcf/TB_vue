/**
 * FileName : webpack.conf.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:37:22
 * Description :
 * -----
 * Last Modified: 2019-10-22 15:56:21
 * Modified By :
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || "production",
    entry: {
        app: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"] // 使用vue-style-loader直接插入到style标签中
            },
            {
                test: /\.styl(us)?$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader?name=images/[name]-[contenthash:5].[ext]&limit=2000"
            },
            {
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory",
                exclude: "/node_modules/",
                include: path.resolve(__dirname, "../src")
            }
        ]
    },
    output: {
        filename: "[name].[hash].js",
        path:  path.resolve(__dirname, "../dist"),
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html")
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    }
};
