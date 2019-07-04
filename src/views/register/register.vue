<template>
  <div class="wrapBg">
    <!--<div class="header">
      <div class="headCon">
        <div class="logo fl">
          <span class="logoPic fl"><img src="../../assets/img/loginLogo.png"></span>
          <div class="header-menu fl">
            <a href="">首页</a>
            <a href="">数据服务</a>
            <a href="">开发平台</a>
            <a href="">服务支持</a>
          </div>
        </div>
        <div class="accountLogin fr">已有账号，<a href="javascript:;" @click=goLogin()>立即登录</a></div>
      </div>
    </div>-->
    <serviceHead></serviceHead>
    <div class="regCon">
      <!--注册成功 start -->
      <div class="regOk" style="" v-if="isShow">
        <div class="regTitle"><i class="icon-regSuccess"></i>恭喜您，注册成功！</div>
        <div class="jumpHome"><span>3</span>秒后自动跳转首页，或<a href="javascript:;" @click="goLogin()">点击跳转</a></div>
      </div>
      <!--注册成功 end -->
      <div class="formCon" :rules="rules" v-else>
        <h1 class="title"><span>欢迎注册</span></h1>
        <dl class="rm-advanced-search-dl clearfix">
          <dt class="rm-advanced-search-dt">用户名</dt>
          <dd class="rm-advanced-search-dd">
            <input class="rm-advanced-search-inp" type="text"
                   :placeholder="userNamePlace"
                   v-model="rules.userName[0].userName"
                   @focus="handleUserFocus(true)"
                   @blur="handleUserFocus(false)"
            >
            <div class="error-tips-box" v-if="rules.userName[0].userErrorTip">{{rules.userName[0].userErrorCon}}</div>
          </dd>
        </dl>
        <dl class="rm-advanced-search-dl clearfix">
          <dt class="rm-advanced-search-dt">设置密码</dt>
          <dd class="rm-advanced-search-dd">
            <input class="rm-advanced-search-inp" type="password"
                   :placeholder="passwordPlace"
                   v-model="rules.password[0].password"
                   @focus="handlePassFocus(true)"
                   @blur="handlePassFocus(false)"
            >
            <div class="error-tips-box" v-if="rules.password[0].passErrorTip">{{rules.password[0].passErrorCon}}</div>
          </dd>
        </dl>
        <dl class="rm-advanced-search-dl clearfix">
          <dt class="rm-advanced-search-dt">确认密码</dt>
          <dd class="rm-advanced-search-dd">
            <input class="rm-advanced-search-inp" type="password"
                   :placeholder="confirmPassPlace"
                   v-model="rules.confirmPass[0].confirmPass"
                   @focus="handleConfirmPassFocus(true)"
                   @blur="handleConfirmPassFocus(false)"
            >
            <div class="error-tips-box" v-if="rules.confirmPass[0].conPasErrorTip">{{rules.confirmPass[0].conPasErrorCon}}</div>
          </dd>
        </dl>
        <dl class="rm-advanced-search-dl clearfix">
          <dt class="rm-advanced-search-dt">手机号</dt>
          <dd class="rm-advanced-search-dd">
            <input class="rm-advanced-search-inp" type="text"
                   maxlength="11"
                   :placeholder="mobilePlace"
                   v-model="rules.mobile[0].mobile"
                   @focus="handleMobileFocus(true)"
                   @blur="handleMobileFocus(false)"
            >
            <div class="error-tips-box" v-if="rules.mobile[0].mobErrorTip">{{rules.mobile[0].mobErrorCon}}</div>
          </dd>
        </dl>
        <dl class="rm-advanced-search-dl clearfix">
          <dt class="rm-advanced-search-dt">短信验证码</dt>
          <dd class="rm-advanced-search-dd smsCodeBox">
          	<div class="smsCodeBlock">
	            <input class="rm-advanced-search-inp" type="text"
	                   :placeholder="messagePlace"
	                   v-model="rules.message[0].message"
	                   @focus="handleMessageFocus(true)"
	                   @blur="handleMessageFocus(false)"
	            >
	            <!--btnSmsCode是默认蓝色，添加 gray类名 是灰色（58秒后重试）-->
	            <span class="btnSmsCode" :class='{"gray":active}' @click="getCode()">{{messageCode}}</span>
            </div>
            <div class="error-tips-box" v-if="rules.message[0].mesErrorTip">{{rules.message[0].mesErrorCon}}</div>
          </dd>
        </dl>
        <div class="btnWrapBox">
          <button class="reg" @click="registerBtn()">立即注册</button>
        </div>
      </div>
    </div>
    <div class="footer" style="margin-left: 0; text-align: center;">
         © CopyRight 2019 开普云 kaipuyun.cn All Rights Reserved<span>版权所有 京TCP备14035494号-1</span>   <!--Email:ucap@ucap.com.cn-->
       </div>
  </div>
