/*
 * FileName : app.vue
 * ProjectName : demo
 * Author : terrorblade
 * Created Date: 2019-10-21 17:51:14
 * Description : 
 * -----
 * Last Modified: 2019-10-22 15:44:09
 * Modified By : 
 * -----
 * Copyright (c) 2019 芒果动听 Corporation. All rights reserved.
 */




<template>
    <article class="test">
        <p>
          <span class="left">{{num}}</span>
          <span cllass="right">/100</span>
          </p>
        <span>asdadadad</span>
        <span>asda1q11</span>
        <router-view></router-view>
    </article>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      timer:null,
      count:4961,
      timeNum:600,
      der:100,
      i:1,
    };
  },
  created(){
    console.log("-------------")
  },
  methods:{
    setTimer(fn,time){
      return setInterval(fn,time);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .test 
    p
      font-size 50px
      span 
        display inline-block
        width 60px
        .left
          text-align right 
        .right
          text-align left 
</style>

