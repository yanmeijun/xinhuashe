<template>
  <!-- 第三步 -->
  <div class="tabList clearfix">
    <div class="tabCon">
      <div class="ListCon" id="fwxq">
        <div class="tableBox whiteBG serviceApplyTable application uploadFileEllipsis">
          <table class="table">
            <tr>
              <td>服务logo：</td>
              <td>
										<span class="logoWarp fl">
                        <el-upload
                          class="avatar-uploader"
                          :action="uploadUrl"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                        <img v-if="logoUrl_display" :src="logoUrl_display" class="avatar">
                          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            					<span class="uploadLogo">
                        <p><img src="./../../assets/img/serviceApply/upload.png"></p>
                        <p>点击上传</p>
            					</span>
                        </el-upload>
                      <!--<p><img src="./../../assets/img/serviceApply/upload.png"></p>
                                  <p>点击上传</p>-->
                    </span>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 16px;">服务用户手册：</td>
              <td>
                <!-- <button type="button" class="el-button&#45;&#45;primary"><span>选择文件</span></button>-->

                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-remove="handleGuideRemove"
                  :on-change="handleGuideChange"
                  :on-success="handleGuideSuccess"
                  :before-upload="beforeGuideUpload"
                  :file-list="guide_file">
                  <el-button size="small" type="primary">选择文件</el-button>
                  <!--<el-button v-if="!guide" size="small" type="primary">选择文件</el-button>
                  <el-button v-else size="small" type="primary"><i class="icon2 icon-change"></i>更改</el-button>-->
                </el-upload>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 16px;">服务源的测试报告：</td>
              <td>
                <!--<button type="button" class="el-button&#45;&#45;primary"><span>选择文件</span></button>-->
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-remove="handleTestReportRemove"
                  :on-change="handleTestReportChange"
                  :on-success="handleTestReportSuccess"
                  :before-upload="beforeTestReportUpload"
                  :file-list="testReport_file">
                  <el-button size="small" type="primary">选择文件</el-button>
                  <!--<el-button v-if="!testReport" size="small" type="primary">选择文件</el-button>
                  <el-button v-else size="small" type="primary"><i class="icon2 icon-change"></i>更改</el-button>-->
                </el-upload>
              </td>
            </tr>
            <tr>
              <td>服务使用过程中的支付：</td>
              <td>
                <div class="select-box service_select" @click.stop @click="selectPayType" @mouseover="show2" @mouseout="hide2">
											<span class="defaul_option deep_defaul_option">
												{{payCon}}
											</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="selectCon whether_selectCon" v-if="payType">
                    <p class="curPointer" @click="isPay(true,'是')" @click.stop>是</p>
                    <p class="curPointer" @click="isPay(false,'否')" @click.stop>否</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>是否需要登录：</td>
              <td>
                <div class="select-box service_select" @click.stop @click="selectLoginType" @mouseover="show3" @mouseout="hide3">
											<span class="defaul_option deep_defaul_option">
												{{loginCon}}
											</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="selectCon whether_selectCon" v-if="loginType">
                    <p class="curPointer" @click="isLogin(true,'是')" @click.stop>是</p>
                    <p class="curPointer" @click="isLogin(false,'否')" @click.stop>否</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 18px;">服务接入方式：</td>
              <td>
                <div class="select-box service_select" style='width: 501px;' @click.stop @click="selectJoinType"  @mouseover="show4" @mouseout="hide4">
											<span class="defaul_option deep_defaul_option">
												{{joinCon}}
											</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="selectCon" id="selectBocCon"
                       style="height: auto;"
                       v-if="joinType">
                    <p class="curPointer" @click="joinTypeToggle(1,'服务内嵌方式')" @click.stop>服务内嵌方式</p>
                    <p class="curPointer" @click="joinTypeToggle(2,'服务封装方式')" @click.stop>服务封装方式</p>
                    <p class="curPointer" @click="joinTypeToggle(3,'主动采集方式')" @click.stop>主动采集方式</p>
                  </div>
                </div>
                <span
                  class="remarks">注：服务内嵌方式：服务源提供方可将其服务进行封装为H5页面。政务服务与数据集成平台可直接调用H5页面进行嵌入，通过统一政务服务展示平台向互联网用户进行展示。</span>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;padding-top: 18px;">服务接入事项描述：</td>
              <td>
                <textarea
                  maxlength="500" v-model="describe"
                  @blur="inputBlur('describe')"
                  placeholder="请对该服务来源系统及其他事项进行说明"></textarea>
                <div class="error pla-email-use"
                     style="margin-right: 75px;"
                     v-if="describeTips"
                ><i class="pla-email"></i>{{describeTips}}
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href="javascript:;" class="btnApply btnApplyService" @click="preStep">上一步</a>
                <a href="javascript:;" class="btnApply btnApplyService" @click="submit()">提&nbsp;交</a>
                <a href="javascript:;" class="btnApply btnApplyService" @click="cancel">取&nbsp;消</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:errorTipsContent = "errorTipsContent"
             v-bind:tipsImg = "tipsImg"
             v-bind:loading = "loading"
             v-bind:toRouter = "toRouter"
             @listenToChildEvent = "closeDialog">
    </MaskTip>
  </div>
