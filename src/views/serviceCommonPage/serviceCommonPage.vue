<template>
  <div class="">
    <!--<div class="headBgPic">
      <div class="loginLogo container">
        <div class="newLogin">
          <img src="../../assets/img/serviceBox/loginLogo.png" class="fl">
          <div class="header-menu fl">
            <a href="javascript:;">首页<span></span></a>
            <a href="javascript:;" class="selected">数据服务<span></span></a>
            <a href="javascript:;">开发平台<span></span></a>
            <a href="javascript:;">服务支持<span></span></a>
          </div>
          <div class="loginReg fr">
            <a href="javascript:;" class="btnLogin">登录</a>
            <a href="javascript:;" class="btnReg">注册</a>
          </div>
        </div>
      </div>
    </div>-->
    <serviceHead></serviceHead>
    <!--搜索-->
    <div class="searchBgPic" id="searchLayer">
      <div class="container">
        <div class="searchLayer clearfix" >
          <div class="searchBox">
            <div class="clearfix">
              <i class="icon-deltails icon-search"></i>
              <input type="text" placeholder="搜索您所需要的服务" class="searchText" v-model="keyword"/>
              <input type="button" value="搜索" class="searchBtn" @click="search()"/>
            </div>
            <div class="hotSearchName">
              <ul>
                <li v-for="item in hotMenu"><a href="javascript:;"
                                               @click="goServiceDetails(item.serviceID)">{{item.serviceName}}</a></li>
                <!-- <li><a href="javascript:;">机动车违章查询</a></li>
                 <li><a href="javascript:;">北京市预约挂号服务</a></li>
                 <li><a href="javascript:;">驾照扣分查询</a></li>
                 <li><a href="javascript:;">全国医疗机构查询</a></li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>


    <loginMask v-bind:tipSecond="tipSecond" @listenToChildEvent="closeDialog"></loginMask>


    <div class="mask" v-if="isConfirm"></div>
    <div class="dialog-container" v-if="isConfirm">
      <div class="dialog-inner ht286">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon-verPic icon-dialogClose fr" @click="close()"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-realNamePic"><img src="../../assets/img/serviceApply/picFailure.png"></div>
          <div class="dialog-realNamePrompt">对不起，该申请暂只支持已通过实名认证的用户使用</div>
          <div class="btnGoCertifi"><a href="javascript:;" @click="goConfirmStatuso">去认证</a></div>
        </div>
      </div>
    </div>


    <!--服务主体-->
    <router-view></router-view>
    <!--底部-->
    <serviceFooter></serviceFooter>
  </div>
</template>
<script>
  import serviceHead from '@/views/serviceCommonPage/serviceHead';
  import serviceFooter from '@/views/serviceCommonPage/serviceFooter';
  import loginMask from '@/views/serviceBoxDevPlatform/loginMask';
  import {mapActions, mapState, mapGetters} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        hotMenu: [
          {"serviceName": "北京社保信息查询", "serviceID": "BAA0001"},
          {"serviceName": "机动车违章查询", "serviceID": "AAA0001"},
          {"serviceName": "北京市预约挂号服务", "serviceID": "DAA0001"},
          {"serviceName": "驾照扣分查询", "serviceID": "AAB0001"},
          {"serviceName": "全国医疗机构查询", "serviceID": "DAB0003"},
        ],
        keyword: "",
        tipSecond: false,
        openID: "",
        isConfirm: false,
        confirmStatus: ""
      };
    },
    mounted() {
      if (this.$route.path.indexOf("serviceBoxPurchase") > 0 || this.$route.path.indexOf("serviceBoxApplication") > 0) {
        document.getElementById('searchLayer').style.display = "none";
      } else {
        document.getElementById('searchLayer').style.display = "block";
      }
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";
    },
    computed: {
      ...mapGetters(['getUserInfo']),
    },
    components: {
      serviceHead,
      serviceFooter,
      loginMask
    },
    created() {
    },
    methods: {
      goServiceDetails(id) {
        if (!id) {
          return
        }
        this.$router.push({
          path: '/serviceDetails',
          name: "serviceDetails",
          query: {id: id}
        })
      },
      search() {
        if (!this.keyword) {
          alert("请输入搜索关键字")
          return;
        }
        this.$router.push({
          path: '/serviceSort',
          name: "serviceSort",
          query: {keyword: this.keyword}
        })
      },
      closeDialog(flag) {
        this.tipSecond = flag;
      },
      goConfirmStatuso() {
        if (this.confirmStatus == "0") {
          this.$router.push({
            path: '/home/personalRealName/realNameMainCon'
          });
        } else {
          this.$router.push({
            path: '/home/personalRealName/realNameDetails'
          });
        }
      },
      close() {
        this.isConfirm = false;
      },
    },
    watch: {
      $route(to, from) {
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
        if (this.$route.path.indexOf("serviceBoxPurchase") > 0 || this.$route.path.indexOf("serviceBoxApplication") > 0) {
          document.getElementById('searchLayer').style.display = "none";
        } else {
          document.getElementById('searchLayer').style.display = "block";
        }
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
</style>
