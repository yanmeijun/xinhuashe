<template>
  <div class="header">
    <div class="headCon">
      <div class="logo fl">
        <span class="logoPic fl"><img src="../../assets/img/loginLogo.png"></span>
        <div class="header-menu fl" style="position: relative;">
          <router-link :to="{ path:item.hrefName}"
                       v-for="(item ,index) in headMenu" :key="index"
                       :id='"menu"+index'
                       @mouseover.native="enter(index)"
                       @mouseout.native = "leave(index)"
          >{{item.title}}</router-link>
          <span class="transtionX" ref="transtionX"></span>
        </div>
      </div>
      <div class="accountLogin fr">已有账号，<a href="javascript:;" @click=goLogin()>立即登录</a></div>
    </div>
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
      goLogin() {
        this.$router.push({
          path: '/',
          name: "index",
        })
      },
      enter(_this){
        let targetEle = document.getElementById("menu"+_this);
        this.$refs.transtionX.style.display="block";
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
