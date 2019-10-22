/**
 * FileName : router.js
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-22 15:44:28
 * Description : 
 * -----
 * Last Modified: 2019-10-22 15:48:27
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import login from './login.vue'

export default new VueRouter({
    mode:'history',
    routes: [{
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    }]
})
