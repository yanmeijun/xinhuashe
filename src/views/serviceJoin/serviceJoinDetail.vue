<template>
  <div>
    <div class="content">
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>接入申请</span>
          <span>&gt;</span>
          <span>我的申请</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--内容信息 start-->
        <div class="deleteCon detailsCon">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>申请单信息</div>
            <div class="publicList">
              <label>申请单编号：</label>
              <span>{{idNumber}}</span>
            </div>
            <div class="publicList">
              <label>申请时间：</label>
              <span>{{serviceInfo.createDate}}</span>
            </div>
            <div class="publicList">
              <label>申请单状态：</label>
              <span v-if="reviewState==1" class="pendReview"><i class="icon-verPic icon-pendReview"></i>待审核</span>
              <span v-if="reviewState==2"><i class="icon-verPic icon-cancel"></i>已撤销</span>
              <span v-if="reviewState==3" class="certifiedStatus"><i class="icon-verPic icon-passed"></i>已通过</span>
              <span v-if="reviewState==4" class="certifiedStatus not"><i class="icon-verPic icon-notPassed"></i>未通过</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>联系人信息</div>
            <div class="publicList">
              <label>联系人姓名：</label>
              <span>{{serviceInfo.contactName}}</span>
            </div>
            <div class="publicList">
              <label>联系人电话：</label>
              <span>{{serviceInfo.contactTel}}</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务接入信息</div>
            <div class="publicList">
              <label>服务名称：</label>
              <span>{{serviceInfo.serviceName}}</span>
            </div>
            <div class="publicList clearfix wh520px">
              <label class="fl">接入方式及链接地址：</label>
            	<span class="fl multilineText">
            					<p v-for="(item ,index) in serviceInfo.serviceUrl"><b>{{serviceUrl[item.split('_')[0]]}}：</b>{{item.split('_')[1]}}</p>
            				</span>
            </div>
            <div class="publicList">
              <label>服务类型：</label>
              <span>{{serviceInfo.serviceType==1?'业务查询':(serviceInfo.serviceType==2?'业务办理':'业务预约')}}</span>
            </div>
            <div ref="region" class="publicList clearfix" style="display: none">
              <label class="fl">服务范围：</label>
              <span class="fl" v-if="isAll">
                <el-tree
                  :data="regionCode"
                  node-key="code"
                  ref="tree"
                  highlight-current
                  :filter-node-method="filterNode"
                  :props="defaultProps">
                </el-tree>
              </span>
              <span v-else>全国</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务其他补充信息</div>
            <div class="publicList serviceLogoBor clearfix">
              <label>服务LOGO：</label>
              <!--<span  class="uploaLlogoImg"><img :src="serviceInfo.logo?'http://localhost:3001'+serviceInfo.logo:''"></span>-->
              <span  class="uploadLogoImg"><img :src="serviceInfo.logo?serviceInfo.logo:''"></span>
            </div>
            <div class="publicList">
              <label>服务用户手册：</label>
              <span @click="download(serviceInfo.guide)">{{serviceInfo.guide?serviceInfo.guide.substr(serviceInfo.guide.lastIndexOf('/')+1,serviceInfo.guide.length):''}}</span>
            </div>
            <div class="publicList">
              <label>服务源的测试报告：</label>
              <span @click="download(serviceInfo.testReport)">{{serviceInfo.testReport?serviceInfo.testReport.substr(serviceInfo.testReport.lastIndexOf('/')+1,serviceInfo.testReport.length):''}}</span>
            </div>
            <div class="publicList">
              <label>是否需要支付：</label>
              <span>{{serviceInfo.isPay==true?'是':'否'}}</span>
            </div>
            <div class="publicList">
              <label>是否需要登录：</label>
              <span>{{serviceInfo.isLogin==true?'是':'否'}}</span>
            </div>
            <div class="publicList">
              <label>服务接入方式：</label>
              <span>{{serviceInfo.joinType==1?'服务内嵌方式':(serviceInfo.joinType==2?'服务封装方式':'服务采集方式')}}</span>
            </div>
            <div class="publicList wh520px">
              <label>服务接入事项描述：</label>
              <span>{{serviceInfo.describe}}</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务主管部门</div>
            <div class="publicList">
              <label>单位名称：</label>
              <span>{{serviceInfo.company}}</span>
            </div>
            <div class="publicList">
              <label>通讯地址：</label>
              <span>{{serviceInfo.address}}</span>
            </div>
          </div>
        </div>
        <!--内容信息 end-->
        <!--按钮 start-->
        <div v-if="reviewState==1" class="btnBgBox">
          <button class="btn-defalut btn-red" @click="cancelApply()">撤销申请</button>
        </div>
        <!--按钮 end-->
      </div>
    </div>


    <!--确认撤销申请 start-->
    <div class="dialog-container add-catalog-dialog" v-if="cancleFlag">
      <div class="dialog-inner">
        <header class="dialog-header publicHeader">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon-verPic icon-dialogClose fr" @click="cancelN()"></div>
        </header>
        <div class="dialog-conTit">
          <p>您确定要撤销<span>{{serviceInfo.serviceName}}</span>的服务接入申请吗？</p>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list clearfix">
            <li class="btn-item btn-item-acvite" @click="cancelY()">确&nbsp;&nbsp;定</li>
            <li class="btn-item" @click="cancelN()">取&nbsp;&nbsp;消</li>
          </ul>
        </footer>
      </div>
    </div>
    <div class="mask" v-if="cancleFlag"></div>
    <!--确认撤销申请 end-->
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:tipsImg = "tipsImg"
             v-bind:loading = "loading"
             @listenToChildEvent = "closeDialog">
    </MaskTip>


    <!--提交成功-->
    <div class="submitSuccessBox" v-if="submitSuccess"><i class="icon-verPic icon-submitSuccess"></i>{{submitSuccess}}</div>


  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {regionCode} from '@/config/regionCode';
  import {mapGetters} from 'vuex';
  import  MaskTip from '@/views/module/mask';
  export default {
    data() {
      return {
        regionCode: regionCode,
        defaultProps: {
          children: 'regionEntitys',
          label: 'region'
        },
        idNumber: this.$route.query.idNumber,
        reviewState: this.$route.query.reviewState,
        serviceInfo: '',
        isAll: true,
        tipsContent: '',
        tipsImg: '',
        tips: false,
        loading: false,
        cancleFlag:false,
        submitSuccess:"",
        serviceUrl:{"app":"app","web":"web端","wap":"wap","weChat":"微信端","other":"其他"}
      };
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components:{
      MaskTip
    },
    mounted(){
      this.initData();
      regionCode[0].region = "地区列表"
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        let results = false;
        value.forEach((item)=> {
          results = results || data.code.indexOf(item) !== -1
        })
        return results;
      },
      initData(){//初始化数据
        this.isSearch = false;
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/getByID",
          async: true,
          data: {
            idNumber: this.idNumber
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.msg == "success") {
            this.serviceInfo = res.data.results.dataList[0];
            this.reviewState = this.serviceInfo.reviewState;
            if (this.serviceInfo.region.indexOf("000000") > -1) {
              this.isAll = false;
            } else {
              this.$refs.tree.filter(this.serviceInfo.region);
              this.serviceInfo.region.forEach((item)=> {
                if (item.indexOf("0000") > 0) {
                  this.$refs.tree.store.nodesMap[item].expanded = false;
                }
              })
            }
            this.$refs.region.style.display = "block"
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      download(filePath){
        if (!filePath) {
          return;
        }
        window.location.href =  filePath
      },
      cancelN(){
        this.cancleFlag = false;
      },
      cancelApply(){
        this.cancleFlag = true;
      },
      closeDialog(flag){
        this.tips = flag;
      },
      cancelY(){
        this.cancleFlag = false;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/modifyService",
          async: true,
          data: {
            query: {idNumber: this.idNumber},
            modifyField: {reviewState: 2}
          },
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 200) {
            /*this.tips = true;
            this.tipsContent = "撤销成功";
            this.tipsImg = require("../../assets/img/dialog-successPic.png");
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/serviceJoin',
                name: "serviceJoin"
              })
            }, 1500);*/

            this.submitSuccess = "撤销成功";
            setTimeout(() => {
              this.submitSuccess = ""
              this.$router.push({
                path: '/serviceJoin',
                name: "serviceJoin"
              })
            }, 1500);


          } else {
           /* this.tips = true;
            this.tipsContent = "撤销失败";
            this.tipsImg = require("../../assets/img/dialog-failurePic.png");
            setTimeout(() => {
              this.tips = false;
            }, 1500);*/

            this.submitSuccess = "撤销失败";
            setTimeout(() => {
              this.submitSuccess = "";
            }, 1500);
          }
        }).catch(err=> {
          console.log(err)
        })

      }
    }

  };
</script>
<style scoped>
  @import "../../assets/css/main.css";
  @import "../../assets/css/dialog.css";
  .uploadLogoImg img{
    max-width: 200px;
    max-height:150px;
  }
  .publicList span .el-tree{
  	margin-top: -2px;
  }
  .publicTipBox{
    height: 110px;
    font-size: 16px;
    color: #333;
    text-align: center;
    overflow: hidden;
  }
  .publicTipBox p{
    margin-top: 50px;
  }
  .dialog-footer.publicFooter{
    margin-top: 30px;
  }
</style>
