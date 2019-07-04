<br /><template>
  <div>
    <div class="content">
      <div class="bread-crumbs">
        <div class="bread-crumbs-content">
          <span class="cor-0498e4">填写申请单</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--内容信息 start-->
        <div class="deleteCon applicForm">
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
              <input type="text" placeholder="请输入服务源名称，如身份证办理进度查询" v-model="serviceName"
                     @blur="inputBlur('serviceName')" maxlength="35"/>
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
              <div style="float: left;">
                <el-tree
                  :data="regionCode"
                  show-checkbox
                  node-key="code"
                  ref="tree"
                  highlight-current
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
            				<span class="logoWarp fl">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="logoUrl_display" :src="logoUrl_display" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            					<span class="uploadLogo">
                        <p><img src="../../assets/img/upload.png"></p>
                        <p>上传LOGO文件</p>
            					</span>
                        </el-upload>

            				</span>
            </div>
            <div class="publicList">
              <label style="float: left">服务用户手册：</label>
              <div style="float: left" class="orgFileClass fwjr-upload">
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
              <div style="float: left" class="orgFileClass fwjr-upload">
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
              <span v-if="isPay" class="btnTabDiv">
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
              </span>
            </div>
            <div class="publicList">
              <label>是否需要登录：</label>
              <span v-if="isLogin" class="btnTabDiv">
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
              </span>
            </div>
            <div class="publicList clearfix">
              <label class="fl">服务接入方式：</label>
            				<span class="fl">
            					<div class="tabLi clearfix">
            						<ul id="joinType_ul">
            							<li :class="{active:joinType==1}" @click="joinTypeToggle(1,$event)">服务内嵌方式</li>
            							<li :class="{active:joinType==2}" @click="joinTypeToggle(2,$event)">服务封装方式</li>
            							<li :class="{active:joinType==3}" @click="joinTypeToggle(3,$event)">主动采集方式</li>
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
                                @blur="inputBlur('describe')" maxlength="500" v-model="describe" style="background: #f2f1f4;"></textarea>
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
          <button class="btn-defalut btn-blue" @click="submit()">提交</button>
          <!--<button class="btn-defalut btn-white">取消</button>-->
        </div>
        <!--按钮 end-->
      </div>
      <MaskTip v-bind:tips = "tips"
               v-bind:tipsContent = "tipsContent"
               v-bind:tipsImg = "tipsImg"
               v-bind:loading = "loading"
               @listenToChildEvent = "closeDialog">
      </MaskTip>
    </div>
  </div>
