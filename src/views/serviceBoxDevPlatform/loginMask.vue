<template>
  <div>
    <div class="mask" v-if="tipSecond"></div>
    <!--登录框-->
    <div v-if="tipSecond">
      <div class="loginBox openPlatformLogin" v-if="isLogin">
        <a href="javascript:;" class="loginClose" @click="loginClose">&times;</a>
        <h1 class="loginTitle">账号登录</h1>
        <div class="tab-pane">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <div class="allErrorTips" v-if="errorTip"><i class="icon-errorTopPic"></i>{{errorTip}}</div>
            <div class="login-input-box">
              <i class="icon-userName"></i>
              <!-- -->
              <el-form-item prop="userName">
                <el-input type="text"
                          prop="userName"
                          class="login_input1 form-control"
                          v-model="loginForm.userName"
                          :placeholder="rules.userName[0].message"
                          auto-complete="off"
                          @blur="handleUserBlur()"
                ></el-input>
              </el-form-item>

            </div>
            <div class="login-input-box">
              <i class="icon-pwd"></i>
              <!--<el-form-item  prop="password"></el-form-item>-->
              <el-form-item prop="password">
                <el-input type="password"
                          class="login_input1 form-control"
                          v-model="loginForm.password"
                          :placeholder="rules.password[0].message"
                          auto-complete="off"
                          ref="pass"
                          @blur="handlePwdFocus()"
                >
                </el-input>
              </el-form-item>

            </div>
            <div class="forgetPwd fr"><a href="javascript:;" @click="forgetPwd()">忘记密码？</a></div>
          </el-form>
          <div class="dlk">
            <input id="loginHref" type="button" value="登录" @keyup.enter.native="submitForm('loginForm')"
                   @click="submitForm('loginForm')" @click.stop>
          </div>
          <div class="noAccount-reg">还没有服务盒子账号，<a href="javascript:;" @click="register()">立即注册<i
            class="icon-reg"></i></a></div>
        </div>
      </div>


      <!---实名认证 弹框-->
      <div class="dialog-container" v-if="!isLogin && this.tips == false">
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








      <!--提交申请失败-->
      <div class="dialog-publicOutLayer" v-if="tips">
        <div class="dialog-tit">提示</div>
        <div class="dialog-con">
          <div><img :src="tipsImg"></div>
          <div class="submitSuccess">提交申请失败</div>
          <div class="orderCode">失败原因：对不起，该申请暂只支持通过实名认证的企业申请</div>
        </div>
        <div class="dialog-btnBox">
          <a href="javascript:;" class="blue" @click="close()">重新申请</a>
          <a href="javascript:;" class="backHome" @click="goBack()">返回首页</a>
        </div>
      </div>







    </div>



  <!--  <MaskTip v-bind:tips="tips"
             v-bind:tipsContent="tipsContent"
             v-bind:errorTipsContent="errorTipsContent"
             v-bind:tipsImg="tipsImg"
             v-bind:loading="loading"
             v-bind:toRouter="toRouter"
             @listenToChildEvent="closeDialog">
    </MaskTip>-->
  </div>
