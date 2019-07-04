<template>
  <!-- 第二步 -->
  <div class="tabList clearfix">
    <div class="tabCon">
      <div class="ListCon" id="fwxq">
        <div class="tableBox whiteBG serviceApplyTable application">
          <table class="table">
            <tr>
              <td>服务名称：</td>
              <td>
                <input type="text"
                       placeholder="请输入服务源名称，如身份证办理进度查询"
                       class="inp-service"
                       maxlength="35"
                       @blur="inputBlur('serviceName')"
                       v-model="serviceName">
                <div class="error pla-email-use"
                     style="left: 380px;"
                     v-if="serviceNameTips"
                ><i class="pla-email"></i>{{serviceNameTips}}
                </div>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 16px;">接入方式及链接地址：</td>
              <td>
                <div class="address clearfix" style="margin-bottom: 13px;" v-for="(item,index) in accessAddress">
                  <div class="select-box result_select fl" @click="isApplyUser($event,index)">
                    <div class="fl userAddres">
                      <!--<div :id="content(index)" style="position: relative;transition: transform 0.4s ease-in 0.2s;">
                        <span class="userFor">App</span>
                        <span class="userFor">PC</span>
                        <span class="userFor">微信</span>
                        <span class="userFor">wap</span>
                        <span class="userFor">其他</span>
                      </div>-->
                      <div>
                        <span class="userFor" :id="content(index)" main-userFor="app">{{item.appCon}}</span>
                      </div>
                    </div>
                    <!--<i class="icon-downMenu icon2 downMenu1" @click="topScroll(index)"></i>
                    <i class="icon-downMenu icon2 downMenu2" @click="downScroll(index)"></i>-->
                    <i class="icon-downMenu icon2 downMenu2"></i>
                    <div class="selectCon  addApplyUser" style="height:auto;display: none;"
                         :id="applyUser(index)"
                         @click.stop
                    >
                      <p class="curPointer" @click="serviceTypes(index,'app','app')">app</p>
                      <p class="curPointer" @click="serviceTypes(index,'web端','web')">web端</p>
                      <p class="curPointer" @click="serviceTypes(index,'微信','weChat')">微信</p>
                      <p class="curPointer" @click="serviceTypes(index,'wap','wap')">wap</p>
                      <p class="curPointer" @click="serviceTypes(index,'其他','other')">其他</p>
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
                <!--<div class="address clearfix" style="margin-top: 13px;">
                  <div class="select-box result_select fl">
                    <span>WEB</span>
                    <i class="icon-downMenu icon2"></i>
                  </div>
                  <div class="fl">
                    <input type="text" class="address-detail" placeholder="例如：http://www.hnzwfw.gov.cn/col/index.html">
                  </div>
                  <div class="fl">
                    <img src="../../assets/img/serviceApply/addIcon2.png" class="addPortrait">
                    <img src="../../assets/img/serviceApply/addIcon.png" class="addPortrait">
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
              <td>服务类型：</td>
              <td>
                <div class="select-box service_select" @click="serviceTypeToChoice" @click.stop @mouseover="show"
                     @mouseout="hide">
											<span class="defaul_option">
                        {{serviceTypeText}}
											</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="selectCon" style="height:auto;"
                       v-if="serviceTypeShowChoice" @click.stop
                  >
                    <p class="curPointer" @click="serviceTypeChoice(1,'业务查询')">业务查询</p>
                    <p class="curPointer" @click="serviceTypeChoice(2,'业务办理')">业务办理</p>
                    <p class="curPointer" @click="serviceTypeChoice(3,'业务预约')">业务预约</p>
                    <!-- <ul style="top: 0;">
                       <li>业务查询</li>
                       <li>业务办理</li>
                       <li>业务预约</li>
                     </ul>-->
                  </div>
                </div>
                <div class="error pla-email-use"
                     style="left: 380px;"
                     v-if="serviceTypeTips"
                ><i class="pla-email"></i>{{serviceTypeTips}}
                </div>
              </td>
            </tr>
            <tr>
              <td>服务范围：</td>
              <td>
                <div class="select-box service_select" @click="toggleServiceRange" @click.stop @mouseover="show2"
                     @mouseout="hide2">
											<span class="defaul_option">
												<span>请选择服务范围</span>
											</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="selectCon" id="selectBocCon" v-show="isOpen" @click.stop>
                    <el-tree
                      :data="regionCode"
                      show-checkbox
                      node-key="code"
                      ref="tree"
                      @check="checkNode"
                      highlight-current
                      :props="defaultProps">
                    </el-tree>
                  </div>
                </div>
                <div class="error pla-email-use"
                     style="left: 380px;"
                     v-if="serviceRangeTips"
                ><i class="pla-email"></i>{{serviceRangeTips}}
                </div>
              </td>
            </tr>
            <tr v-if="this.chooseMenuArr.length>0">
              <td style="vertical-align: top;">已选择：</td>
              <td>
                <div class="select-box"
                     id="alreadySelect"
                     style="height: auto;width: 352px;max-height: 206px;overflow-y: scroll;">
                  <span class="defaul_option">
                    <div class="selectCity"
                         v-for="(item,index) in chooseMenuArr"
                         style="margin-right: 7px;" :id="index"><em>{{item.region}}</em><i
                      @click="close(index)"></i></div>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href="javascript:;" class="btnApply btnApplyService" @click="previousStep">上一步</a>
                <a href="javascript:;" class="btnApply btnApplyService" @click="submit">下一步</a>
                <a href="javascript:;" class="btnApply btnApplyService" @click="cancel">取&nbsp;消</a>
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {regionCode} from '@/config/regionCode';
  import {mapActions, mapState, mapGetters} from 'vuex';

  var codeArr = [];
  export default {
    name: 'container',
    data() {
      return {
        animatedNum: 0,
        accessAddress: [
          /*  {
              "src": require("../../assets/img/serviceApply/reduceIcon2.png"),
              "conText": "",
              "positinNum": 0
            },*/
          {
            "src": require("../../assets/img/serviceApply/addIcon2.png"),
            "conText": "",
            "positinNum": 0,
            'appCon': "app",
            "defaultApp": "app"
          }
        ],
        serviceName: "",
        serviceNameTips: "",
        serviceTypeText: "请选择服务类型",
        serviceTypeShowChoice: false,//服务类型选择下拉显示flag
        regionCode: regionCode,//全国各地区行政编码
        defaultProps: {
          children: 'regionEntitys',
          label: 'region'
        },
        region: [],
        chooseMenuArr: [],
        isOpen: false,
        serviceType: 0,
        openID: "",
        serviceTypeTips: "",
        serviceRangeTips: "",
        accessAddressTips: "",
        region: []
      };
    },
    mounted() {
      window.addEventListener('click', this.handleSelect);
      window.addEventListener('click', this.handleSelect2);
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";//得到用户的openID

      let newRegionCode = [{"code": "000000", "region": "全国", regionEntitys: []}];
      regionCode[0].regionEntitys.forEach((item, index) => {//一级
        if (item.code == "110000" || item.code == '120000' || item.code == '310000' || item.code == '500000') {
          newRegionCode[0]['regionEntitys'].push({"code": item.code, "region": item.region})
        } else {
          if (item.regionEntitys) {
            newRegionCode[0]['regionEntitys'].push({"code": item.code, "region": item.region, regionEntitys: []});
            item.regionEntitys.forEach((items, indexs) => {//二级渲染
              if (items.region.charAt(items.region.length - 1) != "区" && items.region.lastIndexOf("州") == -1) {
                newRegionCode[0]['regionEntitys'][index]['regionEntitys'].push({
                  "code": items.code,
                  "region": items.region
                });
              }
            })
          } else {
            newRegionCode[0]['regionEntitys'].push({"code": item.code, "region": item.region});
          }
        }
      });
      this.regionCode = newRegionCode;


      // this.$route.query
      if (this.$route.params.serviceName) {
        this.serviceName = this.$route.params.serviceName;
        this.chooseMenuArr = JSON.parse(this.$route.params.region);
        if (this.$route.params.serviceType == 1) {
          this.serviceTypeText = '业务查询';
          this.serviceType = 1;
        } else if (this.$route.params.serviceType == 2) {
          this.serviceTypeText = '业务办理';
          this.serviceType = 2;
        } else {
          this.serviceTypeText = '业务预约';
          this.serviceType = 3;
        }
        var sUrl = JSON.parse(this.$route.params.serviceUrl);
        this.accessAddress = [];
        for (var i = 0; i < sUrl.length; i++) {
          var preNew = sUrl[i].split("_"), defaultCon = "";
          if (preNew[0] == "web") {
            defaultCon = 'web端'
          } else if (preNew[0] == "weChat") {
            defaultCon = '微信'
          } else if (preNew[0] == "other") {
            defaultCon = '其他'
          } else {
            defaultCon = preNew[0];
          }
          this.accessAddress.push({
            "src": require("../../assets/img/serviceApply/addIcon2.png"),
            "conText": preNew[1],
            "positinNum": i,
            "appCon": defaultCon,
            "defaultApp": preNew[0]
          })
        }
      }


    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {},
    created() {
    },
    methods: {
      topScroll(ind) {//向上滚动动画
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
      downScroll(ind) {//向下滚动动画
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
        /*if (ind > 0) {
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon.png"));
        } else {
          if (this.accessAddress.length == 1) {
            reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon.png"));
            return;
          }
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/reduceIcon.png"));
        }*/
        if (this.accessAddress.length == 1 || ind == 0) {
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon.png"));
          return;
        }
        reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/reduceIcon.png"));

      },
      leave(ind) {
        let reduceSymbol = document.getElementById("reduceSymbol" + ind);
        /*if (ind > 0) {
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon2.png"));
        } else {
          if (this.accessAddress.length == 1) {
            reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon2.png"));
            return;
          }
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/reduceIcon2.png"));
        }*/
        if (this.accessAddress.length == 1 || ind == 0) {
          reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/addIcon2.png"));
          return;
        };
        reduceSymbol.setAttribute("src", require("../../assets/img/serviceApply/reduceIcon2.png"));
      },
      deleteUse(index) {
        /*if(this.accessAddress.length-1 == index){
          if (this.accessAddress.length > 9) {
            return;
          };
          this.accessAddress.push({
            "src": require("../../assets/img/serviceApply/addIcon2.png"),
            "conText": "",
            "positinNum": 0,
            "appCon": "app",
            "defaultApp": "app"
          });
          return;
        }else{
          if (this.accessAddress.length == 1) {
            this.accessAddress.push({
              "src": require("../../assets/img/serviceApply/addIcon2.png"),
              "conText": "",
              "positinNum": 0,
              "appCon": "app",
              "defaultApp": "app"
            })
            return;
          }
          this.accessAddress.splice(index, 1);
        }*/
        if(index == 0){
          if (this.accessAddress.length > 9) {
            return;
          };
          this.accessAddress.push({
            "src": require("../../assets/img/serviceApply/reduceIcon2.png"),
            "conText": "",
            "positinNum": 0,
            "appCon": "app",
            "defaultApp": "app"
          });
        }else{
          this.accessAddress.splice(index, 1);
        }


/*        if (index > 0) {
          if (this.accessAddress.length > 9) {
            return;
          };
          this.accessAddress.push({
            "src": require("../../assets/img/serviceApply/addIcon2.png"),
            "conText": "",
            "positinNum": 0,
            "appCon": "app",
            "defaultApp": "app"
          });
        } else {
          if (this.accessAddress.length == 1) {
            this.accessAddress.push({
              "src": require("../../assets/img/serviceApply/addIcon2.png"),
              "conText": "",
              "positinNum": 0,
              "appCon": "app",
              "defaultApp": "app"
            })
            return;
          }
          this.accessAddress.splice(index, 1);
        }*/
      },
      content(index) {
        return "content" + index
      },
      reduceSymbol(index) {
        return "reduceSymbol" + index
      },
      serviceTypeToChoice() {//服务类型下拉列表展开隐藏事件
        this.serviceTypeShowChoice ? this.serviceTypeShowChoice = false : this.serviceTypeShowChoice = true;
      },
      serviceTypeChoice(serviceType, serviceTypeText) {//服务类型下拉列表点击事件
        this.serviceType = serviceType;
        this.serviceTypeText = serviceTypeText;
        this.serviceTypeShowChoice = false
        this.serviceTypeTips = "";
      },
      filterNode(value, data) {
        if (!value) return true;
        let results = false;
        value.forEach((item) => {
          results = results || data.code.indexOf(item) !== -1
        })
        return results;
      },
      /*点击其他触发下拉框消失*/
      handleSelect() {
        this.serviceTypeShowChoice = false;
      },
      checkNode(data) {
        this.chooseMenuArr = [];
        if (this.$refs.tree.getCheckedNodes().length < 1) {
          return;
        }
        if (this.$refs.tree.getCheckedNodes().length == 288) {
          this.chooseMenuArr = [{"code": "000000", "region": "全国"}];
          //codeArr.push(this.$refs.tree.getCheckedKeys());
          codeArr = ["000000"]
        } else {
          this.chooseMenuArr = this.$refs.tree.getCheckedNodes();
          for (let j in this.chooseMenuArr) {
            if (this.chooseMenuArr[j].regionEntitys) {
              this.chooseMenuArr.splice(Number(j) + Number(1), this.chooseMenuArr[j].regionEntitys.length);
            }
          }
          codeArr = [];
          this.$refs.tree.getCheckedKeys().forEach((item => {
            codeArr.push(item);
          }))
        }
      },
      close(ele) {
        this.chooseMenuArr.splice(ele, 1);
        //更新树插件的选中状态
        codeArr = [];
        for (var i in this.chooseMenuArr) {
          if (this.chooseMenuArr[i].code == "000000") {
            return
          } else {
            codeArr.push(this.chooseMenuArr[i].code)
          }
        }
        this.$refs.tree.setCheckedKeys(codeArr);
      },
      /*点击其他触发下拉框消失*/
      handleSelect2() {
        this.isOpen = false;
      },
      toggleServiceRange(e) {
        e = e || event;
        e.cancelBubble = true;
        this.$refs.tree.setCheckedKeys([]);
        this.isOpen = this.isOpen ? this.isOpen = false : this.isOpen = true
      },
      inputBlur(name) {
        const reg1 = /^[\u4e00-\u9fa5A-Za-z]{0,}$///中文或英文
        if (name == "serviceName") {
          if (!this.serviceName.trim()) {
            this.serviceNameTips = "请输入服务名称";
          } else if (!reg1.test(this.serviceName.trim())) {
            this.serviceNameTips = "字母或中文，3-35个字符";
            //this.serviceNameTips = "服务名称格式不正确"
          } else {
            if (this.serviceName.trim().length > 2) {
              this.serviceNameTips = "";
            } else {
              this.serviceNameTips = "字母或中文，3-35个字符";
              return;
            }
            ;
            this.$http({
              headers: {"Content-Type": "application/json"},
              method: "post",
              url: "/serviceJoin/checkOnlyOne",
              async: true,
              data: {
                openID: this.openID, serviceName: this.serviceName.trim()
              },
              contentType: 'application/json'
            }).then(res => {
              if (res.data.code == 200) {
                if (res.data.results.dataCount > 0) {
                  this.serviceNameTips = "该服务名称已存在";
                } else {
                  this.serviceNameTips = "";
                }
              } else {
                this.serviceNameTips = "";
                alert("数据加载失败")
              }
            }).catch(err => {
              console.log(err)
            })

          }
        }
      },
      submit() {
        this.inputBlur("serviceName");
        if (this.serviceNameTips) {
          return;
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
        } else {
          for (var j in newArr) {
            if (!myreg.test(newArr[j].trim())) {
              this.accessAddressTips = "链接地址格式不正确，请重新输入";
              return;
            } else {
              this.accessAddressTips = ""
            }
          }
        }
        /*整合接入用途地址*/
        var newUseForArr = [];
        for (var i in newArr) {
          /*if (this.accessAddress[i].positinNum == 0) {
            preUseForArr.push({"useFor": "app", "address": newArr[i],"defaultApp":"app"})
          } else if (this.accessAddress[i].positinNum == 1) {
            preUseForArr.push({"useFor": "web端", "address": newArr[i],"defaultApp":"web"})
          } else if (this.accessAddress[i].positinNum == 2) {
            preUseForArr.push({"useFor": "微信", "address": newArr[i],"defaultApp":"weChat"})
          } else if (this.accessAddress[i].positinNum == 3) {
            preUseForArr.push({"useFor": "wap", "address": newArr[i],"defaultApp":"wap"})
          } else if (this.accessAddress[i].positinNum == 4) {
            preUseForArr.push({"useFor": "其他", "address": newArr[i],"defaultApp":"other"})
          }*/
          //var newCon = document.getElementById("content"+i).getAttribute('main-userFor');
          var newCon = this.accessAddress[i].defaultApp
          //newUseForArr.push({"useFor":newCon,"address":newArr[i]})
          newUseForArr.push(newCon + "_" + newArr[i])
        }
        if (this.serviceType == 0) {
          this.serviceTypeTips = "请选择服务类型";
          return;
        }
        if (this.chooseMenuArr.length <= 0) {
          this.serviceRangeTips = "服务范围不能为空"
          return;
        }
        sessionStorage.setItem("serviceName", this.serviceName);
        sessionStorage.setItem("serviceUrl", JSON.stringify(newUseForArr));
        sessionStorage.setItem("serviceType", this.serviceType);
        sessionStorage.setItem("region", JSON.stringify(codeArr));

        sessionStorage.setItem("preRegion", JSON.stringify(this.chooseMenuArr))

        this.$router.push({
          name: "applyThirdStep"
        });
      },
      previousStep() {
        this.$router.push({
          name: "applyFirstStep",
          params: {
            userName: sessionStorage.getItem("contactName"),
            userPhone: sessionStorage.getItem("contactTel"),
            companyName: sessionStorage.getItem("company"),
            address: sessionStorage.getItem("address")
          }
        });


      },
      cancel() {
        this.$router.push({
          name: "devPlatform"
        });
      },
      /*点击其他触发下拉框消失*/
      handleSelect() {
        var addApplyUser = document.getElementsByClassName('addApplyUser');
        for (var i = 0; i < addApplyUser.length; i++) {
          addApplyUser[i].style.display = "none";
        }
      },
      serviceTypes(index, mgs, targetmgs) {
        var content = document.getElementById("content" + index);
        content.innerHTML = mgs;
        content.setAttribute("main-userFor", targetmgs);
        document.getElementById("applyUser" + index).style.display = "none";
        this.accessAddress[index].defaultApp = targetmgs;
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
      hide() {
        this.serviceTypeShowChoice = false;
      },
      show() {
        this.serviceTypeShowChoice = true;
      },
      hide2() {
        this.isOpen = false;
      },
      show2() {
        //this.$refs.tree.setCheckedKeys([]);
        this.isOpen = true;
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";

  .el-tree-node__content:hover {
    background-color: #efeded;
  }
</style>
