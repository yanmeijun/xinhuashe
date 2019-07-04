<template>
  <div>
    <div class="content">
      <div class="rm-main-box">
        <!--标题 start-->
        <div class="govTitle">
          <span>申请单详情</span>
        </div>
        <!--标题 end-->
        <!--内容信息 start-->
        <div class="deleteCon applicForm">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>申请单信息</div>
            <div class="publicList">
              <label>申请单编号：</label>
              <span>{{idNumber}}</span>
            </div>
            <div class="publicList">
              <label>申请时间：</label>
              <span>{{createDate}}</span>
            </div>
            <div class="publicList">
              <label>申请单状态：</label>
              <span class="pendReview" style="display: none;"><i class="icon2 icon-pendReview"></i>待审核</span>
              <span style="display: none;"><i class="icon2 icon-cancel"></i>已撤销</span>
              <span class="certifiedStatus" style="display: none;"><i class="icon2 icon-passed"></i>已通过</span>
              <span class="certifiedStatus not"><i class="icon2 icon-notPassed"></i>未通过</span>
            </div>
            <!--未通过时（显示）驳回的意见 -->
            <div class="publicList">
              <label>驳回意见：</label>
              <span>
                          <textarea class="realName-textarea" disabled>{{reviewSuggest}}</textarea>
                        </span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>联系人信息</div>
            <div class="publicList">
              <label>联系人姓名：</label>
              <input type="text" placeholder="请输入联系人姓名" v-model="contactName" @blur="inputBlur('contactName')"
                     maxlength="10"/>
              <div class="error-tips-box other">{{contactNameTips}}</div>
            </div>
            <div class="publicList">
              <label>联系人电话：</label>
              <input type="tel" placeholder="请输入联系人电话" v-model="contactTel" @blur="inputBlur('contactTel')"
                     maxlength="11"/>
              <div class="error-tips-box other">{{contactTelTips}}</div>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务接入信息</div>
            <div class="publicList">
              <label>服务名称：</label>
              <!--<input disabled type="text" placeholder="请输入服务源名称，如身份证办理进度查询" v-model="serviceName"-->
              <!--@blur="inputBlur('serviceName')"-->
              <!--maxlength="35"/>-->
              <span>{{serviceName}}</span>
              <div class="error-tips-box other">{{serviceNameTips}}</div>
            </div>
            <div class="publicList clearfix">
              <label class="fl">接入方式及链接地址：</label>
              <span class="linkAddress fl">
            					<p>
            						<i class="icon2 icon-checkDefault" :class="{active: isWeb}"
                           @click="checkServiceUrl('isWeb','web')"></i>
            						<em>Web</em>
            						<input type="text" placeholder="http://www.bjguahao.gov.cn/index.htm" v-model="web"
                               @blur="serviceUrlBlur(isWeb,'web')"/>
            						<span class="error-tips-box other">{{webTips}}</span>
            					</p>
                      <p>
            						<i class="icon2 icon-checkDefault" :class="{active: isAPP}"
                           @click="checkServiceUrl('isAPP','app')"></i>
            						<em>APP</em>
            						<input type="text" placeholder="http://114app.bjguahao.gov.cn/dw/index.htm?cn=4" v-model="app"
                               @blur="serviceUrlBlur(isAPP,'app')"/>
            						<span class="error-tips-box other">{{appTips}}</span>
            					</p>
                      <p>
            						<i class="icon2 icon-checkDefault" :class="{active: isWeChat}"
                           @click="checkServiceUrl('isWeChat','weChat')"></i>
            						<em>微信端</em>
            						<input type="text" placeholder="http://yyghwx.bjguahao.gov.cn/" v-model="weChat"
                               @blur="serviceUrlBlur(isWeChat,'weChat')"/>
            						<span class="error-tips-box other">{{weChatTips}}</span>
            					</p>
            					<p>
            						<i class="icon2 icon-checkDefault" :class="{active: isWAP}"
                           @click="checkServiceUrl('isWAP','wap')"></i>
            						<em>WAP</em>
            						<input type="text" placeholder="http://www.hnzwfw.gov.cn/col/col33/index.html" v-model="wap"
                               @blur="serviceUrlBlur(isWAP,'wap')"/>
            						<span class="error-tips-box other">{{wapTips}}</span>
            					</p>
            					<p>
            						<i class="icon2 icon-checkDefault" :class="{active: isOther}"
                           @click="checkServiceUrl('isOther','other')"></i>
            						<em>其他</em>
            						<input type="text" placeholder="请输入相关链接地址" v-model="other"
                               @blur="serviceUrlBlur(isOther,'other')"/>
            						<span class="error-tips-box other">{{otherTips}}</span>
            					</p>
                      <div class="error-tips-box">{{serviceUrlTips}}</div>
            				</span>
            </div>
            <div class="publicList clearfix">
              <label class="fl">服务类型：</label>
              <div class="downTxtDiv fl">
                <div class="dialog-downMenu flt" @click="serviceTypeToChoice" @click.stop>
                  <span class="defaul_option">{{serviceTypeText}}</span>
                  <i class="icon icon-downMenu"></i>
                  <div v-if="serviceTypeShowChoice" class="downMenuShow" @click.stop>
                    <ul>
                      <!--<li>请选择服务类型</li>-->
                      <li @click="serviceTypeChoice(1,'业务查询')">业务查询</li>
                      <li @click="serviceTypeChoice(2,'业务办理')">业务办理</li>
                      <li @click="serviceTypeChoice(3,'业务预约')">业务预约</li>
                    </ul>
                  </div>
                </div>
                <div class="error-tips-box">{{serviceTypeTips}}</div>
              </div>
            </div>
            <div class="publicList publicTree">
              <label style="float: left; line-height: initial">服务范围：</label>
              <div v-if="isRegion" style="float: left;">
                <el-tree
                  :data="regionCode"
                  show-checkbox
                  node-key="code"
                  ref="tree"
                  highlight-current
                  :default-checked-keys="region"
                  :props="defaultProps">
                </el-tree>
                <div class="error-tips-box">{{regionTips}}</div>
              </div>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务其他补充信息</div>
            <div class="publicList clearfix">
              <label class="fl">服务LOGO：</label>
              <!--<span class="logoWarp fl">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="logoUrl_display" :src="logoUrl_display" class="avatar">
                          <span class="uploadLogo">
                  <p><img src="../../assets/img/upload.png"></p>
                  <p>上传LOGO文件</p>
                          </span>
                  </el-upload>

                      </span>-->
              <div class="fl wh614">
                <div class="upload-ID">
                  <!--<a href="javascript:;" class="selectFile">上传文件</a>-->
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="logoUrl_display" :src="logoUrl_display" class="avatar">
                    <span class="uploadLogo">
                                     <div class="IDSuccess" v-if="logoUrl_display" style="width: 188px;">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                </span>
                  </el-upload>
                </div>
              </div>
            </div>
            <div class="publicList">
              <label style="float: left">服务用户手册：</label>
              <div style="float: left">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-remove="handleGuideRemove"
                  :on-change="handleGuideChange"
                  :on-success="handleGuideSuccess"
                  :before-upload="beforeGuideUpload"
                  :file-list="guide_file">
                  <el-button v-if="!guide" size="small" type="primary">选择文件</el-button>
                  <el-button v-else size="small" type="primary"><i class="icon2 icon-change"></i>更改</el-button>
                </el-upload>
              </div>
            </div>
            <div class="publicList">
              <label style="float: left">服务源的测试报告：</label>
              <div style="float: left">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-remove="handleTestReportRemove"
                  :on-change="handleTestReportChange"
                  :on-success="handleTestReportSuccess"
                  :before-upload="beforeTestReportUpload"
                  :file-list="testReport_file">
                  <el-button v-if="!testReport" size="small" type="primary">选择文件</el-button>
                  <el-button v-else size="small" type="primary"><i class="icon2 icon-change"></i>更改</el-button>
                </el-upload>
              </div>
            </div>
            <div class="publicList">
              <label>服务使用过程中是否需要支付：</label>
              <!-- <span v-if="isPay" class="btnTabDiv">
                 <span class="move_con open" @click="isPayToggle(false)">
                   <span class="move move_open" data-state="on"></span>
                 </span>
                 <span class="tabWord">是</span>
               </span>
               <span v-else class="btnTabDiv">
                 <span class="move_con close" @click="isPayToggle(true)">
                   <span class="move move_open" data-state="off" style="left: 2px;"></span>
                 </span>
                 <span class="tabWord">否</span>
               </span>-->
              <div class="select-box service_select" @click.stop @click="selectPayType" style="float: left;">
											<span class="defaul_option deep_defaul_option">
												{{payCon}}
											</span>
                <i class="icon4 icon-downMenu"></i>
                <div class="selectCon whether_selectCon" v-if="payType">
                  <p class="curPointer" @click="isPayFun(true,'是')" @click.stop>是</p>
                  <p class="curPointer" @click="isPayFun(false,'否')" @click.stop>否</p>
                </div>
              </div>
            </div>
            <div class="publicList">
              <label>是否需要登录：</label>
              <!-- <span v-if="isLogin" class="btnTabDiv">
                 <span class="move_con open" @click="isLoginToggle(false)">
                   <span class="move move_open" data-state="on"></span>
                 </span>
                 <span class="tabWord">是</span>
               </span>
               <span v-else class="btnTabDiv">
                 <span class="move_con close" @click="isLoginToggle(true)">
                   <span class="move move_open" data-state="off" style="left: 2px;"></span>
                 </span>
                 <span class="tabWord">否</span>
               </span>-->

              <div class="select-box service_select" @click.stop @click="selectLoginType" style="float: left;">
											<span class="defaul_option deep_defaul_option">
												{{loginCon}}
											</span>
                <i class="icon4 icon-downMenu"></i>
                <div class="selectCon whether_selectCon" v-if="loginType">
                  <p class="curPointer" @click="isLoginFun(true,'是')" @click.stop>是</p>
                  <p class="curPointer" @click="isLoginFun(false,'否')" @click.stop>否</p>
                </div>
              </div>

            </div>
            <div class="publicList clearfix">
              <label class="fl">服务接入方式：</label>
              <span class="fl">
            					<div class="tabLi clearfix">
            						<ul id="joinType_ul">
            							<li :class="{active:joinType==1}" @click="joinTypeToggle(1)">服务内嵌方式</li>
            							<li :class="{active:joinType==2}" @click="joinTypeToggle(2)">服务封装方式</li>
            							<li :class="{active:joinType==3}" @click="joinTypeToggle(3)">主动采集方式</li>
            						</ul>
            					</div>
            					<div class="tab-con">
            						<p v-if="joinType==1">注：服务内嵌方式：服务源提供方可将其服务进行封装为H5页面，政务服务与数据集成平台可直接调用该H5页面进行嵌入，通过统一政务服务展示平台向互联网用户进行展示。</p>
            						<p v-if="joinType==2">注：服务封装方式：服务源提供方可将其提供的服务项自行封装为API接口，政务服务与数据集成平台可直接调用API接口，制作前端界面，并通过服务展示平台进行展示。</p>
            						<p v-if="joinType==3">注：主动采集方式：如服务源无技术实力对系统进行对接，通过申请后，可由政务数据与服务采集平台进行主动式采集，并进行封装API后制作前端界面，通过服务展示平台进行展示。</p>
            					</div>
            				</span>
            </div>
            <div class="publicList">
              <label>服务接入事项描述：</label>
              <span>
            					<textarea class="serviceDescription" placeholder="请对该服务来源系统及其他事项进行说明"
                                @blur="inputBlur('describe')" maxlength="500" v-model="describe"
                                style="background: #f2f1f4;"></textarea>
            				</span>
              <div class="error-tips-box other describeTips">{{describeTips}}</div>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务主管部门</div>
            <div class="publicList">
              <label>单位名称：</label>
              <input type="text" placeholder="请输入单位名称" v-model="company" @blur="inputBlur('company')" maxlength="35"/>
              <div class="error-tips-box other">{{companyTips}}</div>
            </div>
            <div class="publicList">
              <label>通讯地址：</label>
              <input type="text" placeholder="请输入通讯地址" v-model="address" @blur="inputBlur('address')" maxlength="50"/>
              <div class="error-tips-box other">{{addressTips}}</div>
            </div>
          </div>
        </div>
        <!--内容信息 end-->
        <!--按钮 start-->
        <div class="btnBgBox">
          <button class="btn-defalut btn-blue" @click="submit()">再次提交</button>
          <!--<button class="btn-defalut btn-white">取消</button>-->
        </div>
        <!--按钮 end-->
      </div>
      <MaskTip v-bind:tips="tips"
               v-bind:tipsContent="tipsContent"
               v-bind:tipsImg="tipsImg"
               v-bind:loading="loading"
               @listenToChildEvent="closeDialog">
      </MaskTip>
    </div>
  </div>