</template>
<style scoped>
  .describeTips{
    margin-top: 20px;
  }
  .el-upload-list__item .el-icon-close {
    top: 18px;
  }

  .el-upload, .el-upload-list {
    float: left;
  }

  .el-upload-list__item:first-child {
    line-height: 45px;
  }

  .el-upload-list__item .el-icon-upload-success {
    float: right;
    margin-top: 18px;
  }

  .el-tree-node__content > .el-checkbox {
    width: 10px
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .deleteCon.applicForm .logoWarp .avatar-uploader .el-upload{
  	width: 178px;
    height: 178px;
  }
	.deleteCon.applicForm .logoWarp .avatar-uploader .el-upload .uploadLogo {
	    box-sizing: border-box;
	    top: 0;
	}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
	.upload-demo .el-upload button.el-button span{
		color: #fff;
	}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  textarea{
    resize: none;
    height: 70px;
    width: 520px;
  }
  .publicList.publicTree .el-tree-node__content label{
    height: 20px;
    padding-left:0;
    line-height: 17px;
  }
  .orgFileClass.fwjr-upload .el-upload-list__item-name {
	    width: 380px;
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
        idNumber: "",
        serviceName: '',
        serviceUrl: [],
        serviceType: 0,
        region: [],
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
        loading: false
      };
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components:{
      MaskTip
    },
    mounted(){
      this.createIdNumber();
      this.getUserByOpenID();
      window.addEventListener('click', this.handleSelectCon);
    },
    methods: {
      handleSelectCon(){
        this.serviceTypeShowChoice = false;
      },
      createIdNumber(){//生成idNumber：服务接入方式（1）+ 8位时间（YYMMDDHH）+6位随机数字
        const date = new Date();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        this.idNumber = "1" + date.getFullYear().toString().slice(2, 4) + m.toString() + d.toString() + h.toString()
          + Math.floor(Math.random() * 100000 + 100000).toString();
//        this.uploadUrl = "http://localhost:3002/serviceJoin/upload/" + this.idNumber

        this.uploadUrl = "/serviceJoin/upload/" + this.idNumber
      },
      getUserByOpenID(){
        if(this.getUserInfo){
          if(typeof this.getUserInfo == 'string'){
            this.openID = JSON.parse(this.getUserInfo).openID;
          }else{
            this.openID = this.getUserInfo.openID;
          }
        }
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/getUserByOpenID",
          async: true,
          data: {
            openID: this.openID
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.msg == "success") {
            this.contactName = res.data.results.name;
            this.contactTel = res.data.results.mobile;
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      checkServiceUrl(urlType, name){//服务接入方式及链接地址check选择框点击事件
        this[urlType] ? this[urlType] = false : this[urlType] = true;
        this[name + "Tips"] = "";
      },
      serviceTypeToChoice(){//服务类型下拉列表展开隐藏事件
        this.serviceTypeShowChoice ? this.serviceTypeShowChoice = false : this.serviceTypeShowChoice = true;
      },
      serviceTypeChoice(serviceType, serviceTypeText){//服务类型下拉列表点击事件
        this.serviceType = serviceType;
        this.serviceTypeText = serviceTypeText;
        this.serviceTypeShowChoice = false
        this.serviceTypeTips = "";
      },
      isLoginToggle(flag){
        this.isLogin = flag;
      },
      isPayToggle(flag){
        this.isPay = flag;
      },
      joinTypeToggle(type, e){
        this.joinType = type;
//        let liArr = document.getElementById("joinType_ul").childNodes;
//        for (let i = 0; i < liArr.length; i++) {
//          liArr[i].className = "";
//        }
//        e.target.className = "active";
      },
      //----------logo上传方法 start----------------------------------
      handleAvatarSuccess(res, file) {
        this.logoUrl_display = URL.createObjectURL(file.raw);
        this.logo = res.filePath;
      },
      beforeAvatarUpload(file) {
        const fileType = file.type.split("/")[file.type.split("/").length-1].toLowerCase();
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
        const fileType = file.name.split(".")[file.name.split(".").length-1].toLowerCase();
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
        const fileType = file.name.split(".")[file.name.split(".").length-1].toLowerCase();
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
      inputBlur(name){
        const reg1 = /^[a-zA-Z\u4e00-\u9fa5]+$///中文或英文
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
          if (!this.serviceName.trim()) {
            this.serviceNameTips = "请输入服务名称"
          } else if (reg2.test(this.serviceName.trim()[0])) {
            this.serviceNameTips = "首字母非特殊字符";
            //this.serviceNameTips = "服务名称格式不正确"
          } else {
            if(this.serviceName.trim().length >3){
              this.serviceNameTips = "";
            }else{
              this.serviceNameTips = "请输入3-35个字符";
              return;
            }

//            this.loading = true;
            axios({
              headers: {"Content-Type": "application/json"},
              method: "post",
              url: "/serviceJoin/checkOnlyOne",
              async: true,
              data: {openID: this.openID, serviceName: this.serviceName.trim()},
              contentType: 'application/json'
            }).then(res=> {
//              this.loading = false;
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
            }).catch(err=> {
              console.log(err)
            })

          }
        }
        if (name == "company") {
          if (!this.company.trim()) {
            this.companyTips = "请输入单位名称"
          } else if (reg2.test(this.company.trim()[0])) {
            this.companyTips = "首字母非特殊字符"
          } else {
            if(this.company.trim().length >2){
              this.companyTips = "";
            }else{
              this.companyTips = "请输入3-35个字符";
              return;
            }
            this.companyTips = "";
          }
        }
        if (name == "address") {
          if (!this.address.trim()) {
            this.addressTips = "请输入通讯地址"
          } else if (reg2.test(this.address.trim()[0])) {
            this.addressTips = "首字母非特殊字符"
          } else {
            this.addressTips = "";
          }
        }
        if (name == "describe") {
          if (!this.describe.trim()) {
            this.describeTips = "请输入服务接入事项描述"
          } else if (!reg1.test(this.describe.trim()[0])) {
            this.describeTips = "请输入字母或中文,至多500个字符"
          } else {
            this.describeTips = "";
          }
        }
      },
      serviceUrlBlur(isChecked, name){
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
      closeDialog(flag){
        this.tips = flag;
      },
      submit(){
        this.inputBlur("contactName");
        this.inputBlur("contactTel");
        this.inputBlur("serviceName");
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
        this.isWeb ? this.serviceUrl.push(this.web ? "Web_" + this.web : "") : "";
        this.isAPP ? this.serviceUrl.push("APP_" + this.app) : "";
        this.isWeChat ? this.serviceUrl.push("微信端_" + this.weChat) : "";
        this.isWAP ? this.serviceUrl.push("WAP_" + this.wap) : "";
        this.isOther ? this.serviceUrl.push("其他_" + this.other) : "";
        if (this.serviceUrl.length < 1) {
          this.serviceUrlTips = "请选择接入方式及链接地址";
          return;
        }
        const data = {
          openID: this.openID,
          idNumber: this.idNumber,
          serviceName: this.serviceName,
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
          address: this.address
        };
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/addService",
          async: true,
          data: data,
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.code == 200) {
            this.tips = true;
            this.tipsContent = "申请成功，等待审核";
            this.tipsImg = require("../../assets/img/dialog-successPic.png");
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/serviceJoin',
                name: "serviceJoin"
              })
            }, 3000);

          } else {
            this.tips = true;
            this.tipsContent = "申请失败";
            this.tipsImg = require("../../assets/img/dialog-failurePic.png");
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }
        }).catch(err=> {
          console.log(err)
        })
      }
    }
  };
</script>
