<template>
  <div>
    <!--当前位置-->
    <!--<div class="container">
      <div class="currentLocation">
        <span>当前位置：</span>
        <span @click="toServicePage()">数据服务</span>
        <span class="symbol">&gt;</span>
        <span @click="renderToDetail()">{{serviceInfo.serviceName}}</span>
        <span class="symbol">&gt;</span>
        <span >服务申请</span>
      </div>
    </div>-->
    <!--服务详情、服务示例、免责声明-->
    <div class="container" style="margin-top: 96px;">
      <div class="step clearfix">
        <!-- 添加类名service-apply-active 改变高亮显示 -->
        <div class="fl service-apply-active">
          <img src="../../assets/img/serviceApply/one.png" alt="" >
          <p class="specificSteps">
            <span >第一步</span>
            <br>
            <span>填写服务信息</span>
          </p>
          <i class="arrow fr firstStep"></i>
        </div>
        <div class="fl" id="secondStep">
          <img src="../../assets/img/serviceApply/two.png" alt="" class="two">
          <img src="../../assets/img/serviceApply/two2.png" alt="" class="two2">
          <p class="specificSteps">
            <span >第二步</span>
            <br>
            <span>填写联系人信息</span>
          </p>
          <i class="arrow fr firstStep"></i>
        </div>
        <div class="fl" id="thirdStep">
          <img src="../../assets/img/serviceApply/three.png" alt="" class="three">
          <img src="../../assets/img/serviceApply/three3.png" alt="" class="three2">
          <p class="specificSteps">
            <span >第三步</span>
            <br>
            <span>提交服务申请</span>
          </p>
        </div>
      </div>
      <!--采购步骤-->
      <router-view></router-view>
      <!-- 第二步 -->
      <!-- 第三步 -->
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
	export default{
	    name:'container',
		data(){
      return {"serviceInfo":{serviceID:this.$route.query.serviceID,serviceName:this.$route.query.serviceName}
      };
		},
    mounted(){
      if(this.$route.path == "/serviceCommonPage/serviceBoxPurchase/secondStep"){
        document.getElementById("secondStep").classList.add('service-apply-active');
        document.getElementById("thirdStep").classList.remove('service-apply-active');
      }else if(this.$route.path == "/serviceCommonPage/serviceBoxPurchase/thirdStep"){
        document.getElementById("secondStep").classList.add('service-apply-active');
        document.getElementById("thirdStep").classList.add('service-apply-active');
      }else if(this.$route.path == "/serviceCommonPage/serviceBoxPurchase/firstStep"){
        document.getElementById("secondStep").classList.remove('service-apply-active');
        document.getElementById("thirdStep").classList.remove('service-apply-active');
      }
    },
    computed: {
    },
    components: {
    },
		created(){
      this.bus.$on('step', function (title) {
        if(title == "secondStep"){
          document.getElementById("secondStep").classList.add('service-apply-active');
        }
      })
    },
    methods:{
    renderToDetail(){
      this.$router.push({
        path: '/serviceDetails',
        name: "serviceDetails",
        query: {id: this.$route.query.serviceID}
      })
    },
    toServicePage(){
      this.$router.push({
        path: '/dataService',
        name: "dataService"
      })
    }
    },
    watch:{
      $route( to , from ){
        if(to.path == "/serviceCommonPage/serviceBoxPurchase/firstStep"){
          document.getElementById("secondStep").classList.remove('service-apply-active');
          document.getElementById("thirdStep").classList.remove('service-apply-active');
        }else if(to.path == "/serviceCommonPage/serviceBoxPurchase/thirdStep"){
          document.getElementById("secondStep").classList.add('service-apply-active');
          document.getElementById("thirdStep").classList.add('service-apply-active');
        }else if(to.path == "/serviceCommonPage/serviceBoxPurchase/secondStep"){
          document.getElementById("thirdStep").classList.remove('service-apply-active');
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
