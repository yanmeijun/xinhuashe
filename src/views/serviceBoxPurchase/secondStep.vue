<template>
  <div class="tabList clearfix">
    <div class="tabCon">
      <div class="ListCon" id="fwxq">
        <div class="tableBox whiteBG serviceApplyTable">
          <table class="table">
            <tr>
              <td>联系人姓名：</td>
              <td><input type="text" placeholder="" v-model="userInfo.name" class="inp-service" readonly></td>
            </tr>
            <tr>
              <td>联系方式：</td>
              <td><input type="text" placeholder="" class="inp-service" v-model="userInfo.mobile" readonly></td>
            </tr>
            <tr>
              <td>单位名称：</td>
              <td><input type="text" placeholder="" v-model="userInfo.companyName" class="inp-service" readonly></td>
            </tr>
            <tr>
              <td>电子邮箱：</td>
              <td>
                <input type="text" placeholder="" v-model="userInfo.mailbox" class="inp-service" readonly>
                <!--<div class="error"><i class="pla-email"></i>请填写电子邮箱</div>-->
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 18px;"><span class="starTip">*</span>服务接入用途：</td>
              <td>
                <textarea placeholder="请填写服务接入用途描述" maxlength="500" v-model="serviceUse"></textarea>
                <div class="error pla-email-use" v-if="serviceUseTip"><i class="pla-email"></i>必填项</div>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 16px;"><span class="starTip">*</span>接入用途地址：</td>
              <td>
                <div class="address clearfix" style="margin-bottom: 13px;" v-for="(item,index) in accessAddress">
                  <div class="select-box result_select fl" @click="isApplyUser($event,index)">
                    <div class="fl userAddres">
                      <!-- <div :id="content(index)" style="position: relative;transition: transform 0.9s ease-in 0.4s;">
                         <span class="userFor">App</span>
                         <span class="userFor">PC</span>
                         <span class="userFor">微信</span>
                         <span class="userFor">wap</span>
                         <span class="userFor">其他</span>
                       </div>-->
                      <div>
                        <span class="userFor" :id="content(index)" main-userFor="app">app</span>
                      </div>
                    </div>
                    <!--<i class="icon-downMenu icon2 downMenu1" @click="topScroll(index)"></i>
                     <i class="icon-downMenu icon2 downMenu2" @click="downScroll(index)"></i>-->
                    <i class="icon-downMenu icon2 downMenu2"></i>
                    <div class="selectCon  addApplyUser" style="height:auto;display: none;"
                         :id="applyUser(index)"
                         @click.stop
                    >
                      <p class="curPointer" @click="serviceTypeChoice(index,'app','app')">app</p>
                      <p class="curPointer" @click="serviceTypeChoice(index,'web端','web')">web端</p>
                      <p class="curPointer" @click="serviceTypeChoice(index,'微信端','weChat')">微信端</p>
                      <p class="curPointer" @click="serviceTypeChoice(index,'wap','wap')">wap</p>
                      <p class="curPointer" @click="serviceTypeChoice(index,'其他','other')">其他</p>
                    </div>
                  </div>
                  <div class="fl">
                    <input type="text" class="address-detail" v-model="item.conText"
                           placeholder="填写接入用途地址,例如:https://www.cnblogs.com/shenfangfang/p/5713564.html">
                  </div>
                  <div class="fl">
                    <img :src="item.src" class="addPortrait"
                         :id="reduceSymbol(index)"
                         @mouseover="enter(index)"
                         @mouseout="leave(index)"
                         @click="deleteUse(index)"
                    >
                    <!--<img src="../../assets/img/serviceApply/reduceIcon.png" class="addPortrait">-->
                  </div>
                </div>
                <!--                <div class="address clearfix">
                                  <div class="select-box result_select fl">
                                    <div class="fl userAddres">
                                      <div id="content1" style="position: relative;transition: transform 0.9s ease-in 0.4s;">
                                        <span class="userFor">App</span>
                                        <span class="userFor">WEB</span>
                                      </div>
                                    </div>
                                    <i class="icon-downMenu icon2 downMenu1" @click="topScroll(1)"></i>
                                    <i class="icon-downMenu icon2 downMenu2" @click="downScroll(1)"></i>
                                  </div>
                                  <div class="fl">
                                    <input type="text" class="address-detail">
                                  </div>
                                  <div class="fl">
                                    <img src="../../assets/img/serviceApply/addIcon2.png" class="addPortrait"
                                         id="reduceSymbol1"
                                         @mouseover="enter(1)"
                                         @mouseout= "leave(1)"
                                    >
                                    &lt;!&ndash;<img src="../../assets/img/serviceApply/addIcon.png" class="addPortrait">&ndash;&gt;
                                  </div>
                                </div>-->
                <div class="error pla-email-use"
                     style="position: static;"
                     v-if="accessAddressTips"
                ><i class="pla-email"></i>{{accessAddressTips}}
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href="javascript:;" class="btnApply btnApplyService" @click="previousStep">上一步</a>
                <a href="javascript:;" class="btnApply btnApplyService" @click="submit()">提&nbsp;交</a>
                <a href="javascript:;" class="btnApply btnApplyService" @click="cancel">取&nbsp;消</a>
              </td>
            </tr>
          </table>
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
  </div>
