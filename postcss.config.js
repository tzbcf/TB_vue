/**
 * FileName : postcss.config.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-22 10:32:12
 * Description : 
 * -----
 * Last Modified: 2019-10-22 10:32:23
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

module.exports = {
    loader: 'postcss-loader',
    plugins: [
        require('autoprefixer')
    ]
}
