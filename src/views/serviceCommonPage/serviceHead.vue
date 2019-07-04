<template>
  <div>
    <div class="headBgPic">
      <div class="loginLogo container" style="overflow: inherit;">
        <div class="newLogin">
          <img src="../../assets/img/serviceBox/loginLogo.png" class="fl">
          <div class="header-menu fl" style="position: relative;">
            <router-link :to="{ path:item.hrefName}"
                         v-for="(item ,index) in headMenu" :key="index"
                         :id='"menu"+index'
                         @mouseover.native="enter(index)"
                         @mouseout.native="leave(index)"
                         @click.native="active(index)"
                         @mouseout.native.stop
                         active-class="selected"
            >{{item.title}}
            </router-link>
            <span class="transtionX" ref="transtionX"></span>
          </div>
          <div class="loginReg fr" id="loginReg" style="display: none">
            <router-link to="/index" class="btnLogin">登录</router-link>
            <router-link to="/register" class="btnReg">注册</router-link>
          </div>
          <!--登录成功开始-->
          <div class="header-user-box fr" id="loginRegs" @mouseover="show" @mouseout="hide" style="display: none">
            <div class="userAvator clearfix" @click="toPersonal">
              <img class="header-user-avator fl" src="../../assets/img/serviceApply/userAvatar.jpg">
              <span class="header-user-name fl" id="admin">{{admin}}</span>
              <i class="icon header-user-icon fl"></i>
            </div>
            <div class="userMenu" style="background:#2b2e33;border:0;top: 47px;cursor: pointer;" v-if="selectedInfo">
              <ul>
                <!--<li><a href="#" style="color: #fff;" @click="exitLogon">退出登录</a></li>-->
                <li class="portalList"><span @click="exitLogon">退出登录</span></li>
              </ul>
            </div>
          </div>
          <!--登录成功结束-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex';
  import axios from 'axios';

  export default {
    name: 'container',
    data() {
      return {
        headMenu: [
          {"title": "首页", "hrefName": "/"},
          {"title": "数据服务", "hrefName": "/serviceCommonPage"},
          {"title": "开放平台", "hrefName": "/devPlatform"},
          {"title": "服务支持", "hrefName": "/serviceSupport"}
        ],
        isShowLogin: true,
        admin: "",
        falg: false,
        selectedInfo: false,
        openID: ""
      };
    },
    mounted() {
      for (let i = 0; i < 4; i++) {
        if (!("classList" in document.documentElement)) {
          Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function () {
              var self = this;
              function update(fn) {
                return function (value) {
                  var classes = self.className.split(/\s+/g),
                    index = classes.indexOf(value);

                  fn(classes, index, value);
                  self.className = classes.join(" ");
                }
              }

              return {
                add: update(function (classes, index, value) {
                  if (!~index) classes.push(value);
                }),

                remove: update(function (classes, index) {
                  if (~index) classes.splice(index, 1);
                }),

                toggle: update(function (classes, index, value) {
                  if (~index)
                    classes.splice(index, 1);
                  else
                    classes.push(value);
                }),

                contains: function (value) {
                  return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function (i) {
                  return self.className.split(/\s+/g)[i] || null;
                }
              };
            }
          });
        }


        if (document.getElementById("menu" + i).classList.contains('selected')) {
          document.getElementById("menu" + i).classList.remove('selected');
        }
        if (document.getElementById("menu" + i).classList.contains('router-link-exact-active')) {
          if (document.getElementById("menu" + i).innerText.length == 2) {
            this.$refs.transtionX.style.left = "44px";
          } else {
            this.$refs.transtionX.style.left = document.getElementById("menu" + i).offsetLeft + 56 + "px";
          }
          ;
        }
      }
      ;
      if (this.$route.path.indexOf("serviceCommonPage") > 0) {
        document.getElementById("menu1").classList.add('selected');
        this.$refs.transtionX.style.left = document.getElementById("menu1").offsetLeft + 56 + "px";
      } else if (this.$route.path.indexOf("serviceBoxApplication") > 0 || this.$route.path.indexOf("devPlatform") > 0) {
        document.getElementById("menu2").classList.add('selected');
        this.$refs.transtionX.style.left = document.getElementById("menu2").offsetLeft + 56 + "px";
      } else if (this.$route.path.indexOf("serviceSupport") > 0) {
        document.getElementById("menu3").classList.add('selected');
        this.$refs.transtionX.style.left = document.getElementById("menu3").offsetLeft + 56 + "px";
      }
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";


      this.admin = this.getUserInfo ? JSON.parse(this.getUserInfo).userName : "";
      this.bus.$on('headInforShow', function (title) {
        document.getElementById('loginReg').style.display = "none";
        document.getElementById('loginRegs').style.display = "block";
        document.getElementById('admin').innerHTML = title;
        this.admin = title;
      })

      this.getLoginInfo();
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      ...mapGetters(['getLoginState'])
    },
    components: {},
    created() {

    },
    methods: {
      ...mapActions(['sendUserInfo']),
      enter(_this) {
        let targetEle = document.getElementById("menu" + _this);
        if (targetEle.innerText.length == 3 || targetEle.innerText.length == 2) {
          this.$refs.transtionX.style.left = "44px";
        } else {
          this.$refs.transtionX.style.left = targetEle.offsetLeft + 56 + "px";
        }
        for (let i = 0; i < 4; i++) {
          if (document.getElementById("menu" + i).classList.contains('selected')) {
            document.getElementById("menu" + i).classList.remove('selected');
          }
        }
        targetEle.classList.add('selected');
      },
      leave(_this) {
        if (this.$route.path == "/serviceCommonPage/dataService" || this.$route.path == '/serviceCommonPage/serviceDetails' || this.$route.path.indexOf("serviceBoxPurchase") > 0) {
          document.getElementById("menu" + _this).classList.remove('selected');
          document.getElementById("menu1").classList.add('selected');
          this.$refs.transtionX.style.left = document.getElementById("menu1").offsetLeft + 56 + "px";
          return
        } else if (this.$route.path == "/serviceBoxApplication/applyFirstStep" || this.$route.path.indexOf("devPlatform") > 0) {
          document.getElementById("menu" + _this).classList.remove('selected');
          document.getElementById("menu2").classList.add('selected');
          this.$refs.transtionX.style.left = document.getElementById("menu2").offsetLeft + 56 + "px";
          return
        } else if (this.$route.path.indexOf("serviceSupport") > 0) {
          document.getElementById("menu" + _this).classList.remove('selected');
          document.getElementById("menu3").classList.add('selected');
          this.$refs.transtionX.style.left = document.getElementById("menu3").offsetLeft + 56 + "px";
          return
        } else if (this.$route.path.indexOf("serviceBoxApplication") > 0) {
          document.getElementById("menu" + _this).classList.remove('selected');
          document.getElementById("menu2").classList.add('selected');
          this.$refs.transtionX.style.left = document.getElementById("menu2").offsetLeft + 56 + "px";
          return
        }
        for (let i = 0; i < 4; i++) {
          if (document.getElementById("menu" + i).classList.contains('selected')) {
            document.getElementById("menu" + i).classList.remove('selected');
          }
          if (document.getElementById("menu" + i).classList.contains('router-link-exact-active')) {
            if (document.getElementById("menu" + i).innerText.length == 2 || document.getElementById("menu" + i).innerText.length == 3) {
              this.$refs.transtionX.style.left = "44px";
            } else {
              this.$refs.transtionX.style.left = document.getElementById("menu" + i).offsetLeft + 56 + "px";
            }
            ;
          }
        }
      },
      active(_this) {

      },
      getLoginInfo() {
        this.$http({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/isLogin",
          async: true,
          data: {
            openID: this.openID
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "402") {
            this.isShowLogin = true;
            document.getElementById('loginReg').style.display = "block";
            document.getElementById('loginRegs').style.display = "none";
          } else {
            if (this.getUserInfo) {
              this.admin = JSON.parse(this.getUserInfo).userName;
            }
            this.isShowLogin = false;
            document.getElementById('loginReg').style.display = "none";
            document.getElementById('loginRegs').style.display = "block";
          }
        }).catch(err => {
          console.log(err)
        });
      },
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
            this.$router.push({
              path: '/',
              name: "index"
            })
          } else {
            this.$router.push({
              path: '/',
              name: "index"
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      show() {
        this.falg = true;
        this.selectedInfo = true;
      },
      hide() {
        this.selectedInfo = false;
      },
      toPersonal() {
        this.$router.push({
          path: '/home/personalCenter',
          name: "personalCenter"
        })
      }
    },
    watch: {
      $route(to, from) {
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
        this.getLoginInfo();
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
</style>
