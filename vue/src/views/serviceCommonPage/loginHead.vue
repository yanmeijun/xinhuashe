<template>
  <div class="loginLogo">
    <!--头部信息修改 start-->
    <div class="newLogin container">
      <img src="../../assets/img/serviceBox/loginLogo.png" class="fl">
      <div class="header-menu fl" style="position: relative;">
       <!-- <a href="" class="selected" >首页</a>-->
       <!-- <a href="" @mouseenter="enter(index)" @mouseleave="leave()">数据服务</a>-->
        <router-link :to="{ path:item.hrefName}"
           v-for="(item ,index) in headMenu" :key="index"
           :id='"menu"+index'
           @mouseover.native="enter(index)"
           @mouseout.native = "leave(index)"
           >{{item.title}}</router-link>
        <!--<a href="">服务支持</a>-->
        <span class="transtionX" ref="transtionX"></span>
      </div>
    </div>
    <!--头部信息修改 end-->
  </div>
</template>
<script>
  export default{
    name:'container',
    data(){
      return {
        headMenu:[
          {"title":"首页","hrefName":"/"},
          {"title":"数据服务","hrefName":"/serviceCommonPage"},
          {"title":"开放平台","hrefName":"/devPlatform"},
          {"title":"服务支持","hrefName":"/serviceSupport"}
        ]
      };
    },
    mounted(){
      this.$refs.transtionX.style.display="none";
    },
    computed: {
    },
    components: {
    },
    created(){

    },
    methods:{
      enter(_this){
        this.$refs.transtionX.style.display="block";
        let targetEle = document.getElementById("menu"+_this);
        if(targetEle.innerText.length==2){
          this.$refs.transtionX.style.left="44px";
        }else{
          this.$refs.transtionX.style.left=targetEle.offsetLeft+56+"px";
        };

        for(let i=0;i<4;i++){
          if(document.getElementById("menu"+i).classList.contains('selected')){
            document.getElementById("menu"+i).classList.remove('selected');
          }
        }
        targetEle.classList.add('selected');
      },
      leave(_this){
        for(let i=0;i<4;i++){
          if(document.getElementById("menu"+i).classList.contains('selected')){
            document.getElementById("menu"+i).classList.remove('selected');
          }
          this.$refs.transtionX.style.display="none";
        }
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
</style>
