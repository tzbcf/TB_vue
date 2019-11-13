/**
 * FileName : webpack.conf.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:37:22
 * Description :
 * -----
 * Last Modified: 2019-11-13 11:37:43
 * Modified By :
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const vueLoaderConfig = require("./vue-loader.conf");
const resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: process.env.NODE_ENV || "production",
    entry: {
        app: "./src/index.js"
    },
    module: {
        rules: [ //include 指定编译目录，减少遍历与性能损失，exclude排除目录。增加性能
            {
                test: /\.vue$/,
                use: ["vue-loader"],
                // options: vueLoaderConfig,
                include: [resolve('src'), resolve('node_modules/vue-easytable/libs')],
                exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"], // 使用vue-style-loader直接插入到style标签中
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.styl(us)?$/,
                loader: 'style-loader!css-loader!stylus-loader',
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader?name=images/[name]-[contenthash:5].[ext]&limit=2000",
                exclude: /node_modules/,
                include: [resolve('src/assets')]
            },
            {
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory",
                exclude: /node_modules/,
                include: [resolve('src')]
            }
        ]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "../dist"),
    },
    plugins: [
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,

        }),
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
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules') // 减少搜索范围
        ],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            '@': resolve('src'), // 设置路径
        }
    }
};
