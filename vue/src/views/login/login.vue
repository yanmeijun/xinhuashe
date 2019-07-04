<template>
  <div class="loginBg" id="login">
    <!--<div class="loginLogo">
      &lt;!&ndash;头部信息修改 start&ndash;&gt;
      <div class="newLogin">
        <img src="../../assets/img/loginLogo.png" class="fl">
        <div class="header-menu fl" style="position: relative;">
         &lt;!&ndash; <a href="" class="selected" >首页</a>&ndash;&gt;
         &lt;!&ndash; <a href="" @mouseenter="enter(index)" @mouseleave="leave()">数据服务</a>&ndash;&gt;
          <a href=""
             class=""
             v-for="(item ,index) in headMenu" :key="index"
             :id='"menu"+index'
             @mouseenter="enter(index)"
             @mouseleave="leave()">{{item.title}}</a>
          &lt;!&ndash;<a href="">服务支持</a>&ndash;&gt;
          <span class="transtionX" ref="transtionX"></span>
        </div>
      </div>
      &lt;!&ndash;头部信息修改 end&ndash;&gt;
    </div>-->
    <serviceHead></serviceHead>
    <!--主体部分-->
    <div class="loginCon clearfix">
      <div class="loginPic fl">
        <img src="../../assets/img/loginPic.png">
      </div>
      <div class="loginBox fr">
        <h1 class="loginTitle">密码登录</h1>
        <div class="tab-pane">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <div class="allErrorTips" v-if="error">
              <i class="icon-errorTopPic"></i>
              {{errorTip}}
            </div>
            <div class="login-input-box">
              <i class="icon-userName"></i>
              <el-input
                class="login_input1 form-control new-form-control"
                name="userName"
                :placeholder="rules.userName[0].message"
                :class="{'active':focusUserName}"
                type="text"
                v-model="loginForm.userName"
                @blur="handleUserBlur()"
              ></el-input>
            </div>
            <div class="login-input-box">
              <i class="icon-pwd"></i>
              <el-input
                class="login_input1 form-control"
                :placeholder="rules.password[0].message"
                :class="{'active':focusPassword}"
                type="password"
                ref="pass"
                v-model="loginForm.password"
                @blur="handlePwdFocus()"
              ></el-input>
            </div>
            <div class="login-code" id="verificationCode">
              <verification />

              <div class="clearfix" style="display:none">
                <div class="v-code-input fl">
                  <i class="icon-v-code"></i>
                  <el-input
                    class="login_input1 form-control code_input1"
                    :class="{'active':focusCode}"
                    :placeholder="rules.identifyCode[0].message"
                    type="text"
                    @blur="handleCodeFocus(false)"
                    v-model="loginForm.identifyCode"
                  ></el-input>
                  <span class="icon-user-delete"></span>
                </div>
                <div class="v-code-box fr">
                  <canvas
                    class="J_codeimg"
                    id="myCanvas"
                    @click="createCode"
                  >对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
                </div>
              </div>
            </div>
            <!--<div class="forgetPwd"><a href="javascript:void(0);"></a></div>-->
          </el-form>
          <div class="dlk">
            <div>
              <div class="noAccount-reg fl">
                还没有账号，
                <a href="javascript:void(0);" @click="register()">
                  立即注册
                  <i class="icon-reg"></i>
                </a>
              </div>
              <div class="forgetPwd fr">
                <a href="javascript:void(0);" @click="forgetPwd()">忘记密码？</a>
              </div>
            </div>
            <input
              id="loginHref"
              type="button"
              value="登录"
              @keyup.enter.native="submitForm('loginForm')"
              @click="submitForm('loginForm')"
              @click.stop
            >
          </div>
        </div>
      </div>
    </div>
    <div class="loginFooter">
      © CopyRight 2019 开普云 kaipuyun.cn All Rights Reserved
      <br>
      <span>版权所有 京TCP备14035494号-1</span>
      <!--Email：yunying@ucap.com.cn-->
    </div>
  </div>
</template>
<style scoped="">
</style>
<script>
import axios from "axios";
import { mapActions, mapState, mapGetters } from "vuex";
import { getmd5 } from "@/config/util";
import serviceHead from "@/views/serviceCommonPage/loginHead";
import verification from "../base/v-verification";

