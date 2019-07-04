<template>
  <div>
    <!--提交申请失败-->
    <div class="dialog-publicOutLayer" v-if="tips">
        <div class="dialog-tit">提示</div>
        <div class="dialog-con">
          <div><img :src="tipsImg"></div>
          <div class="submitSuccess">{{tipsContent}}</div>
          <div class="orderCode">失败原因：{{errorTipsContent}}</div>
        </div>
        <div class="dialog-btnBox">
          <a href="javascript:;" class="blue" @click="reapply()">重新申请</a>
          <a href="javascript:;" class="backHome" @click="goBack()">返回首页</a>
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
    props:["tips","loading","tipsContent","tipsImg","errorTipsContent",'toRouter'],
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
      goBack(){
        this.$emit("listenToChildEvent",false);
        if(this.toRouter == "serviceDetail"){
          this.$router.push({
            name:"dataService"
          });
        }else if(this.toRouter == "purchase"){
          this.$router.push({
            name:"dataService"
          });
        }else if(this.toRouter == "application"){
          this.$router.push({
            name:"devPlatform"
          });
        }
      },
      reapply(){
        this.$emit("listenToChildEvent",false);
        if(this.toRouter == "serviceDetail"){
          this.$emit("listenToChildEvent",false);
        }else if(this.toRouter == "purchase"){
          this.$router.push({
            name:"dataService"
          });
        }else if(this.toRouter == "application"){
          this.$router.push({
            name:"devPlatform"
          });
        }
      }
    },
    watch:{
    }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  .loading.floatLayer div img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
