<template>
  <div class="content">
    <div class="serviceMainCon">
      <div class="welcomeTitle clearfix">
        <span class="welcomeName">欢迎，{{userName}}</span>
        <i class="icon-verPic icon-accVer"></i>
        <i class="icon-verPic icon-phoneVer"></i>
      </div>
      <!--内容信息 start-->
      <div class="clearfix">
        <div class="perwh50 fl">
          <div class="perWhiteBg">
            <div class="tit">个人信息</div>
            <div class="userInfoBox" v-for="(item,index) in realNameList" :key="index">
              <div class="perUserInfo">
                <label>账户密码：</label>
                <span>******</span>
                <div class="changePhonePrompt accountPwd fr">
                  <i>?</i>
                  <div class="phoneTip">
		            						<span class="arrow-right">
		            							<span class="arrow-right"></span>
		            						</span>
                    为保证您的账户安全，请妥善保管。
                  </div>
                </div>
                <a href="javascript:;" class="fr" @click="modifyPass()">修改</a>
              </div>
              <div class="perUserInfo">
                <label>手机绑定：</label>
                <span>{{item.mobile}}</span>
                <div class="changePhonePrompt fr">
                  <i>?</i>
                  <div class="phoneTip">
		            						<span class="arrow-right">
		            							<span class="arrow-right"></span>
		            						</span>
                    您填写的手机号码，可用于接收服务盒子发给您的各种通知，如服务申请成功等
                  </div>
                </div>
                <a href="javascript:;" class="fr" @click="modifyMob()">更换手机号</a>
              </div>
              <div class="perUserInfo">
                <label>OpenID：</label>
                <span>{{item.openID}}</span>
              </div>
              <div class="perUserInfo">
                <label>注册时间：</label>
                <span>{{item.registerTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="perwh50 fl">
          <div class="perWhiteBg" v-for="(item,index) in realNameList" :key="index">
            <div class="tit">实名认证</div>
            <!--已认证-->
            <div class="nameVerified userInfoBox" v-if="item.confirmStatus == '3'">
              <div class="icon-verified icon-verifiedOk"></div>
              <div class="pubNameVerStatus verifiedOkWord">已认证</div>
              <div class="publicVerWord">实名认证：认证个人和企业信息，让申请更加便捷</div>
            </div>
            <!--未认证-->
            <div class="nameVerified userInfoBox" v-if="item.confirmStatus == '0'">
              <div class="icon-verified icon-verifiedNot"></div>
              <div class="pubNameVerStatus verifiedNotWord">未认证</div>
              <div class="publicVerWord">
                实名认证：认证个人和企业信息，让申请更加便捷
                <router-link to="/home/personalRealName/realNameMainCon" class="goVerifed">去认证</router-link>
              </div>
              <!--<div class="goVerifed"><a href="javascript:;">去认证</a></div>-->
            </div>
            <!--已认证-->
            <div class="nameVerified userInfoBox" v-if="item.confirmStatus == '1'">
              <div class="icon-verified icon-verifiedCheck"></div>
              <div class="pubNameVerStatus verifiedCheckWord">审核中</div>
              <div class="publicVerWord">实名认证：认证个人和企业信息，让申请更加便捷</div>
            </div>
            <!--未通过-->
            <!--<div class="nameVerified userInfoBox" v-if="item.confirmStatus == '2'">
              <div class="icon-verified icon-verifiedCheck"></div>
              <div class="pubNameVerStatus verifiedCheckWord">未通过</div>
              <div class="publicVerWord">实名认证：认证个人和企业信息，让申请更加便捷</div>
            </div>-->
            <div class="nameVerified userInfoBox" v-if="item.confirmStatus == '2'">
              <div class="icon-verified icon-notPass"></div>
              <div class="pubNameVerStatus verifiedNotPass">未通过</div>
              <div class="publicVerWord">您的实名认证审核未通过，请认真核对信息并修改。
                <router-link to="/home/personalRealName/realNameDetails" class="btn-recertifyName">重新认证</router-link>
                <!--<a href="javascript:;" class="btn-recertifyName">重新认证 &gt;</a>-->
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="perWhiteBg">
        <div class="tit">我的申请<a href="javascript:;" @click="lookMore">查看更多&nbsp;&gt;</a></div>
        <div class="perCenList clearfix">
          <div class="perwh33" v-for="item in serviceListArr">
            <div class="appService clearfix">
              <div class="appServiceLogo fl">
                <img :src="item.logo">
              </div>
              <div class="appServiceCon fl">
                <div class="name">{{item.serviceName}}</div>
                <div class="time">申请时间：{{item.applyTime}}</div>
                <div class="code">申请编号：{{item.procureID}}</div>
              </div>
            </div>
          </div>

          <!--还没有申请记录 start-->
          <div class="noRecordList" v-if="serviceListCount==0 ">
            <div class="noRecordPicBox"><img src="../../assets/img/newPic/noRecord.png"/></div>
            <div class="noRecorWord">亲，没有申请记录哦～</div>
          </div>

        </div>
      </div>
      <!--内容信息 end-->
    </div>
    <!-- 修改密码对话框开始 start -->
    <ModifyPwd v-bind:modifyPassVisible="modifyPassVisible" @listenToChildEvent="getMessage"></ModifyPwd>
    <!-- 修改密码对话框结束 end -->

    <!-- 修改手机对话框开始 start -->
    <ModifyMobile v-bind:ModifyMobileVisible="ModifyMobileVisible" @listenToChildEvent="getMobile"></ModifyMobile>
    <!-- 修改手机对话框结束 end -->
  </div>
</template>
<script>
  import ModifyPwd from '@/views/personalCenter/modifyPwd';
  import ModifyMobile from '@/views/personalCenter/ModifyMobile';
  import axios from 'axios';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import {plusXing} from '@/config/util';

  export default {
    name: 'container',
    data() {
      return {
        userName: "",//用户
        realNameList: [],
        modifyPassVisible: false,
        ModifyMobileVisible: false,
        openID: "",
        serviceListArr: [],//列表数据
        rows: 6,//每页显示几条
        page: 1,//当前页数
        serviceName: '',
        status: '',
        serviceListCount: ""
      }
    },
    mounted() {
      this.openID = JSON.parse(this.getUserInfo).openID;
      this.userName = JSON.parse(this.getUserInfo).userName;
      this.existUser();
      this.getData();
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      ModifyPwd,
      ModifyMobile
    },
    created() {
    },
    methods: {
      ...mapActions(['sendUserInfo', 'sendRoutePath', 'sendFunctionInfo']),
      /*
      *判断用户是否进行了是否实名认证
      */
      existUser() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/realName",
          async: true,
          data: {userName: this.userName,},
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            this.realNameList.push(res.data.result);
            this.realNameList[0].mobile = plusXing(this.realNameList[0].mobile, 3, 4);
          }
        }).catch(err => {
          console.log(err)
        })
      },
      modifyPass() {//修改密码
        this.modifyPassVisible = true;
      },
      getMessage(data) {
        this.modifyPassVisible = data;
      },
      getMobile(data) {
        this.ModifyMobileVisible = data;
      },
      modifyMob() {
        this.ModifyMobileVisible = true;
      },
      realName() {
        this.$router.push({
          path: '/personalRealName/realName',
          name: "realName",
        })
      },
      getData() {
        let data = {
          openID: this.openID,
          serviceName: this.serviceName.trim(),
          pageSize: this.rows,
          pageNum: this.page,
          status: this.status
        }
        this.$http({
          method: 'post',
          url: '/procure/getApplyList',
          data: data
        }).then((res) => {
          let data = res.data;
          if (data.code == '200') {
            //this.serviceListArr = res.data.info.res.slice(0,6);
            this.serviceListArr = res.data.info.res;
            this.serviceListCount = res.data.info.count;
          } else {
            console.log("数据加载失败");

          }
        }).catch((err) => {
          alert("数据加载失败,网络异常")
        })
      },
      lookMore() {
        this.$router.push({
          path: '/home/serviceManage/myApplication',
          name: "myApplication",
        })
      }
    },
    watch: {
      ModifyMobileVisible: {
        handler(value) {
          if (!value) {
            this.realNameList = []
            this.existUser();
          }

        }
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/main.css";
</style>
