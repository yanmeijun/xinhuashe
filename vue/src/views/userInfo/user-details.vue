<template>
  <div class="content">
    <!--
      confirmStatus 状态
      认证状态 ："2"未通过 "1"待审核 "3"已通过 "0" 未认证
      @1 认证状态为 1代审核和3已通过 不可编辑
      @2 认证状态为 2未通过和0未认证 可以编辑
    -->
    <div v-for="(item,index) in userInforList" :key="index">
      <!--位置信息 start-->
      <div class="bread-crumbs">
        <div class="bread-crumbs-content">
          <span class="cor-0498e4">用户管理</span>
          <span class="locationgLine">&frasl;</span>
          <span class="corBlue">用户信息详情</span>
        </div>
      </div>
      <!--位置信息 end-->
      <div class="rm-main-box">
        <!--内容信息 start-->
        <div class="deleteCon">
          <!--用户基本信息开始-->
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>用户信息</div>
            <div class="publicList">
              <label>用户名：</label>
              <span>{{item.userName}}</span>
            </div>
            <div class="publicList">
              <label>OpenID：</label>
              <span>{{item.openID}}</span>
            </div>
            <div class="publicList">
              <label>注册时间：</label>
              <span>{{item.registerTime}}</span>
            </div>
            <div class="publicList">
              <label>用户状态：</label>
              <span v-if="item.isStop == '1'">启用</span>
              <span v-if="item.isStop == '0'">停用</span>
            </div>
            <div class="publicList">
              <label>认证状态：</label>
              <span class="pendReview" v-if="item.confirmStatus == '1'"><i class="icon3 icon-pendReview"></i>待审核</span>
              <span class="pendReview" v-if="item.confirmStatus == '0'"><i class="icon3 icon-pendReview"></i>未认证</span>
              <span class="certifiedStatus" v-if="item.confirmStatus == '3'"><i class="icon3 icon-passed"></i>已通过</span>
              <span class="certifiedStatus not" v-if="item.confirmStatus == '2'"><i class="icon3 icon-notPassed"></i>未通过</span>
            </div>
            <!--未通过时（显示）驳回的意见 -->
            <div class="publicList" v-if="item.confirmStatus == 2 || item.confirmStatus == '2'">
            <label>驳回意见：</label>
            <span>
            <textarea class="realName-textarea" readonly style="cursor: default">{{item.rejectOpinion}}</textarea>
            </span>
            </div>

          </div>
          <!--用户基本信息结束-->
          <div class="deleteListCon" v-if="item.confirmStatus != '0'">
            <div class="publicTitle"><i class="lineBlue"></i>实名认证信息</div>
            <div class="publicList">
              <label>联系人姓名：</label>
              <span>{{item.name}}</span>
            </div>
