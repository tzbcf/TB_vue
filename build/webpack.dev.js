/**
 * FileName : webpack.dev.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:46:39
 * Description : 
 * -----
 * Last Modified: 2019-10-22 17:50:05
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
const merge = require('webpack-merge');
const base = require('./webpack.conf.js');
const webpack = require('webpack');
const path = require("path");


module.exports = merge(base, {
    mode: 'development', // 不压缩代码,加快编译速度
    devtool: 'source-map', // 提供源码映射文件调试使用
    output:{
        publicPath: "/"
    },
    optimization:{ 
        splitChunks:{ 
            chunks:'initial' // +++ initial(初始块)、async(按需加载块)、all(全部块)
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        // 帮助减少不需要的信息展示
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer:{
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

