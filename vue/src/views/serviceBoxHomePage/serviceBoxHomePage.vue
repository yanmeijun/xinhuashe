<template>
  <div style="background-color: #ecf0f9;">
    <!--头部导航-->
    <div class="headBgPic">
      <div class="loginLogo container" style="overflow: inherit;">
        <div class="newLogin">
          <img src="../../assets/img/serviceBox/loginLogo.png" class="fl">
          <div class="header-menu fl" style="position: relative;">
            <!--<a href="javascript:;"  class="selected">首页<span></span></a>
            <router-link to="/serviceCommonPage">数据服务</router-link>
            <router-link to="/serviceSupport">开发平台</router-link>
            <router-link to="/serviceSupport">服务支持<span></span></router-link>-->
            <router-link :to="{ path:item.hrefName}"
                         v-for="(item ,index) in headMenu" :key="index"
                         :id='"menu"+index'
                         @mouseover.native="enter(index)"
                         @mouseout.native="leave(index)"
            >{{item.title}}
            </router-link>
            <span class="transtionX" ref="transtionX"></span>
          </div>
          <div class="loginReg fr" id="loginReg" style="display: none">
            <router-link to="/index" class="btnLogin">登录</router-link>
            <router-link to="/register" class="btnReg">注册</router-link>
            <!-- <a href="javascript:;" class="btnLogin">登录</a>
             <a href="javascript:;" class="btnReg">注册</a>-->
          </div>
          <!--登录成功开始-->
          <div class="header-user-box fr" id="loginRegs" @mouseover="show" @mouseout="hide" style="display: none">
            <div class="userAvator clearfix" @click="toPersonal">
              <img class="header-user-avator fl" src="../../assets/img/serviceApply/userAvatar.jpg">
              <span class="header-user-name fl">{{admin}}</span>
              <i class="icon header-user-icon fl"></i>
            </div>
            <div class="userMenu" style="background:#2b2e33;border:0;top: 47px;cursor: pointer;" v-if="selectedInfo">
              <ul>
                <li class="portalList"><span @click="exitLogon">退出登录</span></li>
              </ul>
            </div>
          </div>
          <!--登录成功结束-->

        </div>
      </div>
    </div>
    <!---->
    <div style="position: fixed;top: 0px;width: 100%;height:100%;">
      <div class="mainConBg" id="section-wrap" style="transition: transform 0.3s linear;position: relative;">
        <!--1-->
        <div class="homeScreen second1">
          <div class="container home1 clearfix">
            <div class="fl">
              <div class="bigTit">服务盒子</div>
              <div class="smallTit">快速集约服务事项，让服务应用更高效</div>
              <div class="btnMore"><a href="javascript:;">了解更多</a></div>
            </div>
            <div class="fr index-1-pic">
              <img src="../../assets/img/serviceBox/index-1-pic.png">
            </div>
          </div>
        </div>
        <!--2-->
        <div class="homeScreen second2">
          <div class="container">
            <div class="publicBraitBox clearfix">
              <div class="matterLlistBg secondScreenBg1 clearfix">
                <div class="fl publicListTrait">
                  <div class="bigTit">服务事项多</div>
                  <div class="smallTit">即采即用</div>
                </div>
                <div class="fr publicListPic">
                  <img src="../../assets/img/serviceBox/matterPic1.png">
                </div>
              </div>
              <div class="matterLlistBg secondScreenBg2">
                <div class="fl publicListTrait">
                  <div class="bigTit">开发速度快</div>
                  <div class="smallTit">沟通成本低</div>
                </div>
                <div class="fr publicListPic">
                  <img src="../../assets/img/serviceBox/matterPic2.png">
                </div>
              </div>
              <div class="matterLlistBg secondScreenBg3">
                <div class="fl publicListTrait">
                  <div class="bigTit">技术安全可靠</div>
                  <div class="smallTit">独有专利</div>
                </div>
                <div class="fr publicListPic">
                  <img src="../../assets/img/serviceBox/matterPic3.png">
                </div>
              </div>
              <div class="matterLlistBg secondScreenBg4">
                <div class="fl publicListTrait">
                  <div class="bigTit">支持流程重构</div>
                  <div class="smallTit">适应性强</div>
                </div>
                <div class="fr publicListPic">
                  <img src="../../assets/img/serviceBox/matterPic4.png">
                </div>
              </div>
            </div>
            <div class="hotRecommend">
              <div class="hotTit">热门推荐</div>
              <div class="hotSamll">提供社会关注度高、高频热门、易形成社会影响力的便企利民服务</div>
              <div class="hotSerList clearfix">
                <div class="marLR" v-for="(item ,index) in serviceListArr" :key="index"
                     @click="goServiceDetails(item.serviceID)">
                  <div class="hotService whiteBG">
                    <div class="picBox"><img :src="item.src"></div>
                    <div class="name">{{item.serviceName}}</div>
                    <div class="subDescribe">{{item.summary}}</div>
                    <div class="more"><a href="javascript:;">了解更多</a></div>
                  </div>
                </div>
                <!--<div class="marLR">
                  <div class="hotService whiteBG">
                    <div class="picBox"><img src="../../assets/img/serviceBox/hotRecommend2.png"></div>
                    <div class="name">预约挂号</div>
                    <div class="subDescribe">用于全国医疗机构查询</div>
                    <div class="more"><a href="javascript:;">了解更多</a></div>
                  </div>
                </div>
                <div class="marLR">
                  <div class="hotService whiteBG">
                    <div class="picBox"><img src="../../assets/img/serviceBox/hotRecommend3.png"></div>
                    <div class="name">驾照记分</div>
                    <div class="subDescribe">全国范围交通违法记录查询</div>
                    <div class="more"><a href="javascript:;">了解更多</a></div>
                  </div>
                </div>
                <div class="marLR">
                  <div class="hotService whiteBG">
                    <div class="picBox"><img src="../../assets/img/serviceBox/hotRecommend4.png"></div>
                    <div class="name">12315</div>
                    <div class="subDescribe">消费者投诉举报平台</div>
                    <div class="more"><a href="javascript:;">了解更多</a></div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <!--3-->
        <div class="homeScreen second3">
          <div class="container">
            <div class="hotTit">服务覆盖全国各地</div>
            <div class="hotSamll">将互联网上的全国各地政务服务事项、公共服务事项、便民服务事项快速集约、融合和数据交互</div>
            <div class="clearfix">
              <div class="fl mattersNum">
                <div class="mattersList clearfix">
                  <div class="icon-serviceArea icon-provinces fl"></div>
                  <div class="fl">
                    <div class="num">34</div>
                    <div class="word">覆盖全国34个省市</div>
                  </div>
                </div>
                <div class="mattersList clearfix">
                  <div class="icon-serviceArea icon-matters fl"></div>
                  <div class="fl">
                    <div class="num">3000 +</div>
                    <div class="word">约3000以上的服务事项</div>
                  </div>
                </div>
                <div class="mattersList clearfix">
                  <div class="icon-serviceArea icon-volume fl"></div>
                  <div class="fl">
                    <div class="num">2000<span> w </span>+</div>
                    <div class="word">日浏览和服务量2000w以上</div>
                  </div>
                </div>
              </div>
              <div class="fl mapBox">
                <img src="../../assets/img/serviceBox/map-1.png">
                <div class="mapHotSpot postition-1">
                  <span class="dot"></span>
                  <span class="pulse delay-01"></span>
                  <span class="pulse delay-02"></span>
                  <span class="pulse delay-03"></span>
                  <span class="hide">吉林</span>
                </div>
                <div class="mapHotSpot postition-2">
                  <span class="dot"></span>
                  <span class="pulse delay-01"></span>
                  <span class="pulse delay-02"></span>
                  <span class="pulse delay-03"></span>
                  <span class="hide">北京</span>
                </div>
                <div class="mapHotSpot postition-3">
                  <span class="dot"></span>
                  <span class="pulse delay-01"></span>
                  <span class="pulse delay-02"></span>
                  <span class="pulse delay-03"></span>
                  <span class="hide">重庆</span>
                </div>
                <div class="mapHotSpot postition-4">
                  <span class="dot"></span>
                  <span class="pulse delay-01"></span>
                  <span class="pulse delay-02"></span>
                  <span class="pulse delay-03"></span>
                  <span class="hide">广东</span>
                </div>
                <div class="mapHotSpot postition-5">
                  <span class="dot"></span>
                  <span class="pulse delay-01"></span>
                  <span class="pulse delay-02"></span>
                  <span class="pulse delay-03"></span>
                  <span class="hide">西藏</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--4-->
        <div class="homeScreen second4">
          <div class="container" style="height: auto">
            <div class="hotTit">经典案例</div>
            <div class="hotSamll">聚焦“互联网+政务服务”</div>
            <div class="clearfix serviceCase">
              <div class="whiteBG fl"><img src="../../assets/img/serviceBox/caseXHS.png"></div>
              <div class="whiteBG fl"><img src="../../assets/img/serviceBox/caseSC.png"></div>
              <div class="whiteBG fl"><img src="../../assets/img/serviceBox/caseDG.png"></div>
              <div class="whiteBG fl"><img src="../../assets/img/serviceBox/caseHN.png"></div>
            </div>
          </div>
          <div class="customServicebg">
            <div class="tipsWord">没有想要的服务？可以联系我们，定制专属服务。</div>
            <div class="btnCustomBox"><a href="javascript:;">定制服务</a></div>
          </div>
        </div>
        <!--5-->
        <div class="homeScreen second5">
          <div class="footerBG homeFooterBg">
            <div class="container clearfix">
              <div class="footerList">
                <div class="tit">联系与支持</div>
                <ul>
                  <li><router-link to="/serviceSupport/commonProblem">常见问题</router-link></li>
                  <li><router-link to="/serviceSupport/teacherRelated">技术相关</router-link></li>
                  <li><router-link to="/serviceSupport/operationRelated">操作相关</router-link></li>
                  <li><router-link to="/serviceSupport/helpCenter">帮助中心</router-link></li>
                </ul>
              </div>
              <div class="footerList">
                <div class="tit">关于我们</div>
                <ul>
                  <li><a href="https://www.kaipuyun.cn/kp/gongsi/ucap.shtml#ucap-gy" target="_blank">公司介绍</a></li>
                  <li><router-link to="/serviceSupport/disclaimer">免责声明</router-link></li>
                  <li><a href="javascript:;">合作伙伴</a></li>
                </ul>
              </div>
              <div class="footerList">
                <div class="tit">快速入口</div>
                <ul>
                  <li><a href="https://www.kaipuyun.cn/" target="_blank">开普云官网</a></li>
                  <li><a href="https://jg.kaipuyun.cn/" target="_blank">云监测</a></li>
                  <li><a href="https://www.kaipuyun.cn/kp/yfx/yfx.shtml" target="_blank">用户体验分析</a></li>
                  <li><a href="https://www.kaipuyun.cn/kp/xmtjc/xmt.shtml" target="_blank">新媒体监测</a></li>
                </ul>
              </div>
              <div class="footerList">
                <div class="tit">产品服务</div>
                <ul>
                  <li><router-link to="/serviceCommonPage/dataService">数据服务</router-link></li>
                  <li><router-link to="/devPlatform">开放平台</router-link></li>
                  <li><router-link to="/serviceSupport/commonProblem">服务支持</router-link></li>
                </ul>
              </div>
              <div class="footerOther">
                <div class="hotlineBox"><i class="icon-deltails icon-hotline"></i>服务热线：4000-976-005</div>
                <div class="emailBox"><i class="icon-deltails icon-email"></i>Email：yunying@ucap.com.cn</div>
                <div class="scanCode clearfix">
                  <div class="ucap-publicNum fl">
                    <div class="picCode"><img src="../../assets/img/serviceBox/ucap-publicNum.png"></div>
                    <div class="tit">公共服务云平台</div>
                  </div>
                  <div class="ucap-publicNum fl">
                    <div class="picCode"><img src="../../assets/img/serviceBox/ucap-weChat.png"></div>
                    <div class="tit">开普云</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="copyrightBG homeCopyBg">
            <div class="container">
              © CopyRight 2019 开普云 kaipuyun.cn. All Rights Reserved<span>版权所有 京ICP备14035494号-1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---浮层菜单-返回首页、客服-->
    <div class="floatMenu" v-if="isShow">
      <!--<i class="icon-floatMenu icon-kf"></i>-->
      <i class="icon-floatMenu icon-upTop" @click="goBack()"></i>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        positionNum: 0,
        onoff: false,
        mouseScrollDown: false,
        admin: "",
        serviceListArr: [
          {
            "src": require('../../assets/img/serviceBox/hotRecommend1.png'),
            "serviceName": "个税查询",
            "summary": "查询北京市内职工社保缴纳基本信息",
            "serviceID": "BAA0001"
          },
          {
            "src": require('../../assets/img/serviceBox/hotRecommend2.png'),
            "serviceName": "预约挂号",
            "summary": "用于全国医疗机构查询",
            "serviceID": "DAB0003"
          },
          {
            "src": require('../../assets/img/serviceBox/hotRecommend3.png'),
            "serviceName": "驾照记分",
            "summary": "全国范围交通违法记录查询",
            "serviceID": "AAB0001"
          },
          {
            "src": require('../../assets/img/serviceBox/hotRecommend4.png'),
            "serviceName": "12315",
            "summary": "消费者投诉举报平台",
            "serviceID": "IAI0001"
          }
        ],
        headMenu: [
          {"title": "首页", "hrefName": "/"},
          {"title": "数据服务", "hrefName": "/serviceCommonPage"},
          {"title": "开放平台", "hrefName": "/devPlatform"},
          {"title": "服务支持", "hrefName": "/serviceSupport"}
        ],
        isShowLogin: true,
        falg: false,
        selectedInfo: false,
        isShow: false
      };
    },
    created() {

    },
    beforeMount() {
    },
    mounted() {
      /*滚动效果*/
      //firefox
      if (document.addEventListener) document.addEventListener("DOMMouseScroll", this.handleScroll, false);
      //ie chrom2
      window.onmousewheel = document.onmousewheel = this.handleScroll;
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
      ...mapActions(['sendLoginState', 'sendUserInfo']),
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
      /*当前页面赋值*/
      handleScroll(event) {
        var e = event || window.event;
        let sectionWrap = document.getElementById("section-wrap");
        let homeScreen = document.getElementsByClassName("homeScreen");
        var mouseScrollDown = false;
        if (e.detail) {//firefox
          //向上滑动
          if (e.detail < 0) {
            mouseScrollDown = false;
          } else {
            mouseScrollDown = true;
          }
        }
        //IE Chrome opera
        if (e.wheelDelta) {
          //鼠标向上滑动
          if (e.wheelDelta > 0) {
            mouseScrollDown = false;
          }
          //鼠标向下滑动
          if (e.wheelDelta < 0) {
            mouseScrollDown = true;
          }
        }
        this.mouseScrollDown = mouseScrollDown;
        this.screenScroll();
      },
      screenScroll() {
        let homeScreen = document.getElementsByClassName("homeScreen");
        let sectionWrap = document.getElementById("section-wrap");
        if (this.onoff) return false;
        this.onoff = true;
        setTimeout(() => {
          this.onoff = false;
        }, 500);
        let len = 5;
        if (this.mouseScrollDown && this.positionNum < len - 1) this.positionNum++;
        if (!this.mouseScrollDown && this.positionNum > 0) this.positionNum--;
        let scrollTop = homeScreen[this.positionNum].offsetTop;
        if (this.positionNum == 4) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }

        if (document.all) {
          sectionWrap.style.top = "-" + homeScreen[0].offsetHeight * this.positionNum + "px";
        } else {
          sectionWrap.style.transform = "translateY(-" + (homeScreen[0].offsetHeight * this.positionNum) + "px)";
        }
        if (typeof screenScrollCallback == 'function') return screenScrollCallback();
        return false;
      },
      resetOnOff: function () {
        this.onoff = false;
      },
      goBack() {
        this.positionNum = 0;
        this.isShow = false;
        let sectionWrap = document.getElementById("section-wrap");
        if (document.all) {
          sectionWrap.style.top = "0px";
        } else {
          sectionWrap.style.transform = "translateY(0px)";
        }
      },
      enter(_this) {
        let targetEle = document.getElementById("menu" + _this);
        targetEle.classList.add('selected');
        if (targetEle.innerText.length == 2  || targetEle.innerText.length == 3) {
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
          }
        }
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
      show() {
        this.falg = true;
        this.selectedInfo = true;
      },
      hide() {
        //this.selectedInfo = false;
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
      },
      isShowLogin: {
        handler() {
          this.getLoginInfo();
        }
      }
    },
    //这里来销毁。将方法写出来，销毁在beforeDestroy写。
    beforeDestroy() {
      this.onoff = true;
      window.removeEventListener("DOMMouseScroll", this.handleScroll, false);
      window.removeEventListener("mousewheel", this.handleScroll, false);
    },
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/index.css";

  .mainConBg {
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    transition: transform 1s cubic-bezier(0.86, 0, 0.03, 1);
    -webkit-transition: -webkit-transform 1s cubic-bezier(0.86, 0, 0.03, 1);
    position: relative;
  }

  .homeScreen {
    width: 100%;
    height: 100%;
  }

  .header-user-box {
    position: relative;
  }

  .userAvator {
    padding-right: 26px;
  }

  .userAvator .header-user-avator {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin: 13px 7px 0 0;
    background: #3c4452;
  }

  .header-user-name {
    color: #fff;
    line-height: 60px;
  }

  .triangle_border_down {
    position: absolute;
    top: 27px;
    right: 0;
    width: 0;
    height: 0;
    border-width: 6px 6px 0;
    border-style: solid;
    border-color: #cfcfcf transparent;
  }

  .triangle_border_down .triangle_border_down {
    border-color: #2b2e33 transparent;
    top: -7px;
    right: -6px;
  }

  /* 在引入的css文件中写入这个*/
  [v-cloak] {
    display: none;
  }

  /*动画设置*/
  .sectionWrap {
    animation: sport .5s linear forwards;
    transform: translateY(0%);
  }

  @keyframes sport {
    0% {
      transform: translateY(0%)
    }
    25% {
      transform: translateY(40%)
    }
    50% {
      transform: translateY(60%)
    }
    75% {
      transform: translateY(80%)
    }
    100% {
      transform: translateY(100%)
    }
  }
</style>