<!--            <div class="publicList">
              <label>性别：</label>
              <span>{{item.sex == "1" ? "男" : "女"}}</span>
            </div>-->
            <div class="publicList">
              <label>手机号：</label>
              <span>{{item.mobile}}</span>
            </div>
            <div class="publicList">
              <label>电子邮箱：</label>
              <span>{{item.mailbox}}</span>
            </div>
            <div class="publicList">
              <label>身份证号码：</label>
              <span>{{item.idCard}}</span>
            </div>
            <div class="publicList clearfix">
              <label class="fl">身份证图片：</label>
              <span class="logoWarp fl clearfix">
            					<div class="upload-ID ID-details fl readonly-detail">
            						<h1>正面</h1>
	            					<span class="">
	            						<img :src="item.idCardJust">
	            					</span>
            					</div>
            					<div class="upload-ID ID-details fl">
            						<h1>反面</h1>
	            					<span class="">
	            						<img :src="item.idCardBack">
	            					</span>
	            				</div>
            				</span>
            </div>
          </div>
          <!--企业信息-->
          <!----------------------------------审核状态    start----------------------------------------------------->
          <div class="deleteListCon" v-if="item.confirmStatus != '0'">
            <div class="publicTitle"><i class="lineBlue"></i>企业信息</div>
            <div class="publicList">
              <label>机构类型：</label>
              <span v-if="item.mechanismType == '1'">政府</span>
              <span v-if="item.mechanismType == '2'">事业单位</span>
              <span v-if="item.mechanismType == '3'">事业单位媒体</span>
              <span v-if="item.mechanismType == '4'">社会团体</span>
              <span v-if="item.mechanismType == '5'">企业法人</span>
              <span v-if="item.mechanismType == '6'">企业媒体</span>
            </div>
            <div class="publicList">
                <label>单位名称：</label>
                <span>{{item.companyName}}</span>
            </div>
            <div class="publicList">
                <label>单位地址：</label>
                <span>{{item.companyUrl}}</span>
            </div>
            <div class="publicList" v-if="item.mechanismType == '1' || item.mechanismType == '4'">
                <label>组织机构代码证：</label>
                <span class="licenseBox">
                  <img :src="item.organization">
                </span>
            </div>
            <div class="publicList clearfix" v-if="item.mechanismType == '3' || item.mechanismType == '6'">
                <label class="fl">媒体类型：</label>
                <span v-if="item.mediaType == '1'">电视广播</span>
                <span v-if="item.mediaType == '2'">报刊</span>
                <span v-if="item.mediaType == '3'">杂志</span>
                <span v-if="item.mediaType == '4'">网络媒体</span>
            </div>
              <div class="publicList" v-if="item.mechanismType == '2'|| item.mechanismType == '3'">
                <label>事业单位法人证书：</label>
                <span class="licenseBox">
				            		<img :src="item.legalLicense">
                </span>
              </div>
              <div class="publicList" v-if="item.mechanismType == '3'">
                <label>媒体许可证：</label>
                <span class="licenseBox">
				          <img :src="item.mediaLicense">
				         </span>
              </div>
              <!--社会团体 start-->
              <div class="publicList" v-if="item.mechanismType == '4'">
                <label>社会团体登记证书：</label>
                <span class="licenseBox">
				            	<img :src="item.sociologyGroup">
				         </span>
              </div>
              <div class="publicList" v-if="item.mechanismType == '5' || item.mechanismType == '6'">
                <label>工商营业执照：</label>
                <span class="licenseBox">
				            					<img :src="item.businessLicense">
                </span>
              </div>
              <div class="publicList" v-if="item.mechanismType == '6'">
                <label>媒体许可证：</label>
                <span class="licenseBox">
				            					<img :src="item.mediaLicense">
				         </span>
              </div>
              <div class="publicList">
                <label>申请函：</label>
                <span class="licenseBox" v-if="item.publicLetter">
				            	<img :src="item.publicLetter">
				        </span>
                <span class="licenseBox" v-else>
                  未上传公函
				         </span>
              </div>
          </div>
          <!----------------------------------审核状态  通过的  end----------------------------------------------------->

        </div>
        <!--内容信息 end-->

        <!--按钮 start-->
        <div class="btnBgBox" v-if="item.confirmStatus == '1'">
          <button class="btn-defalut btn-blue" @click="confirm()">审核通过</button>
          <button class="btn-defalut btn-white" @click="confirmReject()">驳回</button>
          <button class="btn-defalut btn-red" style="display: none;">撤销申请</button>
        </div>
        <!--按钮 end-->
      </div>
    </div>

    <!--对话框-->
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:ifSuccess = "ifSuccess"
             v-bind:loading = "loading">
    </MaskTip>
    <!--对话框-->
    <!--驳回对话框开始 start-->
    <rejectMask v-bind:rejectMaskShow= "rejectMaskShow" @listenToChildEvent = "getMessage" v-bind:openID="openID"></rejectMask>
    <!--驳回对话框结束 end -->
  </div>
</template>
<script>
  import axios from 'axios'
  import MaskTip from '@/views/module/mask'
  import rejectMask from '@/views/userInfo/rejectMask'
  export default {
    data () {
      return {
        tipsContent: '',
        ifSuccess: true,
        tips: false,
        loading: false,
        sexRadio: '2',//"1" 代表 男  "2" 代表 女
        openID: '',//获取用户信息的唯一标识
        userInforList: [],//用户信息
        rejectMaskShow:false
      }
    },
    mounted: function () {
      this.openID = this.$route.query.openID
      this.getUserInfor()//页面初始化获取用户信息
    },
    components: {
      MaskTip,
      rejectMask
    },
    methods: {
      getMessage(){
        this.rejectMaskShow = false;
      },
      getUserInfor () {
        axios({
          headers: {'Content-Type': 'application/json'},
          method: 'post',
          url: '/userInformation/getUserByOpenID',
          async: true,
          data: {
            openID: this.openID,
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == '200') {
            if (res.data.results.dataList.length == 0) return
            this.userInforList = res.data.results.dataList//页面初始化渲染页面信息
            //企业信息（机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体）
          }
        }).catch(err => {
          console.log(err)
        })
      },
      confirm(){
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/checkAdopt",
          async: true,
          data: {
            openID: this.openID,
            confirmStatus: "3"
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if(res.data.code == "200"){
            this.tips = true;
            this.tipsContent = "认证通过";
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              //this.getUserInfor();
              this.$router.push({
                path:'/home/userInfo',
                name:"userInfo",
              })//成功后跳转到首页面
            }, 3000);
          }else{
            this.tips = true;
            this.tipsContent = "认证失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
              this.getUserInfor();
            }, 3000);
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      confirmReject(){
        this.rejectMaskShow = true;
      }

    },
    watch: {}
  }
</script>
<style>
  .sexBox {
    position: relative;
  }
  .publicList input[type="radio"] {
    position: absolute;
    left: -5px;
    top: 2px;
    opacity: 0;
    width: 16px;
    height: 16px;
  }
  .publicList input[type="radio"]:checked + i.icon-sex {
    background: url(../../assets/img/icon2.png) no-repeat;
    background-position: 0 -120px;
  }
  .upload-ID.ID-details{
  	width: 50%;
  }
  .upload-ID.ID-details img {
    max-height: 150px;
    max-width: 200px;
  }
</style>
