<template>
  <div>
    <!---正确、错误提示框--start-->
    <div class="dialog-container" v-if="tips">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon-verPic icon-dialogClose fr" @click="closeDialog()"></div>
        </header>
        <div class="dialog-body">
          <div class="dialogPic"><img :src="tipsImg"></div>
          <div class="dialogWord">{{tipsContent}}</div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="tips"></div>
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
    props:["tips","loading","tipsContent","tipsImg"],
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
      closeDialog(){
        this.$emit("listenToChildEvent",false);
      },
    },
    watch:{
    }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/dialog.css";
  .loading.floatLayer div{
    color: #00c3f5;
    text-align: center;
  }
  .loading.floatLayer div img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
