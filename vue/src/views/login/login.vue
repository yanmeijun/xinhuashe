<template>
  <div class="loginBg" id="login">
    <div v-show="showLogin">
      <div class="login-header">
            <span class="header-logo">
              <i class="logo"></i>
              <em></em>
              <b>数据异构聚合平台</b>
            </span>
        <span class="hotTel">服务热线：4000-976-005</span>
      </div>
      <div class="loginBox">
        <h1 class="loginTitle">账号登录</h1>
        <div class="tab-pane fade active in">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <div class="login-input-box">
              <i class="icon-userName"></i>
              <el-input class="login_input1 form-control "
                        name="userName"
                        :placeholder="userName"
                        :class="{'active':focusUserName}"
                        type="text"
                        v-model="loginForm.userName"
                        @focus="handleUserFocus(false)"
                        @blur="handleUserBlur()"
              ></el-input>
              <span class="error-msg" v-if="focusUserName">{{focusUserCon}}</span>
            </div>
            <div class="login-input-box">
              <i class="icon-pwd"></i>
              <el-input class="login_input1 form-control"
                        :placeholder="password"
                        :class="{'active':focusPassword}"
                        type="password"
                        ref="pass"
                        v-model="loginForm.password"
                        @focus="handlePwdFocus(true)"
                        @blur="handlePwdFocus(false)"
              ></el-input>
              <span class="error-msg" v-if="focusPassword">{{passwordRules}}</span>
            </div>
            <div class="login-code">
              <div class="clearfix">
                <div class="v-code-input fl">
                  <i class="icon-v-code"></i>
                  <el-input class="login_input1 form-control"
                            :class="{'active':focusCode}"
                            :placeholder="identifyCode"
                            type="text"
                            @focus="handleCodeFocus(true)"
                            @blur="handleCodeFocus(false)"
                            v-model="loginForm.identifyCode">
                  </el-input>
                  <span class="icon-user-delete"></span>
                </div>
                <div class="v-code-box fr">
                  <!--<a title="点击更换验证码">-->
                  <!--<img src="img/v-code.png" alt="验证码"/>-->
                  <!--</a>-->
                  <canvas class="J_codeimg"
                          id="myCanvas"
                          style="width: 115px;height: 38px;cursor: pointer"
                          @click="createCode">对不起，您的浏览器不支持canvas，请下载最新版浏览器!
                  </canvas>
                </div>
              </div>
              <span class="error-msg" v-if="focusCode">{{placeCode}}</span>
            </div>
            <div class="login-status">
                  <span class="dlzt">
                  <!--	<label for="login-check"></label>-->
                    <!--<el-input value="" id="login-check" style="display: none;" type="checkbox"></el-input>-->
                    <el-checkbox v-model="remember"></el-checkbox>
                    <span class="tips-word">记住密码</span>
                  </span>
            </div>
          </el-form>
          <div class="dlk">
            <input id="loginHref" type="button" value="登录" @keyup.enter.native="submitForm('loginForm')"
                   @click="submitForm('loginForm')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped="">
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import {getmd5} from '@/config/util';
  var code;
  export default{
    name: 'login',
    data(){
      return {
        focusUserName: false,  //定义变量:输入框获取焦点
        focusPassword: false,
        focusCode: "",//验证码
        placeCode: "验证码不能为空",
        passwordRules: "密码不能为空，请重新输入！",
        focusClass: false,
        focusUserCon: "用户名不能为空，请重新输入！",
        loginForm: {
          userName: '',
          password: '',
          identifyCode: '',
          domain: "",
          userID: ""
        },
        noticeTag: true,
        remember: false,
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          identifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        showLogin: false,
        codeTitle: '获取验证码',
        isOpencode: false,
        userName: "用户名",
        password: "密码",
        identifyCode: "验证码"

      }
    },
    mounted(){
      if (this.$route.params.name) {
        this.$message({
          type: 'error',
          duration: 4000,
          message: '登陆时效已过期，请重新登陆！'
        });
        let domainUserInfo;
        if (this.getUserInfo && this.getCookie()) {
          if (typeof this.getUserInfo == 'string') {
            domainUserInfo = JSON.parse(this.getUserInfo);
          } else {
            domainUserInfo = this.getUserInfo;
          }
        }
        ;
        this.remember = true;
        this.loginForm.userName = domainUserInfo.userName;
        this.loginForm.password = domainUserInfo.password;

      }
      this.createCode();//执行验证码
      this.showLogin = true;
      if (typeof this.getUserInfo == 'string') {
        if (this.getUserInfo && this.getCookie()) {
          var userInfo = this.getUserInfo
          userInfo = JSON.parse(this.getUserInfo)
          this.sendUserInfo(userInfo);//缓存本地信息
          this.remember = true;
          this.loginForm.userName = this.getUserInfo.userName;
          this.loginForm.password = this.getUserInfo.password;
          this.loginForm.permission = this.getUserInfo.permission;
        }
      }
    },
    updated: function () {
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters(['getUserInfo'])
    },
    methods: {
      ...mapActions(['sendUserInfo', 'sendRoutePath', 'sendFunctionInfo']),
      submitForm(formName) {
        this.validateNumbers();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.focusCode == false && this.focusPassword == false && this.focusUserName == false) {
              //this.sendRoutePath('/');
              if (this.remember == true) {
                //传入账号名，密码
                this.setCookie(this.loginForm.userName, "", 7);
                /*将用户名本地缓存*/
                this.sendUserInfo(this.loginForm);//
              } else {
                /*将用户名本地缓存清空*/
                this.sendUserInfo("");
                this.setCookie("", "", "");
                this.clearCookie("", "", "");
              }
              ;
              if (this.loginForm.userName.indexOf(" ") != -1) {
                this.loginForm.userName = this.loginForm.userName.replace(/\s/g, "");
              }
              ;
              if (this.loginForm.password.indexOf(" ") != -1) {
                this.loginForm.password = this.loginForm.password.replace(/\s/g, "");
              }
              ;
              axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/user/login",
                async: true,
                data: {
                  userName: this.loginForm.userName.trim(),
                  password: getmd5(this.loginForm.password.trim())
                },
                contentType: 'application/json'
              }).then(res=> {
                if (res.data.code == "200") {
                  sessionStorage.setItem('permission', JSON.stringify({permission: res.data.user.permission}))
                  this.loginForm.domain = res.data.user.domain;
                  this.loginForm.userID = res.data.user.userID;
                  this.loginForm.permission = res.data.user.permission;
                  /*将用户名本地缓存*/
                  this.sendUserInfo(this.loginForm);//
                  const permission = res.data.user.permission;
                  for (let i = 0; i < permission.length; i++) {
                    if (permission[i].children) {
                      sessionStorage.setItem('isSelect', permission[i].id);
                      this.$router.push({
                        path: permission[i].children[0].hrefName
                      });
                      break;
                    } else if (permission[i].href) {
                      sessionStorage.setItem('isSelect', permission[i].id);
                      this.$router.push({
                        path: permission[i].href
                      });
                      break;
                    }
                  }
                }else if(res.data.code == "201"){
                this.passwordRules = "密码错误";
                this.focusPassword = true;
              }else{
                this.focusUserName = true;
                this.focusUserCon = res.data.msg;
              }
              }).catch(err=> {
                console.log(err)
              })
            } else {

            }
            ;
          }
          ;
        });
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
      handleUserFocus: function (isFocus) {
        this.focusUserName = isFocus;
        this.userName = "";
      },
      handleUserBlur: function () {
        this.userName = "用户名";
      },
      handlePwdFocus: function (isFocus) {
        this.focusPassword = false;
        if (isFocus) {
          this.password = "";
        } else {
          this.password = "密码";
          if (this.loginForm.password) {
            this.focusPassword = false;
          } else {
            this.focusPassword = true;
          }
        }
      },
      handleCodeFocus: function (isFocus) {
        this.focusCode = false;
        if (isFocus) {
          this.identifyCode = "";
        } else {
          this.identifyCode = "验证码";
        }

      },
      /*
       *生成验证码
       */
      createCode(){
        code = "";
        let codeLength = 4;
        let selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        for (var i = 0; i < codeLength; i++) {
          var charIndex = Math.floor(Math.random() * 60);
          code += selectChar[charIndex];
        }
        if (code.trim().length != codeLength) {
          this.createCode();
        }
        this.showCheck(code);
      },
      showCheck(a){
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "80px 'Microsoft Yahei'";
        ctx.fillText(a, 50, 100);
        ctx.fillStyle = "black";
      },
      validateNumbers (){
        let inputCode = this.loginForm.identifyCode.toUpperCase();
        let codeToUp = code.toUpperCase();//把字符串装换为大小写
        let re = /[`~!@#$%^&*_+<>{}\/'[\]]/im;//匹配特殊字符
        if (this.loginForm.userName) {
          if (re.test(this.loginForm.userName)) {
            this.focusUserCon = "用户名格式不正确";
            this.focusUserName = true;
          } else if (this.loginForm.password.indexOf(" ") != -1) {
            this.loginForm.userName = this.loginForm.userName.replace(/\s/g, "");
          }
        } else {
          this.focusUserCon = "用户名不能为空";
          this.focusUserName = true;
        }
        /**
         * 字母和数字组合验证
         */
        var rep = /^[A-Za-z0-9]*([A-Za-z]+\d+)|(\d+[A-Za-z]+)[A-Za-z0-9]{6,16}$/;
        if (this.$refs.pass.value) {
//          if (this.$refs.pass.value.indexOf(" ") != -1) {
//            this.$refs.pass.value = this.$refs.pass.value.replace(/\s/g, "");
//          }
//          if (!rep.exec(this.$refs.pass.value) || this.$refs.pass.value.length > 16 || this.$refs.pass.value.length < 6) {
//            this.passwordRules = "密码由数字加字母组合,长度6-16位";
//            this.focusPassword = true;
//          } else if (re.test(this.$refs.pass.value)) {
//            this.passwordRules = "密码格式不正确！";
//            this.focusPassword = true;
//          } else {
//            this.focusPassword = false;
//          }
        } else {
          this.passwordRules = "密码不能为空，请重新输入！";
          this.focusPassword = true;
        }
        ;
        if (inputCode.length <= 0) {
          this.placeCode = "验证码不能为空";
          this.focusCode = true;
          this.createCode();
          return false;
        } else if (inputCode.trim() != codeToUp) {
          this.placeCode = "验证码错误";
          this.focusCode = true;
          this.createCode();
          return false;
        } else {
          if (this.loginForm.userName) {
            this.focusUserName = false;
          } else {
            this.focusUserName = true;
          }
          ;
          return;
        }
      }
    },
    watch: {
      sendUserInfo: function (newValue) {
        this.remember = true;
        //this.loginForm.userName = this.getUserInfo.userName;
        //this.loginForm.password = this.getUserInfo.password;
      }
    }
  }
</script>
