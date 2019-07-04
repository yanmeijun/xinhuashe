<template>
<div>
  <div v-show="popShow" class="mask"></div>
  <!--成功提示 start-->
  <div v-show="popSucc" class="dialog">
    <div class="title">
      <span>提示</span>
      <span class="close">
          <img src="../../../assets/img/close.jpg"/>
        </span>
    </div>
    <div class="body">
      <img src="../../../assets/img/ok.jpg"/>
    </div>
  </div>
  <!--成功提示 end-->
  <!--失败提示 start-->
  <div v-show="popErr" class="dialog">
    <div class="title">
      <span>提示</span>
      <span class="close">
          <img src="../../../assets/img/close.jpg"/>
        </span>
    </div>
    <div class="body">
      <img src="../../../assets/img/err.jpg"/>
    </div>
  </div>
  <!--失败提示 end-->
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:'pop',
    data(){
      return {
        popShow:false,
        popSucc:false,
        popErr:false
      }
    },
    computed:{
    },
    components: {

    },
    created(){

    },
    mounted(){
      this.bus.$on('dialog', function (title) {
        console.log(title);
        if(title=='succ'){
          this.popShow=true;
          this.popSucc=true;
          console.log(this.popShow)
        }else if(title=='err'){
          this.popShow=true;
          this.popErr=true;
        }
      })
    },
    methods:{

    },
    watch:{
      popShow:{
        handler () {
          console.log('改变了');
        },
        deep:true
      },
    }
  }
</script>
<style>
  .mask{
    width:100%;
    height:100%;
    position:fixed;
    z-index:201;
    background:rgba(0,0,0,0.5) !important;
  }
  .dialog{
    z-index:202;
    width:496px;
    position:fixed;
    left:50%;
    top:50%;
    margin-left:-248px;
    margin-top:-130px;
    height:260px;
    background:#fff;

  }
  .dialog .title{
    position:relative;
    height:44px;
    background:#f7f6fb;
  }
  .dialog .title .close{
    position:absolute;
    right:0;
    top:0;
    width:22px;
    height:22px;
    cursor:pointer;
  }
</style>
