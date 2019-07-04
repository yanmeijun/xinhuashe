<template>
  <div>
    <!---正确、错误提示框--start-->
    <div v-if="tips&&ifSuccess" class="failedBox successBox">
      <i class="icon3 icon-success"></i>
      {{tipsContent}}
    </div>
    <div v-if="tips&&!ifSuccess" class="failedBox failBox">
      <i class="icon3 icon-failure"></i>
      {{tipsContent}}
    </div>
    <!--<div class="mask" v-if="tips"></div>-->
    <!---正确、错误提示框--end-->
    <!--加载中--start-->
    <div class="mask" v-if="loading" style="opacity: .02"></div>
    <div class="loading floatLayer" v-if="loading" style="background:none;">
      <div><img src="../../assets/img/loader.gif" width="45" height="43"></div>
      <!--<div class="loadWord">加载中，请稍候...</div>-->
    </div>
    <!--加载中--end-->
  </div>
</template>
<script>
  export default {
    name:'container',
    props:["tips","loading","tipsContent","ifSuccess"],
    data(){
      return {
        //tipsContent: '',//提示语句
       // tipsImg: ''//提示框图片src
      }
    },
    mounted(){


    },
    computed:{
    },
    components: {
    },
    created(){
    },
    methods:{

    },
    watch:{
    }
  }
</script>
<style>
  .loading.floatLayer div{
    color: #00c3f5;
    text-align: center;
  }
</style>
