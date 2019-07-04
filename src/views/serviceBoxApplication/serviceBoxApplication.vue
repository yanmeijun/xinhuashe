<template>
  <div>
    <!--当前位置-->
    <div class="container applicationTop">
      <div class="currentLocation">
        <span>当前位置：</span>
        <span>开放平台</span>
        <span class="symbol">&gt;</span>
        <span>接入申请</span>
      </div>
    </div>
    <!--服务详情、服务示例、免责声明-->
    <div class="container">
      <div class="step clearfix">
        <!-- 添加类名service-apply-active 改变高亮显示 -->
        <div class="fl service-apply-active">
          <img src="./../../assets/img/serviceApply/one.png" alt="" >
          <p class="specificSteps">
            <span >第一步</span>
            <br>
            <span>填写服务信息</span>
          </p>
          <i class="arrow fr firstStep"></i>
        </div>
        <div class="fl" id="secondStep">
          <img src="./../../assets/img/serviceApply/two.png" alt="" class="two">
          <img src="./../../assets/img/serviceApply/two2.png" alt="" class="two2">
          <p class="specificSteps">
            <span >第二步</span>
            <br>
            <span>填写接入信息</span>
          </p>
          <i class="arrow fr firstStep"></i>
        </div>
        <div class="fl " id="thirdStep">
          <img src="./../../assets/img/serviceApply/three.png" alt="" class="three">
          <img src="./../../assets/img/serviceApply/three3.png" alt="" class="three2">
          <p class="specificSteps">
            <span >第三步</span>
            <br>
            <span>补充服务申请</span>
          </p>
          <i class="arrow fr firstStep"></i>
        </div>
        <div class="fl" id="fourStep">
          <img src="./../../assets/img/serviceApply/four.png" alt="" class="four">
          <img src="./../../assets/img/serviceApply/four2.png" alt="" class="four2">
          <p class="specificSteps">
            <span >第四步</span>
            <br>
            <span>提交接入申请</span>
          </p>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <!--底部-->
  </div>
</template>
<script>
	export default{
	    name:'container',
		data(){
      return {
      };
		},
    mounted(){
      if(this.$route.path == "/serviceBoxApplication/applySecondStep"){
        document.getElementById("secondStep").classList.add('service-apply-active');
        document.getElementById("thirdStep").classList.remove('service-apply-active');
        document.getElementById("fourStep").classList.remove('service-apply-active');
      }else if(this.$route.path == "/serviceBoxApplication/applyThirdStep"){
        document.getElementById("secondStep").classList.add('service-apply-active');
        document.getElementById("thirdStep").classList.add('service-apply-active');
        document.getElementById("fourStep").classList.remove('service-apply-active');
      }else if(this.$route.path == "/serviceBoxApplication/applyFourStep"){
        document.getElementById("secondStep").classList.add('service-apply-active');
        document.getElementById("thirdStep").classList.add('service-apply-active');
        document.getElementById("fourStep").classList.add('service-apply-active');
      }
    },
    computed: {
    },
    components: {
    },
		created(){
    },
    methods:{
    },
    watch:{
      $route( to , from ){
        if(to.path == "/serviceBoxApplication/applySecondStep"){
          document.getElementById("secondStep").classList.add('service-apply-active');
          document.getElementById("thirdStep").classList.remove('service-apply-active');
          document.getElementById("fourStep").classList.remove('service-apply-active');
        }else if(to.path == "/serviceBoxApplication/applyThirdStep"){
          document.getElementById("secondStep").classList.add('service-apply-active');
          document.getElementById("thirdStep").classList.add('service-apply-active');
          document.getElementById("fourStep").classList.remove('service-apply-active');
        }else if(to.path == "/serviceBoxApplication/applyFourStep"){
          document.getElementById("secondStep").classList.add('service-apply-active');
          document.getElementById("thirdStep").classList.add('service-apply-active');
          document.getElementById("fourStep").classList.add('service-apply-active');
        } else if(to.path == "/serviceBoxApplication/applyFirstStep"){
          document.getElementById("secondStep").classList.remove('service-apply-active');
        }
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
      }
    }
	}
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";
</style>