var code;
export default {
  name: "login",
  data() {
    return {
      focusUserName: false, //定义变量:输入框获取焦点
      focusPassword: false,
      focusCode: "", //验证码
      placeCode: "验证码不能为空",
      passwordRules: "密码不能为空，请重新输入！",
      focusClass: false,
      focusUserCon: "用户名不能为空，请重新输入！",
      loginForm: {
        userName: "",
        password: "",
        identifyCode: "",
        openID: ""
      },
      noticeTag: true,
      remember: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名/手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        identifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      showLogin: false,
      codeTitle: "获取验证码",
      isOpencode: false,
      error: "", //错误提示语
      errorTip: "" //错误提示语
    };
  },
  components: {
    serviceHead,
    verification
  },
  mounted() {
    if (this.$route.params.name) {
      this.sendLoginState("0"); //登录后改变登录状态 isLogin = 0 ；
      this.$message({
        type: "error",
        duration: 4000,
        message: "登陆时效已过期，请重新登陆！"
      });
      let domainUserInfo = {};
      if (this.getUserInfo && this.getCookie()) {
        domainUserInfo = JSON.parse(this.getUserInfo);
      }
      this.remember = true;
      this.loginForm.userName = domainUserInfo.userName;
      //this.loginForm.password = domainUserInfo.password;
    }

    this.showLogin = true;
    if (this.getUserInfo && this.getCookie()) {
      var userInfo = JSON.parse(this.getUserInfo);
      this.sendUserInfo(this.getUserInfo); //缓存本地信息
      this.remember = true;
      this.loginForm.userName = userInfo.userName;
    }
  },
  updated: function() {},
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    ...mapActions([
      "sendUserInfo",
      "sendRoutePath",
      "sendFunctionInfo",
      "sendLoginState"
    ]),
    submitForm(formName) {
      this.validateNumbers();
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.loginForm.userName.indexOf(" ") != -1) {
            this.loginForm.userName = this.loginForm.userName.replace(
              /\s/g,
              ""
            );
          }
          if (this.loginForm.password.indexOf(" ") != -1) {
            this.loginForm.password = this.loginForm.password.replace(
              /\s/g,
              ""
            );
          }
          let inputCode = '';//String(this.loginForm.identifyCode).toUpperCase();
          let codeToUp = '';//String(code).toUpperCase(); //把字符串装换为大小写
          let re = /[`~!@#$%^&*_+<>{}\/'[\]]/im; //匹配特殊字符
          var rep = /^[A-Za-z0-9]*([A-Za-z]+\d+)|(\d+[A-Za-z]+)[A-Za-z0-9]{6,20}$/;
          //6-20位字母数字组合 用户名
          if (!this.loginForm.userName) {
            this.error = true;
            this.errorTip = "请输入用户名/手机号";
            return;
          } else {
            this.error = false;
            if (this.loginForm.password.indexOf(" ") != -1) {
              this.loginForm.userName = this.loginForm.userName.replace(
                /\s/g,
                ""
              );
            }
          }
          if (!this.loginForm.password) {
            this.errorTip = "请输入密码";
            this.error = true;
            return;
          }
          /*if (!inputCode) {
            this.errorTip = "请输入验证码";
            this.error = true;
            return;
          }
          if (inputCode.trim() != codeToUp) {
            this.errorTip = "验证码不正确";
            this.error = true;
            this.createCode();
            return;
          }*/
          let dom = document.getElementById('verificationCode')
          if (!dom || dom.getAttribute('data-verification') !== '1') {
            this.errorTip = "请拖动滑块验证";
            this.error = true;
            this.createCode();
            return;
          }
          axios({
            headers: { "Content-Type": "application/json" },
            method: "post",
            url: "/userInformation/login",
            async: true,
            data: {
              userName: this.loginForm.userName.trim(),
              password: getmd5(this.loginForm.password.trim())
            },
            contentType: "application/json"
          })
            .then(res => {
              if (res.data.code == "200") {
                this.loginForm.openID = res.data.openID;
                this.loginForm.userName = res.data.userName;
                console.log(this.loginForm)
                this.sendUserInfo(JSON.stringify(this.loginForm));
                if (this.remember == true) {
                  //传入账号名，密码
                  this.setCookie(this.loginForm.userName, "", 7);
                } else {
                  /*将用户名本地缓存清空*/
                  this.setCookie("", "", "");
                }
                this.sendLoginState("1"); //登录后改变登录状态 isLogin = 1 ；
                if (res.data.confirmStatus == "3") {
                  this.$router.push({
                    path: "/home/personalCenter"
                  });
                } else if (res.data.confirmStatus == "0") {
                  this.$router.push({
                    path: "/home/personalRealName/realNameMainCon"
                  });
                } else {
                  this.$router.push({
                    path: "/home/personalRealName/realNameDetails"
                  });
                }
              } else if (res.data.code == "201") {
                this.errorTip = "用户名或密码错误";
                this.error = true;
              } else if (res.data.code == "203") {
                this.errorTip = "账号被停用";
                this.error = true;
              } else if (res.data.code == "404") {
                this.errorTip = "该用户不存在";
                this.error = true;
              } else if (res.data.code == "500") {
                this.errorTip = "用户名或密码为空";
                this.error = true;
              } else if (res.data.code == "203") {
                this.errorTip = "该账号已停用";
                this.error = true;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
        }
      });
    },
    register() {
      this.$router.push({
        path: "/register",
        name: "register"
      }); //跳转到注册页面
    },
    forgetPwd() {
      this.$router.push({
        path: "/forgetPwd",
        name: "forgetPwd"
      }); //跳转到注册页面
    },
    //设置cookie
    setCookie(cname, cpwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + cname + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + cpwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.loginForm.userName = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.loginForm.password = arr2[1];
          }
        }
      }
      return this.loginForm.userName;
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", "-1"); //修改2值都为空，天数为负1天就好了
    },
    handleUserFocus: function(isFocus) {},
    handleUserBlur: function() {
      //this.userName = "用户名";
      this.error = false;
      if (!this.loginForm.userName) {
        this.errorTip = "请输入用户名/手机号";
        this.error = true;
      }
    },
    handlePwdFocus: function(isFocus) {
      this.error = false;
      if (!this.loginForm.password) {
        this.errorTip = "请输入密码";
        this.error = true;
      }
    },
    handleCodeFocus: function(isFocus) {
      // this.focusCode = false;
      this.error = false;
      /*let inputCode = '';//this.loginForm.identifyCode.toUpperCase();
      let codeToUp = '';//code.toUpperCase(); //把字符串装换为大小写
      if (inputCode.trim() != codeToUp) {
        this.errorTip = "验证码不正确";
        this.error = true;
      }
      if (!inputCode) {
        this.errorTip = "请输入验证码";
        this.error = true;
      }*/
    },
    /**生成验证码*/
    createCode() {
      code = "";
      let codeLength = 4;
      let selectChar = new Array(
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 60);
        code += selectChar[charIndex];
      }
      if (code.trim().length != codeLength) {
        this.createCode();
      }
      this.showCheck(code);
    },
    showCheck(a) {
      let c = document.getElementById("myCanvas");
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.font = "80px 'Microsoft Yahei'";
      ctx.fillText(a, 50, 100);
      ctx.fillStyle = "black";
    },
    validateNumbers() {
      this.error = false;
      let inputCode = 'sb';//this.loginForm.identifyCode.toUpperCase();
      let codeToUp = 'sb';//code.toUpperCase(); //把字符串装换为大小写
      let re = /[`~!@#$%^&*_+<>{}\/'[\]]/im; //匹配特殊字符
      var rep = /^[A-Za-z0-9]*([A-Za-z]+\d+)|(\d+[A-Za-z]+)[A-Za-z0-9]{6,20}$/;
      /*if (!inputCode) {
        this.errorTip = "请输入验证码";
        this.error = true;
        return;
      }
      if (inputCode.trim() != codeToUp) {
        this.errorTip = "验证码不正确";
        this.error = true;
        return;
      }*/

      //6-20位字母数字组合 用户名
      if (!this.loginForm.userName) {
        this.error = true;
        this.errorTip = "请输入用户名/手机号";
        return;
      } else {
        this.error = false;
        //          if(!rep.exec(this.loginForm.userName) || this.loginForm.userName > 20 || this.loginForm.userName < 6){
        //            this.errorTip = "用户名6-20位字母数字组合";
        //            this.error = true;
        //            return;
        //          }
        if (this.loginForm.password.indexOf(" ") != -1) {
          this.loginForm.userName = this.loginForm.userName.replace(/\s/g, "");
        }
      }
      /**
       * 字母和数字组合验证
       */
      var newReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,16}$/;
      if (this.loginForm.password) {
        if (this.$refs.pass.value.indexOf(" ") != -1) {
          this.$refs.pass.value = this.$refs.pass.value.replace(/\s/g, "");
        }
        if (!newReg.exec(this.$refs.pass.value)) {
          this.errorTip = "6-16位，数字/字母/字符至少包含2种";
          this.error = true;
          return;
        } else if (re.test(this.$refs.pass.value)) {
          this.errorTip = "密码格式不正确！";
          this.error = true;
          return;
        } else {
          this.error = false;
        }
      } else {
        this.error = true;
        this.errorTip = "请输入密码";
        return;
      }
      if (inputCode.length <= 0) {
        this.errorTip = "验证码不能为空";
        this.error = true;
        this.createCode();
        return;
      } else if (inputCode.trim() != codeToUp) {
        this.errorTip = "验证码错误";
        this.error = true;
        this.createCode();
        return;
      } else {
        if (this.loginForm.userName) {
          this.error = false;
        } else if (this.loginForm.password) {
          this.error = false;
        } else {
          this.error = true;
          return;
        }
        return;
      }
      return;
    },
    enter(_this) {
      let targetEle = document.getElementById("menu" + _this);
      if (targetEle.innerText.length == 2) {
        this.$refs.transtionX.style.left = "44px";
      } else {
        this.$refs.transtionX.style.left = targetEle.offsetLeft + 56 + "px";
      }
      for (let i = 0; i < 4; i++) {
        if (
          document.getElementById("menu" + i).classList.contains("selected")
        ) {
          document.getElementById("menu" + i).classList.remove("selected");
        }
      }
      targetEle.classList.add("selected");
    },
    leave() {}
  },
  watch: {
    sendUserInfo: function(newValue) {
      this.remember = true;
      //this.loginForm.userName = this.getUserInfo.userName;
      //this.loginForm.password = this.getUserInfo.password;
    },
    error: {
      handler() {}
    }
  }
};
</script>
<style>
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