</template>
<style scoped>
  @import "../../assets/css/main.css";
  @import "../../assets/css/dialog.css";
  @import "../../assets/css/serviceApply.css";

  .upload-ID .avatar-uploader .el-upload {
    width: 188px;
    height: 114px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative !important;
    overflow: hidden;
  }

  .avatar-uploader {
    position: relative;
  }

  .avatar {
    max-width: 188px;
    max-height: 114px;
    position: absolute;
    width: 188px;
    height: 114px;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {regionCode} from '@/config/regionCode';
  import {mapGetters} from 'vuex';
  import MaskTip from '@/views/module/mask';

  export default {
    data() {
      return {
        regionCode: regionCode,//全国各地区行政编码
        defaultProps: {
          children: 'regionEntitys',
          label: 'region'
        },
        openID: '',
        idNumber: this.$route.query.idNumber,
        serviceName: '',
        serviceUrl: [],
        serviceType: 0,
        region: [],
        isRegion: false,
        logo: '',
        guide: "",
        guide_file: [],
        testReport: '',
        testReport_file: [],
        isPay: false,
        isLogin: false,
        joinType: 1,
        describe: '',
        contactName: '',
        contactTel: '',
        company: '',
        address: '',
        isWeChat: false,
        isWeb: false,
        isWAP: false,
        isAPP: false,
        isOther: false,
        weChat: '',
        web: '',
        wap: '',
        app: '',
        other: '',
        createDate: '',
        reviewSuggest: '',
        serviceTypeShowChoice: false,//服务类型选择下拉显示flag
        serviceTypeText: "请选择服务类型",//服务类型选择框text内容
        logoUrl_display: require('../../assets/img/uploadBg.jpg'),
        uploadUrl: "",//文件上传请求地址
        contactNameTips: '',
        contactTelTips: '',
        serviceNameTips: '',
        serviceUrlTips: '',
        serviceTypeTips: '',
        regionTips: '',
        describeTips: '',
        companyTips: '',
        addressTips: '',
        weChatTips: '',
        webTips: '',
        wapTips: '',
        appTips: '',
        otherTips: '',
        tipsContent: '',
        tipsImg: '',
        tips: false,
        loading: false,

        payCon: "否",
        payType: false,

        loginCon: "否",
        loginType: false,
      };
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    mounted() {
      if (this.getUserInfo) {
        this.openID = JSON.parse(this.getUserInfo).openID;
      }
//      this.uploadUrl = "http://localhost:3001/serviceJoin/upload/" + this.idNumber
      this.uploadUrl = "/serviceJoin/upload/" + this.idNumber
      this.initData();
      window.addEventListener('click', this.handleSelectCon);
    },
    methods: {
      handleSelectCon() {
        this.serviceTypeShowChoice = false;
      },
      initData() {//初始化数据
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
        }).then(res => {
          this.loading = false;
          if (res.data.msg == "success") {
            const serviceInfo = res.data.results.dataList[0];
            this.serviceName = serviceInfo.serviceName;
            this.serviceUrl = serviceInfo.serviceUrl;
            this.serviceType = serviceInfo.serviceType;
            this.region = serviceInfo.region;
            this.isRegion = true;
            this.logo = serviceInfo.logo;
//            this.logoUrl_display = serviceInfo.logo ? "http://localhost:3001" + serviceInfo.logo : require('../../assets/img/uploadBg.jpg');
            this.logoUrl_display = serviceInfo.logo ? serviceInfo.logo : require('../../assets/img/uploadBg.jpg');
            this.guide = serviceInfo.guide;
            this.guide_file = serviceInfo.guide ? [{name: serviceInfo.guide.split('/')[6]}] : [];
            this.testReport = serviceInfo.testReport;
            this.testReport_file = serviceInfo.testReport ? [{name: serviceInfo.testReport.split('/')[6]}] : [];

            if (serviceInfo.isPay) {
              this.payCon = "是";
            } else {
              this.payCon = "否";
            }
            this.isPay = serviceInfo.isPay;


            this.isLogin = serviceInfo.isLogin;
            if (serviceInfo.isLogin) {
              this.loginCon = "是";
            } else {
              this.loginCon = "否";
            }
            this.joinType = serviceInfo.joinType;
            this.describe = serviceInfo.describe;
            this.contactName = serviceInfo.contactName;
            this.contactTel = serviceInfo.contactTel;
            this.company = serviceInfo.company;
            this.address = serviceInfo.address;
            this.createDate = serviceInfo.createDate;
            this.reviewSuggest = serviceInfo.reviewSuggest;
            this.serviceTypeText = this.serviceType == 1 ? "业务查询" : this.serviceType == 2 ? "业务办理" : "业务预约"
            for (let i = 0; i < this.serviceUrl.length; i++) {
              let type = this.serviceUrl[i].split("_")[0],
                url = this.serviceUrl[i].split("_")[1];
              if (type == "web") {
                this.isWeb = true;
                this.web = url;
              } else if (type == "app") {
                this.isAPP = true;
                this.app = url;
              } else if (type == "weChat") {
                this.isWeChat = true;
                this.weChat = url;
              } else if (type == "wap") {
                this.isWAP = true;
                this.wap = url;
              } else if (type == "other") {
                this.isOther = true;
                this.other = url;
              }
            }
          } else {
            alert("数据加载失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      checkServiceUrl(urlType, name) {//服务接入方式及链接地址check选择框点击事件
        this[urlType] ? this[urlType] = false : this[urlType] = true;
        this[name + "Tips"] = "";
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
      isLoginToggle(flag) {
        this.isLogin = flag;
      },
      isPayToggle(flag) {
        this.isPay = flag;
      },
      joinTypeToggle(type) {
        this.joinType = type;
      },
      //----------logo上传方法 start----------------------------------
      handleAvatarSuccess(res, file) {
        this.logoUrl_display = URL.createObjectURL(file.raw);
        this.logo = res.filePath;
      },
      beforeAvatarUpload(file) {
        const fileType = file.type.split("/")[file.type.split("/").length - 1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('只支持jpg/jpeg/bmp/png格式！');
        }
        if (!isLt2M) {
          this.$message.error('请选择大小不超过5M的图片！');
        }
        return isJPG && isLt2M;
      },
      //--------------logo上传 end--------------------------------------
      //----------guide文件上传方法 start----------------------------------
      handleGuideRemove(file, fileList) {
        this.guide = "";
      },
      handleGuideChange(file, fileList) {
        this.guide_file = fileList.slice(-1);
      },
      handleGuideSuccess(res, file) {
        this.guide = res.filePath;
      },
      beforeGuideUpload(file) {
        const fileType = file.name.split(".")[file.name.split(".").length - 1].toLowerCase();
        const isJPG = fileType === "doc" || fileType === "docx" || fileType === "xls" || fileType === "xlsx" || fileType === "pdf";
        const isLt2M = file.size / 1024 / 1024 < 30;
        if (!isJPG) {
          this.guide_file = [];
          this.$message.error('只支持word、excel、pdf格式！');
        }
        if (!isLt2M) {
          this.guide_file = [];
          this.$message.error('请上传大小不超过30M的文件！');
        }
        return isJPG && isLt2M;
      },
      //----------guide文件上传方法 end----------------------------------
      // ----------testReport文件上传方法 start----------------------------------
      handleTestReportRemove(file, fileList) {
        this.testReport = "";
      },
      handleTestReportChange(file, fileList) {
        this.testReport_file = fileList.slice(-1);
      },
      handleTestReportSuccess(res, file) {
        this.testReport = res.filePath;
      },
      beforeTestReportUpload(file) {
        const fileType = file.name.split(".")[file.name.split(".").length - 1].toLowerCase();
        const isJPG = fileType === "doc" || fileType === "docx" || fileType === "xls" || fileType === "xlsx" || fileType === "pdf";
        const isLt2M = file.size / 1024 / 1024 < 30;
        if (!isJPG) {
          this.testReport_file = [];
          this.$message.error('只支持word、excel、pdf格式！');
        }
        if (!isLt2M) {
          this.testReport_file = [];
          this.$message.error('请上传大小不超过30M的文件！');
        }
        return isJPG && isLt2M;
      },
      //----------testReport文件上传方法 end----------------------------------
      inputBlur(name) {
        const reg1 = /^[\u4e00-\u9fa5A-Za-z]{0,}$///中文或英文
        const reg2 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;//特殊字符
        if (name == "contactName") {
          if (!this.contactName.trim()) {
            this.contactNameTips = "请输入联系人姓名"
          } else if (this.contactName.trim().length < 2 || !reg1.test(this.contactName.trim())) {
            this.contactNameTips = "请输入2-10个字母或汉字"
          } else {
            this.contactNameTips = "";
          }
        }
        if (name == "contactTel") {
          if (!this.contactTel.trim()) {
            this.contactTelTips = "请输入联系人电话"
          } else if ((this.contactTel.trim()[0] == 1 || this.contactTel.trim()[0] == "1") && this.contactTel.trim().length != 11) {
            this.contactTelTips = "手机号格式错误"
          } else {
            this.contactTelTips = "";
          }
        }
        if (name == "serviceName") {
        }
        if (name == "company") {
          if (!this.company.trim()) {
            this.companyTips = "请输入单位名称"
          } else if (reg2.test(this.company.trim()[0])) {
            this.companyTips = "首字母非特殊字符，至多3-35个字符"
          } else {
            if (this.company.trim().length > 2) {
              this.companyTips = "";
            } else {
              this.companyTips = "首字母非特殊字符，至多3-35个字符";
              return;
            }
            this.companyTips = "";
          }
        }
        if (name == "address") {
          if (!this.address.trim()) {
            this.addressTips = "请输入通讯地址"
          } else if (reg2.test(this.address.trim()[0])) {
            this.addressTips = "首字母非特殊字符，至多50个字符"
          } else {
            this.addressTips = "";
          }
        }
        if (name == "describe") {
          if (!this.describe.trim()) {
            this.describeTips = "服务接入事项描述"
          } else if (reg2.test(this.describe.trim()[0])) {
            this.describeTips = "首字母非特殊字符。至多500字"
          } else {
            this.describeTips = "";
          }
        }
      },
      serviceUrlBlur(isChecked, name) {
        if (!isChecked) {
          return;
        } else {
          if (!this[name].trim()) {
            this[name + "Tips"] = "链接地址不能为空";
            return;
          }
          const url = this[name].trim().slice(0, 8).toLowerCase();
          if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0) {
            this[name + "Tips"] = "请输入正确的链接地址";
            return;
          } else {
            this[name + "Tips"] = "";
          }
        }
      },
      submit() {
        this.inputBlur("contactName");
        this.inputBlur("contactTel");
        this.inputBlur("company");
        this.inputBlur("address");
        this.inputBlur("describe");
        this.serviceUrlBlur(this.isWeb, "web");
        this.serviceUrlBlur(this.isAPP, "app");
        this.serviceUrlBlur(this.isWeChat, "weChat");
        this.serviceUrlBlur(this.isWAP, "wap");
        this.serviceUrlBlur(this.isOther, "other");
        if (this.contactNameTips || this.contactTelTips || this.serviceNameTips
          || this.companyTips || this.addressTips || this.webTips || this.appTips
          || this.wapTips || this.weChatTips || this.otherTips || this.describeTips) {
          return;
        }
        if (this.serviceType == 0) {
          this.serviceTypeTips = "请选择服务类型";
          return;
        }
        this.region = this.$refs.tree.getCheckedKeys();
        if (this.region.length < 1) {
          this.regionTips = "请选择服务范围";
          return;
        }
        this.serviceUrl = [];
        this.isWeb ? this.serviceUrl.push(this.web ? "web_" + this.web : "") : "";
        this.isAPP ? this.serviceUrl.push("app_" + this.app) : "";
        this.isWeChat ? this.serviceUrl.push("weChat_" + this.weChat) : "";
        this.isWAP ? this.serviceUrl.push("wap_" + this.wap) : "";
        this.isOther ? this.serviceUrl.push("other_" + this.other) : "";
        if (this.serviceUrl.length < 1) {
          this.serviceUrlTips = "请选择接入方式及链接地址";
          return;
        }
        const data = {
          serviceUrl: this.serviceUrl,
          serviceType: this.serviceType,
          region: this.region,
          logo: this.logo,
          guide: this.guide,
          testReport: this.testReport,
          isPay: this.isPay,
          isLogin: this.isLogin,
          joinType: this.joinType,
          describe: this.describe,
          contactName: this.contactName,
          contactTel: this.contactTel,
          company: this.company,
          address: this.address,
          reviewState: 1
        };
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/modifyService",
          async: true,
          data: {
            query: {
              openID: this.openID,
              idNumber: this.idNumber
            },
            modifyField: data
          },
          contentType: 'application/json'
        }).then(res => {
          this.loading = false;
          if (res.data.code == 200) {
            this.tips = true;
            this.tipsContent = "申请成功，等待审核";
            this.tipsImg = require("../../assets/img/dialog-successPic.png");
            setTimeout(() => {
              this.tips = false;
            }, 3000);
            this.$router.push({
              path: '/serviceJoin',
              name: "serviceJoin"
            })
          } else {
            this.tips = true;
            this.tipsContent = "申请失败，等待审核";
            this.tipsImg = require("../../assets/img/dialog-failurePic.png");
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }
        }).catch(err => {
          console.log(err)
        })
      },
      closeDialog(flag) {
        this.tips = flag;
      },


      isPayFun(payMethod, payText) {//服务类型下拉列表点击事件
        this.isPay = payMethod;
        this.payCon = payText;
        this.payType = false;
      },
      selectPayType() {
        this.payType = this.payType == false ? this.payType = true : this.payType = false;
      },
      isLoginFun(loginMethod, loginText) {
        this.isLogin = loginMethod;
        this.loginCon = loginText;
        this.loginType = false;
      },
      selectLoginType() {
        this.loginType = this.loginType == false ? this.loginType = true : this.loginType = false;
      },
    }
  };
</script>