</template>
<script>
  import {mapGetters, mapState, mapActions} from 'vuex';
  import MaskTip from '@/views/module/maskTip';
  import {checkFileName} from '@/config/util';
  export default {
    name: 'container',
    data() {
      return {
        uploadUrl: "",//文件上传请求地址
        logoUrl_display: require('../../assets/img/uploadBg.jpg'),
        logo: '',
        guide: "",
        guide_file: [],
        testReport: '',
        testReport_file: [],
        payType: false,
        payCon: "否",
        payMethod: false,
        loginCon: "否",
        loginType: false,
        loginMethod: false,
        joinCon: "服务内嵌方式",
        joinType: false,
        joinMethod: 1,
        describe:"",
        describeTips: '',
        idNumber:"",
        tipsContent: '',
        errorTipsContent:"",
        tipsImg: '',
        tips: false,
        loading: false,
        toRouter:"application",
        isOpen:false
      }
    },
    mounted() {
      this.createIdNumber();
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";//得到用户的openID
      window.addEventListener('click', this.handleSelect);
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: { MaskTip},
    created() {
    },
    methods: {
      createIdNumber() {//生成idNumber：服务接入方式（1）+ 8位时间（YYMMDDHH）+6位随机数字
        const date = new Date();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        this.idNumber = "1" + date.getFullYear().toString().slice(2, 4) + m.toString() + d.toString() + h.toString()
          + Math.floor(Math.random() * 100000 + 100000).toString();


        //this.uploadUrl = "http://localhost:3002/serviceJoin/upload/" + this.idNumber
        this.uploadUrl = "/serviceJoin/upload/" + this.idNumber
      },
      //----------logo上传方法 start----------------------------------
      handleAvatarSuccess(res, file) {
        this.logoUrl_display = URL.createObjectURL(file.raw);
        this.logo = res.filePath;
      },
      beforeAvatarUpload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
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
        if(!checkFileName(file)){
          this.guide_file = [];
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
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
        if(!checkFileName(file)){
          this.testReport_file = [];
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
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
      selectPayType() {
        this.payType = this.payType == false ? this.payType = true : this.payType = false;
      },
      handleSelect() {
        this.payType = false;
        this.loginType = false;
        this.joinType = false;
      },
      isPay(payMethod, payText) {//服务类型下拉列表点击事件
        this.payCon = payText;
        this.payMethod = payMethod;
        this.payType = false;
      },
      isLogin(loginMethod, loginText) {
        this.loginCon = loginText;
        this.loginMethod = loginMethod;
        this.loginType = false;
      },
      selectLoginType() {
        this.loginType = this.loginType == false ? this.loginType = true : this.loginType = false;
      },
      selectJoinType() {
        this.joinType = this.joinType == false ? this.joinType = true : this.joinType = false;
      },
      joinTypeToggle(joinMethod, joinText) {
        this.joinCon = joinText;
        this.joinMethod = joinMethod;
        this.joinType = false;
      },
      inputBlur(name) {
        const reg1 = /^[\u4e00-\u9fa5A-Za-z]{0,}$///中文或英文
        const reg2 = new RegExp("[`~!@#$^&*《》()-=+|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]");//特殊字符
        if (name == "describe") {
          if (!this.describe.trim()) {
            this.describeTips = "必填项";
            return;
          } else if (reg2.test(this.describe.trim()[0])) {
            this.describeTips = "首字母非特殊字符。至多500字";
            return;
          } else {
            this.describeTips = "";
          }
        }
      },
      submit(){
       this.inputBlur('describe');
        if(this.describeTips){
         return;
        }
        const data = {
          openID: this.openID,
          idNumber: this.idNumber,
          serviceName: sessionStorage.getItem("serviceName"),
          serviceUrl: JSON.parse(sessionStorage.getItem("serviceUrl")),
          serviceType: Number(sessionStorage.getItem("serviceType")),
          region: JSON.parse(sessionStorage.getItem("region")),
          logo: this.logo,
          guide: this.guide,
          testReport: this.testReport,
          isPay: this.payMethod,
          isLogin: this.loginMethod,
          joinType: this.joinMethod,
          describe: this.describe,
          contactName: sessionStorage.getItem("contactName"),
          contactTel: sessionStorage.getItem("contactTel"),
          company: sessionStorage.getItem("company"),
          address: sessionStorage.getItem("address")
        };
        this.loading = true;
        this.$http({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/addService",
          async: true,
          data:data ,
          contentType: 'application/json'
        }).then(res => {
          this.loading = false;
          if (res.data.code == 200) {
             sessionStorage.setItem("idNumber",this.idNumber);
             this.$router.push({
                name:"applyFourStep"
             })
          } else {
            this.tips = true;
            this.tipsContent = "提交申请失败";
            this.errorTipsContent = "提交信息有误,请重新填写";
            this.tipsImg = require("../../assets/img/serviceApply/picFailure.png");
            /*setTimeout(() => {
              this.tips = false;
            }, 3000);*/
          }
        }).catch(err => {
          console.log(err)
        })
      },
      preStep(){
        this.$router.push({
          name:"applySecondStep",
          params:{serviceName: sessionStorage.getItem("serviceName"),serviceType:sessionStorage.getItem("serviceType"),region:sessionStorage.getItem("preRegion"),serviceUrl:sessionStorage.getItem("serviceUrl")}
        });
      },
      cancel(){
        this.$router.push({
          name:"devPlatform"
        });
      },
      closeDialog(flag){
        this.tips = flag;
      },
      hide2(){
        this.payType = false;
      },
      show2(){
        //this.$refs.tree.setCheckedKeys([]);
        this.payType = true;
      },
      hide3(){
        this.loginType = false;
      },
      show3(){
        //this.$refs.tree.setCheckedKeys([]);
        this.loginType = true;
      },
      hide4(){
        this.joinType = false;
      },
      show4(){
        //this.$refs.tree.setCheckedKeys([]);
        this.joinType = true;
      },

    },
    watch: {}
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";
  .avatar-uploader .el-upload{
    overflow: inherit;
    float: none;
    display: inherit;
    position: inherit;
  }
</style>
<style>
	/*服务用户手册、服务源的测试报告名称截取（插件）*/
	.uploadFileEllipsis .el-upload-list__item-name{
		float: left !important;
	  margin-right: 20px !important;
	  max-width: 850px !important;
	}
	.uploadFileEllipsis .el-upload-list__item-status-label,
	.uploadFileEllipsis .el-upload-list__item .el-icon-close{
		position: static !important;
		float: left !important;
		line-height: 25px;
	}
</style>
