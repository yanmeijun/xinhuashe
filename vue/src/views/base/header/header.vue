<template>
  <!--<header class="header clearfix" style="background:#fff;">
    <div class="leftLogo fl">
      <a class="logo-box" href="#">
        <img class="logo-pic" src="../../../assets/img/homeLogo.png" alt="logo" title="logo">
      </a>
    </div>
    <span class="headerTitle fl">统一政务服务接入审核平台</span>
    <div class="fr clearfix">
      <div class="headerTel fl"><i class="icon-tel"></i>4000-976-005</div>
      <div class="header-user-box fl" @mouseover="show" @mouseout="hide">
        <div class="userAvator clearfix">
          <img class="header-user-avator fl" src="../../../assets/img/avator.jpg" :title="admin">
          <span class="header-user-name fl">{{admin}}</span>
          <i class="icon header-user-icon fl"></i>
        </div>
        <div class="userMenu"  v-if="selectedInfo">
          <ul>
            <li><a href="javascript:void(0)" @click="exitLogon">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div>

    &lt;!&ndash;-撤销成功 弹框&ndash;&gt;
    <div class="dialog-container" v-if="success">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon2 dialog-header-close fr" @click="closeDialog()"></div>
        </header>
        <div class="dialog-body">
          <div class="dialogPic"><img src="../../../assets/img/dialog-successPic.png"></div>
          <div class="dialogWord">{{successContent}}</div>
        </div>
      </div>
    </div>
    &lt;!&ndash;-遮罩层&ndash;&gt;
    <div class="mask" v-if="success"></div>
  </header>-->
  <header class="serviceHeader clearfix">
    <div class="leftLogo fl">
      <a class="logo-box" href="#">
        <img class="logo-pic" @click="toPersonal"
             src="../../../assets/img/newPic/serviceBoxLogo.png"
             alt="logo" title="logo">
      </a>
    </div>
    <div class="fr clearfix">
      <div class="header-user-box fl" @mouseover="show" @mouseout="hide">
        <div class="userAvator clearfix">
          <img class="header-user-avator fl" src="../../../assets/img/newPic/avator.jpg" :title="admin">
          <span class="header-user-name fl">{{admin}}</span>
          <i class="icon header-user-icon fl"></i>
        </div>
        <div class="userMenu" v-if="selectedInfo">
          <ul>
            <li><a href="javascript:void(0)" @click="exitLogon">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import axios from 'axios';
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        selectedInfo: false,
        success: false,
        error: false,
        errorMgs: "",
        successContent: "退出成功",
        falg: false,
        admin: "admin",
        openID: "",
        falg: false,
        selectedInfo: false
      }
    },
    mounted() {
      let getUserInfo;
      if (this.getUserInfo) {
        getUserInfo = JSON.parse(this.getUserInfo).userName;
        this.openID = JSON.parse(this.getUserInfo).openID;
      }
      this.admin = getUserInfo;//用户名
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {},
    created() {
    },
    methods: {
      ...mapActions(['sendLoginState', 'sendUserInfo']),
      information() {
        this.falg = true;
        this.selectedInfo = this.selectedInfo == false ? this.selectedInfo = true : this.selectedInfo = false;
        this.emailSjax();
      },
      show() {
        this.falg = true;
        this.selectedInfo = true;
      },
      hide() {
        this.selectedInfo = false;
      },
      closeDialog() {
        this.success = false;
      },
      /*
      *退出登录
      */
      exitLogon() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/logout",
          async: true,
          data: {
            userName: this.admin
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            /*将用户名本地缓存清空*/
            this.sendUserInfo("");
            this.sendLoginState("0");//登录后改变登录状态 isLogin = 0 ；
            this.$router.push({
              path: '/',
              name: "index"
            })
          } else {
            this.sendLoginState("0");//登录后改变登录状态 isLogin = 0 ；
            this.$router.push({
              path: '/',
              name: "index"
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toPage() {
        let service = {
          "serviceID": "BAA0001"
        }
        this.$router.push({
          name: "serviceBoxPurchase",
          params: service,
          query: {serviceID: "BAA0001"}
        })
      },
      toPersonal() {
        this.$router.push({
          path: '/',
          name: "serviceBoxHomePage"
        })
      }
    },
    watch: {}
  }
</script>
<style scoped>
  .leftW {
    width: 68px;
    transition: all .4s;
  }

  .leftR {
    width: 160px;
    transition: all .4s;
  }
</style>
