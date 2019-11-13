/**
 * FileName : vueLoader.conf.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-11-13 10:50:49
 * Description : 
 * -----
 * Last Modified: 2019-11-13 11:35:59
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */
const flag = process.env.NODE_ENV === 'production';
module.exports = () => {
    return {
        preserveWhitespace: true,        //除去空格符
        extractCSS: flag,              //css单独提取出来,再在webpack.config.base.js里面配置
                                         //开发的环境不需要,正式环境需要
        cssModules: {                    //css配置文件
            localIdentName:flag?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
            //生成的文件名称
            camelCase:true
        },
    }
}