</template>
<script>
  import serviceHead from '@/views/serviceCommonPage/registerForgetPawHead';
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import {getmd5} from '@/config/util';
  export default {
    name: 'wrapBg',
    data() {
      return {
        rules: {
          userName: [
            {required: true, userName: '', userErrorTip: '', userErrorCon: '请输入用户名'},
          ],
          password: [
            {required: true, password: '', passErrorTip: '', passErrorCon: '密码长度6-16位，数字、字母、字符至少包含其中两种'}
          ],
          confirmPass: [
            {required: true, confirmPass: '', conPasErrorTip: '', conPasErrorCon: '请输入确认密码'}
          ],
          mobile: [
            {required: true, mobile: '', mobErrorTip: '', mobErrorCon: '请输入手机号码'}
          ],
          message: [
            {required: true, message: '', mesErrorTip: '', mesErrorCon: '短信验证码有误，请重新输入'}
          ]
        },
        userNamePlace:"6-20位字母数字组合",
        passwordPlace:"密码长度6-16位，数字/字母/特殊字符至少包含2种。",
        confirmPassPlace:"请再次输入密码",
        mobilePlace:"请输入您的手机号码",
        messagePlace:"请输入短信验证码",
        messageCode:"短信验证码",
        wait:60,
        active:"",
        isShow:false,
        isAjax:false
      };
    },
    components: {
      serviceHead
    },
    mounted() {
      var test = window.location.href;
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    methods: {
        //跳转到登录页面
        goLogin() {
          this.$router.push({
            path: '/',
            name: "index",
          })
        },
        getWait(){
          if(this.wait==0){
            this.wait=60;
            this.messageCode = "短信验证码";
            this.active=false;
          }else{
            this.wait--;
            this.messageCode = this.wait+"s重新发送";
            this.active=true;
            setTimeout(()=> {
                this.getWait()
            }, 1000);
          }
        },
        // 确认注册
        registerBtn() {
          let userName = this.rules.userName[0];
          let password = this.rules.password[0];
          let confirmPass = this.rules.confirmPass[0];
          let mobile = this.rules.mobile[0];
          let message = this.rules.message[0];
          if (!userName.userName) {
            userName.userErrorTip = true;
            userName.userErrorCon = "请输入用户名！"
            return;
          };
          if (!password.password) {
            password.passErrorTip = true;
            password.passErrorCon = "请输入密码！"
            return;
          };
          if (!confirmPass.confirmPass) {
            confirmPass.conPasErrorTip = true;
            confirmPass.conPasErrorCon = "请再次输入密码";
            return;
          };
          if (!mobile.mobile) {
            mobile.mobErrorTip = true;
            mobile.mobErrorCon = "请输入手机号码";
            return;
          };
          if (!message.message) {
            message.mesErrorTip = true;
            message.mesErrorCon = "请输入短信验证码";
            return;
          }
          if(message.mesErrorTip || mobile.mobErrorTip || userName.userErrorTip){
            message.mesErrorTip = true;
            return;
          }else{
            this.isJustCode();
          }
        },
        register(){
          let userName = this.rules.userName[0];
          let password = this.rules.password[0];
          let confirmPass = this.rules.confirmPass[0];
          let mobile = this.rules.mobile[0];
          let message = this.rules.message[0];
          axios({
            headers:{"Content-Type":"application/json"},
            method:"post",
            url:"/userInformation/register",
            async:true,
            data: {
              mobile:mobile.mobile.trim(),
              userName:userName.userName.trim(),
              password:getmd5(confirmPass.confirmPass.trim()),
              password2:getmd5(password.password.trim()),
              checkCode:message.message.trim()
            },
            contentType: 'application/json'
          }).then(res=>{
            if(res.data.code == "200"){
              this.isShow = true;
              setTimeout(()=> {
                this.$router.push({
                  path: '/',
                  name: "index",
                });
                setTimeout(()=>{
                  this.isShow = false;
                },4000)
              }, 3000);
            }else{
              alert(res.data.msg)
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        getCode(){//获取短信验证码
          let mobile = this.rules.mobile[0];
          let message = this.rules.message[0];
          if(!mobile.mobile){
            mobile.mobErrorTip = true;
            mobile.mobErrorCon = "请输入手机号码";
            return;
          };
          if(mobile.mobErrorTip){
            return;
          }
          if(this.wait==60){
            axios({
              headers:{"Content-Type":"application/json"},
              method:"post",
              url:"/code/getCode",
              async:true,
              data: {
                mobile:mobile.mobile.trim()
              },
              contentType: 'application/json'
            }).then(res=>{
              if(res.data.code == 200){
                this.getWait();
                message.mesErrorTip = false;
                this.isAjax = false;
                return;
              }else{
                message.mesErrorTip = true;
                message.mesErrorCon = res.data.msg;
                return;
              }
            }).catch(err=>{
              console.log(err)
            })
          }
        },
        isJustCode(){//是否正确的验证码
          let mobile = this.rules.mobile[0];
          var message = this.rules.message[0];
          message.mesErrorTip = false;
          axios({
            headers:{"Content-Type":"application/json"},
            method:"post",
            url:"/code/code",
            async:true,
            data: {
              actionName:"register",
              mobile:mobile.mobile.trim(),
              checkCode:message.message.trim(),
            },
            contentType: 'application/json'
          }).then(res=>{
             if(res.data.code == "200"){
               message.mesErrorTip = false;
               this.register();
               this.isAjax = false;
               return;
             }else{
               message.mesErrorTip = true;
               message.mesErrorCon = res.data.msg.msg;
               this.isAjax = true;
               return;
             }
          }).catch(err=>{
            console.log(err)
          })
        },
        isOnlyUser(isOnly){//用户是否唯一
          let mobile = this.rules.mobile[0];
          let userName = this.rules.userName[0];
          var data;
          if(isOnly == "user"){
            data={userName:userName.userName.trim()}
          }else if(isOnly == "mobile"){
            data={ mobile:mobile.mobile.trim()}
          }
          axios({
            headers:{"Content-Type":"application/json"},
            method:"post",
            url:"/userInformation/isRegister",
            async:true,
            data: data,
            contentType: 'application/json'
          }).then(res=>{
            if(res.data.code == "203"){
              userName.userErrorTip = true;
              userName.userErrorCon = res.data.msg;
              return;
            }else if(res.data.code == "204"){
              mobile.mobErrorTip = true;
              mobile.mobErrorCon = res.data.msg;
              return;
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        //用户名聚焦事件
        handleUserFocus:function(isFocus){
          let userName = this.rules.userName[0];
         // var rep = /[A-Za-z0-9]*([A-Za-z]+\d+)|(\d+[A-Za-z]+)[A-Za-z0-9]{6,20}$/;
//          var rep=/^[\d](?![a-zA-Z]+$)[0-9A-Za-z]{5,11}$/;
//          var reps=/[^\d](?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
//          var repd= /^[\d]/;
//          var newReg =/(?!^(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,20}$/;
          const reg1 = /^[ a-zA-Z0-9_]+$/;
          const reg2 = /^[ a-zA-Z]+$/;
          if(isFocus){
              this.userNamePlace = "";
           }else{
             this.userNamePlace = "6-20位字母数字组合";
             if (!userName.userName.trim()) {
               userName.userErrorTip = true;
               userName.userErrorCon = "请输入用户名！"
             }else if(userName.userName.trim().length < 6 || userName.userName.trim().length > 20){
               userName.userErrorCon = "用户名长度6-20位字符";
               userName.userErrorTip = true;
            }else if(!reg1.test(userName.userName.trim()) || !reg2.test(userName.userName.trim()[0])){
               userName.userErrorCon = "以字母开头，包含字母/数字/下划线";
               userName.userErrorTip = true;
            }else{
               userName.userErrorTip = false;
               this.isOnlyUser('user');
             }
           }
        },
        handlePassFocus(isFocus){
          let password = this.rules.password[0];
          let confirmPass = this.rules.confirmPass[0];
          var newReg =/(?!(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
          if(isFocus){
            this.passwordPlace = "";
          }else{
            this.passwordPlace = "密码长度6-16位，数字/字母/特殊字符至少包含2种。";
            if (!password.password) {
              password.passErrorTip = true;
              password.passErrorCon = "请输入密码！";
            }else if(password.password.length>16 || password.password.length<6){
              password.passErrorTip = true;
              password.passErrorCon = "密码长度6-16位"
            }else if(!newReg.exec(password.password)){
              password.passErrorTip = true;
              password.passErrorCon = "密码长度6-16位，数字/字母/特殊字符至少包含2种"
            } else{
              if(confirmPass.confirmPass){
                if(confirmPass.confirmPass.trim()!=password.password.trim()){
                  confirmPass.conPasErrorTip = true;
                  confirmPass.conPasErrorCon = "两次密码输入不一致。";
                }
              }
              password.passErrorTip = false;
            }
          }
        },
      /*
      *再次输入密码
      */
        handleConfirmPassFocus(isFocus){
          let password = this.rules.password[0];
          let confirmPass = this.rules.confirmPass[0];
          if(isFocus){
            this.confirmPassPlace = "";
            confirmPass.conPasErrorTip = false;
          }else{
            this.confirmPassPlace = "请再次输入密码";
            if (!confirmPass.confirmPass) {
              confirmPass.conPasErrorTip = true;
              confirmPass.conPasErrorCon = "请再次输入密码";
              return;
            }else if(confirmPass.confirmPass.trim()!=password.password.trim()){
                  confirmPass.conPasErrorTip = true;
                  confirmPass.conPasErrorCon = "两次密码输入不一致。";
            }else{
              confirmPass.conPasErrorTip = false;
            }
          }
        },
        handleMobileFocus(isFocus){
          let mobile = this.rules.mobile[0];
          if(isFocus){
            this.mobilePlace = "";
          }else{
            this.mobilePlace = "请输入手机号码";
            if (!mobile.mobile) {
              mobile.mobErrorTip = true;
              mobile.mobErrorCon = "请输入手机号码";
            }else if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile.mobile))){
              mobile.mobErrorTip = true;
              mobile.mobErrorCon = "请输入正确的手机号";
            }else{
              mobile.mobErrorTip = false;
              this.isOnlyUser('mobile');
            }
          }
        },
        handleMessageFocus(isFocus){
          let message = this.rules.message[0];
          if(isFocus){
            this.messagePlace = "";
          }else{
            this.messagePlace = "请输入短信验证码";
            if(!message.message){
              message.mesErrorTip = true;
              message.mesErrorCon = "请输入短信验证码";
            }else{
              message.mesErrorTip = false;
            }
          }
        }
    }
  }
</script>
<style scoped>

</style>