</template>
<script>
  import axios from 'axios';
  import MaskTip from '@/views/module/maskTip';
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        userInfo: {
          name: '',
          mobile: '',
          companyName: '',
          companyUrl: '',
          mailbox: '',
          useForAddress: '',
          useFor: ''
        },
        userInfoCopy: {
          name: '',
          mobile: '',
          companyName: '',
          companyUrl: '',
          mailbox: '',
          useForAddress: '',
          useFor: ''
        },
        openID: "",
        serviceUse: "",
        serviceUseTip: false,
        animatedNum: 0,
        accessAddress: [
          /* {
             "src": require("../../assets/img/serviceApply/reduceIcon2.png"),
             "conText": "",
             "positinNum": 0
           },*/
          {"src": require("../../assets/img/serviceApply/addIcon2.png"), "conText": "", "positinNum": 0}
        ],
        accessAddressTips: "",
        tipsContent: '',
        errorTipsContent: "",
        tipsImg: '',
        tips: false,
        loading: false,
        toRouter: "purchase"
      }
    },
    mounted() {
      if (this.getUserInfo) {
        this.openID = JSON.parse(this.getUserInfo).openID;
      }
      this.getUserByOpenID();
      window.addEventListener('click', this.handleSelect);
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    created() {
    },
    methods: {
      getUserByOpenID() {
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
            Object.assign(this.userInfo, res.data.results);
            Object.assign(this.userInfoCopy, res.data.results);
          } else {
            alert("数据加载失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      previousStep() {
        this.$router.push({
          name: "firstStep",
          query: {serviceID: this.$route.query.serviceID, chooseMenuArr: sessionStorage.getItem("chooseMenuArr")}
        });
      },
      submit() {
        if (!this.serviceUse) {
          this.serviceUseTip = true;
          return;
        } else {
          this.serviceUseTip = false;
        }
        let useForAddress = "";
        this.accessAddress.forEach((item) => {
          if (!item.conText) {
            useForAddress += item.conText;
          } else {
            useForAddress += item.conText + ","
          }
        });
        let useForArr = useForAddress.split(",");
        var newArr = useForArr.filter(item => item);
        var myreg = /^(http:\/\/|https:\/\/)/;
        if (!useForAddress) {
          this.accessAddressTips = "必填项";
          return;
          //alert("请输入接入用途地址");
        } else {
          for (var j in newArr) {
            if (!myreg.test(newArr[j].trim())) {
              //alert("格式不正确");
              this.accessAddressTips = "链接地址格式不正确，请重新输入";
              return;
            } else {
              this.accessAddressTips = "";
            }
          }
        }
        /*整合接入用途地址*/
        var newUseForArr = [];
        for (var i in newArr) {
          /*if(!this.accessAddress[i].positinNum || this.accessAddress[i].positinNum == "0"){
            newUseForArr.push({"useFor":"App","address":newArr[i]})
          }else if(this.accessAddress[i].positinNum == "1"){
            newUseForArr.push({"useFor":"Web","address":newArr[i]})
          }*/
          var newCon = document.getElementById("content" + i).getAttribute('main-userFor');
          newUseForArr.push({"useFor": newCon, "address": newArr[i]})
        }
        let data = {
          openID: this.openID,
          serviceID: this.$route.query.serviceID,
          serviceName: this.$route.query.serviceName,
          templateID: this.$route.query.templateID,
          contactName: this.userInfo.name.trim(),
          contactPhone: this.userInfo.mobile.trim(),
          unitName: this.userInfo.companyName.trim(),
          address: this.userInfo.companyUrl.trim(),
          email: this.userInfo.mailbox.trim(),
          serviceUse: this.serviceUse.trim(),
          useForAddress: newUseForArr,
          region: JSON.parse(sessionStorage.getItem("chooseMenuArr")),
          type: '1',   //1是申请，2是再次申请
          serviceType: sessionStorage.getItem("serviceType")
        };

        this.$http({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/procure/getProcureID",
          async: true,
          data: {
            serviceID: this.$route.query.serviceID,
            openID: this.openID,
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            this.tips = true;
            this.tipsContent = "提交申请失败";
            this.errorTipsContent = this.$route.query.serviceName + "已申请";
            this.tipsImg = require("../../assets/img/serviceApply/picFailure.png");
          } else {
            this.$http({
              method: 'post',
              url: '/procure/procureApply',
              data: data
            }).then((res) => {
              let data = res.data;
              if (data.code == '200') {
                this.$router.push({
                  name: "thirdStep",
                  query: {serviceID: this.$route.query.serviceID}
                });
              } else {
                this.tips = true;
                this.tipsContent = "提交申请失败";
                this.errorTipsContent = "提交信息有误,请重新填写";
                this.tipsImg = require("../../assets/img/serviceApply/picFailure.png");
              }
            }).catch((err) => {
            })
          }
        }).catch((err) => {
        })
      },
      topScroll(ind) {
        let content = document.getElementById("content" + ind);
        var b = 5;
        if (this.accessAddress[ind].positinNum == b - 1) {
          return
        }
        ;
        var aInd = ++this.accessAddress[ind].positinNum;//this.animatedNum 的值为1;
        this.accessAddress[ind] = Object.assign({}, this.accessAddress[ind], {
          positinNum: aInd
        });
        this.$set(this.accessAddress, ind, this.accessAddress[ind]);
        content.style.transform = "translateY(-" + (30 * aInd) + "px)";
      },
      downScroll(ind) {
        if (this.accessAddress[ind].positinNum == 0) {
          return
        }
        var aInd = --this.accessAddress[ind].positinNum;//第二次执行的值为0
        this.accessAddress[ind] = Object.assign({}, this.accessAddress[ind], {
          positinNum: aInd
        });
        this.$set(this.accessAddress, ind, this.accessAddress[ind]);
        document.getElementById("content" + ind).style.transform = "translateY(-" + (30 * aInd) + "px)";
      },
      enter(ind) {
        let reduceSymbol = document.getElementById("reduceSymbol" + ind);
        if (ind > 0) {
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon.png"));
        } else {
          if (this.accessAddress.length == 1) {
            reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon.png"));
            return;
          }
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/reduceIcon.png"));
        }

      },
      leave(ind) {
        let reduceSymbol = document.getElementById("reduceSymbol" + ind);
        if (ind > 0) {
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon2.png"));
        } else {
          if (this.accessAddress.length == 1) {
            reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon2.png"));
            return;
          }
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/reduceIcon2.png"));
        }
      },
      deleteUse(index) {
        if (index > 0) {
          if (this.accessAddress.length > 9) {
            return;
          }
          this.accessAddress.push({
            "src": require("../../assets/img/serviceApply/addIcon2.png"),
            "conText": "",
            "positinNum": 0
          })
        } else {
          if (this.accessAddress.length == 1) {
            this.accessAddress.push({
              "src": require("../../assets/img/serviceApply/addIcon2.png"),
              "conText": "",
              "positinNum": 0
            })
            return;
          }
          this.accessAddress.splice(index, 1);
        }
      },
      content(index) {
        return "content" + index
      },
      applyUser(index) {
        return "applyUser" + index
      },
      isApplyUser(e, index) {
        e.stopPropagation();
        var applyUser = document.getElementById("applyUser" + index);
        if (applyUser.style.display == "block") {
          applyUser.style.display = "none";
        } else {
          applyUser.style.display = "block";
        }
      },
      reduceSymbol(index) {
        return "reduceSymbol" + index
      },
      cancel() {
        this.$router.push({
          path: '/serviceDetails',
          name: "serviceDetails",
          query: {id: this.$route.query.serviceID}
        });
      },
      closeDialog(flag) {
        this.tips = flag;
      },
      /*点击其他触发下拉框消失*/
      handleSelect() {
        var addApplyUser = document.getElementsByClassName('addApplyUser');
        for (var i = 0; i < addApplyUser.length; i++) {
          addApplyUser[i].style.display = "none";
        }
      },
      serviceTypeChoice(index, mgs, targetmgs) {
        var content = document.getElementById("content" + index);
        content.innerHTML = mgs;
        content.setAttribute("main-userFor", targetmgs);
        document.getElementById("applyUser" + index).style.display = "none";
      }
    },
    watch: {}
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";
</style>
