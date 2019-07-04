<template>
  <div>
    <!--当前位置-->
    <div class="container">
      <div class="currentLocation">
        <span>当前位置：</span>
        <span @click="toServicePage()">数据服务</span>
        <span class="symbol">&gt;</span>
        <span>{{serviceInfo.serviceName}}</span>
      </div>
    </div>
    <!--服务logo 申请-->
    <div class="container">
      <div class="padTB whiteBG clearfix">
        <div class="serviceLogo">
          <div class="serLogoPic">
            <img :src="serviceInfo.logo">
          </div>
          <div class="logoBom clearfix">
            <div class="percent33">
              <i class="icon-deltails icon-serviceID"></i>
              <p>{{serviceInfo.serviceID}}</p>
            </div>
            <div class="percent33">
              <i class="icon-deltails icon-salesVolume"></i>
              <p>{{serviceInfo.saleNum || 0}}</p>
            </div>
            <div class="percent33">
              <i class="icon-deltails icon-attentionVolume"></i>
              <p>{{serviceInfo.markNum || 0}}</p>
            </div>
          </div>
        </div>
        <div class="serviceApply">
          <div class="tit">{{serviceInfo.serviceName}}</div>
          <div class="description">{{serviceInfo.summary}}</div>
          <div class="price"><label>价格：</label><span>{{serviceInfo.price <= 0 ? "免费" : "面议"}}</span></div>
          <div class="type clearfix">
            <label class="fl">类型：</label>
            <div class="fl selectType">
              <span :class='{"selected": serviceInfo.serviceType==2}'><i v-if="serviceInfo.serviceType==2"
                                                                         class="icon-deltails icon-selected"></i>服务</span>
              <span :class='{"selected": serviceInfo.serviceType==3}'><i v-if="serviceInfo.serviceType==3"
                                                                         class="icon-deltails icon-selected"></i>API</span>
            </div>
          </div>
          <div class="range"><label>服务范围：</label><span>{{serviceInfo.cityName}}</span></div>
          <div class="btnBox">
            <a href="javascript:;" class="btnApply" @click="toPage(serviceInfo.serviceID)">立即申请</a>
            <a href="javascript:;" class="btnAttention" @click="addMark(serviceInfo.serviceID)"
               :class="{'active':this.isFollow == '已关注'}">
              <i class="icon-deltails icon-attention"></i>{{isFollow}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--服务详情、服务示例、免责声明-->
    <div class="container">
      <div class="tabList">
        <!--<div class="tabTitBox">
          <ul class="clearfix">
            <li class="selected"><a href="#fwxq">服务详情</a></li>
            <li><a href="#fwsl">服务示例</a></li>
            <li><a href="#mzsm">免责声明</a></li>
          </ul>
        </div>-->
        <div class="tabCon">
          <div class="ListCon" id="fwxq">
            <div class="tabConTit"><span></span>服务详情</div>
            <div class="tableBox whiteBG">
              <table class="table">
                <tr>
                  <td>服务名称</td>
                  <td>{{serviceInfo.serviceName}}</td>
                </tr>
                <tr>
                  <td>服务分类</td>
                  <td>{{categoryList[serviceInfo.category]}}</td>
                </tr>
                <tr>
                  <td>服务范围</td>
                  <td>{{serviceInfo.cityName}}</td>
                </tr>
                <tr>
                  <td>服务期限</td>
                  <td>{{serviceInfo.deadline}}</td>
                </tr>
                <tr>
                  <td>服务提供方式</td>
                  <td>公共服务打包输出<span>（注：政务数据与服务集成的公共服务可按照事项内容封装并整体提供，包括整套服务页面及服务内容，需求方可以直接进行调用。）</span></td>
                </tr>
                <tr>
                  <td>详细介绍</td>
                  <td>{{serviceInfo.detail}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="ListCon" id="fwsl">
            <div class="tabConTit"><span></span>服务示例</div>
            <div class="serviceExample whiteBG clearfix">
              <div v-for="item in serviceInfo.example" class="sampleGraph"><img :src="item"></div>
            </div>
          </div>
          <div class="ListCon" id="mzsm">
            <div class="tabConTit"><span></span>免责声明</div>
            <div class="statement whiteBG clearfix">
              <!--<label>免责声明</label>-->
              <span id="mzDetail"><!--{{serviceInfo.relief}}--></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--热门推荐-->
    <div class="container serviceSortBox">
      <div class="tabConTit"><span></span>热门推荐</div>
      <div class="clearfix marBom">
        <div class="publicListBox ListBgWhite">
          <ul class="clearfix">
            <li v-for="item in hotServiceList">
              <div class="pubListDiv">
                <div class="publicIcon"><img :src="item.logo"></div>
                <div class="publicBigTit">{{item.serviceName}}</div>
                <div class="publicDescription">{{item.summary}}</div>
                <div class="publicBtnDetails"><a href="javascript:;" @click="renderTo(item.serviceID)">查看详情</a></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <MaskTip v-bind:tips="tips"
             v-bind:tipsContent="tipsContent"
             v-bind:errorTipsContent="errorTipsContent"
             v-bind:tipsImg="tipsImg"
             v-bind:loading="loading"
             v-bind:toRouter="toRouter"
             @listenToChildEvent="closeDialog">
    </MaskTip>


    <loginMask v-bind:tipSecond="tipSecond" @listenToChildEvent="closeDialog"></loginMask>
    <div class="floatMenu">
      <i class="icon-floatMenu icon-upTop" @click="toTop()"></i>
    </div>





    <!---实名认证 弹框-->
    <div v-if="isRealy">
      <div class="mask"></div>
      <div class="dialog-container" >
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
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import MaskTip from '@/views/module/maskTip';
  import loginMask from '@/views/serviceBoxDevPlatform/loginMask';
  import {mapGetters, mapState, mapActions} from 'vuex';
  var defaultOpenID;
  export default {
    name: 'serviceDetails',
    data() {
      return {
        serviceInfo: {},
        openID: "",
        tipsContent: '',
        errorTipsContent: "",
        tipsImg: '',
        tips: false,
        loading: false,
        categoryList: {
          'A': '交通',
          'B': '社会保障',
          'C': '教育',
          'D': '医疗卫生',
          'E': '民政',
          'H': '出入境',
          'M': '文化体育',
          'G': '旅游',
          'I': '举报',
          'K': '税务',
          'X': '信用',
          'Y': '法规查询',
          'L': '政务',
          'Z': '其他',
        },
        hotServiceID: ["BAB0001", "KAD0004", "IAC0003", "DAA0001", 'AAA0001'],
        hotServiceList: [],
        loading: false,
        toRouter: "serviceDetail",
        tipSecond: false,
        isFollow: "关注",
        isRealy:false,
        realPageNum:"",
        userName : "",
        userOpenID:""
      };
    },
    mounted() {

      if (this.getUserInfo) {
        this.openID = JSON.parse(this.getUserInfo).openID;
        this.isFollowMark();
      }
      this.getServiceDetail();
      this.getHotService();

    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip,
      loginMask
    },
    created() {
    },
    methods: {
      getServiceDetail() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: '/service/getServiceDetail',
          data: {serviceID: this.$route.query.id},
          contentType: 'application/json'
        }).then((res) => {
          if (res.data.code == 200) {
            this.serviceInfo = res.data.results.dataList[0];
            this.serviceInfo.category = this.serviceInfo.serviceID[0];
            this.serviceInfo.example = this.serviceInfo.example.split(',')
            const reg = new RegExp('。', "g")
            document.getElementById('mzDetail').innerHTML = this.serviceInfo.relief.replace(reg, "。<br>")
          } else {
            alert("获取服务详情失败")
          }
        }).catch(function (err) {

        })
      },
      toPage(serviceID) {
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
            this.tipSecond = true;
            sessionStorage.setItem("serviceDetailID", serviceID);
            sessionStorage.setItem("serviceDetailName", this.serviceInfo.serviceName);
          } else {
            this.$http({
              headers: {"Content-Type": "application/json"},
              method: "post",
              url: "/procure/getProcureID",
              async: true,
              data: {
                serviceID: serviceID,
                openID: this.openID
              },
              contentType: 'application/json'
            }).then(res => {
              if (res.data.code == "200") {
                this.tips = true;
                this.tipsContent = "提交申请失败";
                this.errorTipsContent = this.serviceInfo.serviceName + "已申请";
                this.tipsImg = require("../../assets/img/serviceApply/picFailure.png");
              } else {
                this.$http({
                  headers: {"Content-Type": "application/json"},
                  method: "post",
                  url: "/userInformation/getUserByOpenID",
                  async: true,
                  data: {
                    openID: this.openID
                  },
                  contentType: 'application/json'
                }).then(res => {
                  if (res.data.msg == "success") {
                    if (res.data.results.confirmStatus == "3") {
                      this.$router.push({
                        name: "serviceBoxPurchase",
                        params: {"serviceID": serviceID},
                        query: {serviceID: serviceID, serviceName: this.serviceInfo.serviceName}
                      })
                    } else if (res.data.results.confirmStatus == "0"){
                        this.isRealy = true;
                        this.realPageNum  = res.data.results.confirmStatus;
                        this.userName = res.data.results.userName;
                        this.userOpenID = res.data.results.openID;
                    } else {
                      // alert("对不起，该申请暂只支持通过实名认证的企业申请")
                      this.tips = true;
                      this.tipsContent = "提交申请失败";
                      this.errorTipsContent = "对不起，该申请暂只支持通过实名认证的企业申请";
                      this.tipsImg = require("../../assets/img/serviceApply/picFailure.png");
                    }
                  } else {
                    alert("数据加载失败")
                  }
                }).catch(err => {
                  console.log(err)
                });
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        });
      },
      addMark(serviceID) {
        if (this.isFollow == "已关注") {
          return;
        }
        let data = {
          openID: this.openID,
          serviceID: serviceID
        };

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
            this.tipSecond = true;
            sessionStorage.setItem("serviceDetailID", serviceID);
            sessionStorage.setItem("serviceDetailName", this.serviceInfo.serviceName);
          } else {
            this.$http({
              method: 'post',
              url: '/userMark/addMark',
              data: data
            }).then((res) => {
              let data = res.data;
              if (data.code == '200') {
                if (data.info != null) {
                  this.isFollow = "已关注";
                  this.getServiceDetail();
                } else {
                  this.isFollow = "关注";
                }
              }else{
                alert("请求参数不完整")
              }
            }).catch((err) => {
              alert(err)
              console.log(err)
            })
          }


        }).catch((err) => {
          alert(err)
          console.log(err)
        })

      },
      isFollowMark() {
        let data = {
          openID: this.openID,
          serviceID: this.$route.query.id
        };
        this.$http({
          method: 'post',
          url: '/userMark/isFollow',
          data: data
        }).then((res) => {
          let data = res.data;
          if (data.code == '200') {
            if (data.info != null) {
              this.isFollow = "已关注";
            } else {
              this.isFollow = "关注";
            }
          } else {
            this.isFollow = "关注";
          }
        }).catch((err) => {
          alert(err)
          console.log(err)
        })

      },
      toServicePage() {
        this.$router.push({
          path: '/dataService',
          name: "dataService"
        })
      },
      closeDialog(flag) {
        this.tips = flag;
        this.tipSecond = flag;
      },
      getHotService() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: '/service/getHotService',
          data: {hotServiceID: this.hotServiceID},
          contentType: 'application/json'
        }).then((res) => {
          if (res.data.code == 200) {
            this.hotServiceList = res.data.results.dataList;
          } else {
            alert("获取热门服务失败")
          }
        }).catch(function (err) {

        })
      },
      renderTo(id) {
        if (!id) {
          return
        }
        this.$router.push({
          path: '/serviceDetails',
          name: "serviceDetails",
          query: {id: id}
        })
      },
      toTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      goConfirmStatuso() {
        if(this.realPageNum == '0'){
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
        this.bus.$emit("headInforShow", this.userName);
        this.bus.$emit("userOpenID",this.userOpenID);
        this.isRealy = false;
      }
    },
    watch: {
      $route(to, from) {
        this.getServiceDetail();
        if (this.getUserInfo) {
          this.isFollowMark();
        }
      },
      isFollow: {
        handler() {
          this.getServiceDetail();
          if (this.getUserInfo) {
            this.isFollowMark();
          }
        }
      }
    }
  }
</script>
<style>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
</style>