</template>
<script>
  import axios from 'axios';
  import {getmd5} from '@/config/util';
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default {
    name: 'container',
    props: ["tipSecond"],
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          // callback(new Error('请输入用户名/手机号'));
          return this.errorTip = "请输入用户名/手机号";
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        let newReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,16}$/;
        let re = /[`~!@#$%^&*_+<>{}\/'[\]]/im;//匹配特殊字符
        if (!this.loginForm.userName) {
          return this.errorTip = "请输入用户名/手机号";
        } else {
          this.errorTip = "";
        }
        if (!value) {
          //callback(new Error('姓名长度必须为2-10个字符'));
          return this.errorTip = "请输入密码";
        } else {
          //callback();
          if (!newReg.exec(value)) {
            this.errorTip = "6-16位，数字/字母/字符至少包含2种";
            return;
          } else if (re.test(this.$refs.pass.value)) {
            this.errorTip = "密码格式不正确！";
            return;
          } else {
            this.errorTip = "";
            callback();
          }
        }
      };
      return {
        focusUserName: false,  //定义变量:输入框获取焦点
        focusUserCon: "用户名不能为空，请重新输入！",
        passwordRules: "密码不能为空，请重新输入！",
        focusPassword: false,
        focusClass: false,
        loginForm: {
          userName: '',
          password: '',
          openID: ""
        },
        noticeTag: true,
        remember: false,
        rules: {
          userName: [
            /*{ required: true, message: '请输入用户名/手机号', trigger: 'blur' },*/
            {validator: validateName, trigger: 'blur', required: true, message: '请输入用户名/手机号'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur', required: true, message: '请输入密码'}
          ]
        },
        showLogin: false,
        isOpencode: false,
        errorTip: "",//错误提示语
        remember: false,
        isLogin: true, //用户是否实名认证，如果已经认证了 此变量代表是否登录  如果未认证，次变量代表是否实名认证弹框
        realPageNum:"",
        tips:false,
        tipsImg : require("../../assets/img/serviceApply/picFailure.png"),
        loading: false,
        toRouter: "serviceDetail"
      }
    },
    mounted() {
      if (this.getUserInfo && this.getCookie()) {
        var userInfo = JSON.parse(this.getUserInfo)
        this.sendUserInfo(this.getUserInfo);//缓存本地信息
        this.remember = true;
        this.loginForm.userName = userInfo.userName;
      }
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters(['getUserInfo'])
    },
    components: {
    },
    created() {
    },
    methods: {
      ...mapActions(['sendUserInfo', 'sendRoutePath', 'sendFunctionInfo', 'sendLoginState']),
      forgetPwd() {
        this.$emit("listenToChildEvent", false);
        this.$router.push({
          path: '/forgetPwd',
          name: "forgetPwd",
        })//跳转到注册页面
      },
      register() {
        this.$emit("listenToChildEvent", false);
        this.$router.push({
          path: '/register',
          name: "register",
        })//跳转到注册页面
      },
      loginClose() {
        this.$emit("listenToChildEvent", false);
      },
      submitForm(formName) {//提交表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sub();
          } else {
            return false;
          }
        });
      },
      sub() {
        if (this.loginForm.userName.indexOf(" ") != -1) {
          this.loginForm.userName = this.loginForm.userName.replace(/\s/g, "");
        }
        if (this.loginForm.password.indexOf(" ") != -1) {
          this.loginForm.password = this.loginForm.password.replace(/\s/g, "");
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/login",
          async: true,
          data: {
            userName: this.loginForm.userName.trim(),
            password: getmd5(this.loginForm.password.trim())
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            this.loginForm.openID = res.data.openID;
            this.loginForm.userName = res.data.userName;
            /*将用户名本地缓存*/
            this.sendUserInfo(JSON.stringify(this.loginForm));
            if (this.remember == true) {
              //传入账号名，密码
              this.setCookie(this.loginForm.userName, "", 7);
            } else {
              this.setCookie("", "", "");
            }
            this.sendLoginState("1");//登录后改变登录状态 isLogin = 1 ；
            if (res.data.confirmStatus == '3') {
              /*this.$router.push({
                path: '/home/personalCenter'
              });*/
              this.$emit("listenToChildEvent", false);
              if (this.$route.path.indexOf("devPlatform") > 0) {
                this.$router.push({
                  name: "serviceBoxApplication"
                })
              } else {
                let serviceDetailID = sessionStorage.getItem("serviceDetailID");
                this.$router.replace({
                  path: '/transitionPage',
                  name: "transitionPage",
                  query: {id: serviceDetailID}
                })
              }
            } else if (res.data.confirmStatus == '0') {
              this.isLogin = false;//用户是否实名认证，如果已经认证了 此变量代表是否登录  如果未认证，次变量代表是否实名认证弹框
              this.realPageNum = res.data.confirmStatus
            } else {
              this.isLogin = false;
              this.tips = true;
              this.tipsImg = require("../../assets/img/serviceApply/picFailure.png");
            }
          } else if (res.data.code == "201") {
            this.errorTip = "用户名或密码错误";
          } else if (res.data.code == "203") {
            this.errorTip = "账号被停用";
          } else if (res.data.code == "404") {
            this.errorTip = "该用户不存在";
          } else if (res.data.code == "500") {
            this.errorTip = "用户名或密码为空";
          } else if (res.data.code == "203") {
            this.errorTip = "该账号已停用";
          } else {
            this.errorTip = "";
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //设置cookie
      setCookie(cname, cpwd, exdays) {
        var exdate = new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + cname + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "password" + "=" + cpwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.loginForm.userName = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'password') {
              this.loginForm.password = arr2[1];
            }
          }
        }
        return this.loginForm.userName;
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", "", "-1");//修改2值都为空，天数为负1天就好了
      },
      handleUserBlur: function () {
        //this.userName = "用户名";
        if (!this.loginForm.userName) {
          this.errorTip = "请输入用户名/手机号";
        } else {
          this.errorTip = "";
        }
      },
      handlePwdFocus: function (isFocus) {
        if (!this.loginForm.password) {
          this.errorTip = "请输入密码";
        } else {
          this.errorTip = "";
        }
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
        this.$emit("listenToChildEvent", false);
        this.bus.$emit("headInforShow", this.loginForm.userName);
        this.bus.$emit("userOpenID",this.loginForm.openID);
        this.isLogin = true;
        this.$router.replace({
          path: '/transitionPage',
          name: "transitionPage",
          query: {id: sessionStorage.getItem("serviceDetailID")}
        })
        this.tips = false;
      },
      closeDialog(flag) {
        this.tips = flag;
        this.tipSecond = flag;
      },
      goBack(){
        this.$emit("listenToChildEvent",false);
        this.tips = false;
        this.$router.push({
          name:"dataService"
        });
      }
    },
    watch: {}
  }
</script>
<style>
  @import "../../assets/css/dialog.css";
  @import "../../assets/css/login.css";

  .el-input__inner {
    width: 320px !important;
    line-height: 14px !important;
    font-size: 14px !important;
    color: #000;
    background: #f7f6f9 !important;
    border: 1px solid #f7f6f9 !important;
    border-radius: 2px !important;
    padding-left: 30px !important;
    height: 45px !important;
  }

  .code_input1 .el-input__inner {
    width: 210px !important;
  }
</style>
