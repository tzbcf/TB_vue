/**
 * FileName : index.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:38:41
 * Description : 
 * -----
 * Last Modified: 2019-10-22 15:44:59
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */


import Vue from 'vue'
import App from './app.vue';
import router from './router.js';
new Vue({
    el:'#root',
    router,
    render:h=>h(App)
})