<template>
   <div>
     <div class="wrapBg">
       <serviceHead></serviceHead>
       <div class="regCon">

         <div class="dialog-container" v-if="isShow">
           <div class="dialog-inner">
             <header class="dialog-header">
               <div class="dialog-header-tit fl">提示</div>
               <div class="icon2 dialog-header-close fr" @click="closeDialog()"></div>
             </header>
             <div class="dialog-body">
               <div class="dialogPic"><img src="../../assets/img/dialog-successPic.png"></div>
               <div class="dialogWord">找回密码成功,请重新登录</div>
             </div>
           </div>
         </div>
         <!---遮罩层-->
         <div class="mask" v-if="isShow"></div>
         <!--注册成功 end -->
         <div class="formCon" v-else>
           <h1 class="title"><span>找回密码</span></h1>
           <dl class="rm-advanced-search-dl clearfix">
             <dt class="rm-advanced-search-dt">手机号</dt>
             <dd class="rm-advanced-search-dd">
               <input class="rm-advanced-search-inp" type="text"
                      maxlength="11"
                      v-model="phone"
                      @focus="handleMobileFocus(true)"
                      @blur="handleMobileFocus(false)"
                      :placeholder="mobilePlace">
               <div class="error-tips-box">{{mobErrorCon}}</div>
             </dd>
           </dl>
           <dl class="rm-advanced-search-dl clearfix">
             <dt class="rm-advanced-search-dt">短信验证码</dt>
             <dd class="rm-advanced-search-dd smsCodeBox">
             	<div class="smsCodeBlock">
	               <input class="rm-advanced-search-inp"
	                      type="text"
	                      @focus="handleMessageFocus(true)"
	                      @blur="handleMessageFocus(false)"
	                      v-model="message"
	                      :placeholder="messagePlace">
	               <!--btnSmsCode是默认蓝色，添加 gray类名 是灰色（58秒后重试）-->
	               <span class="btnSmsCode" :class='{"gray":active}' @click="getCode()">{{messageCode}}</span>
	            </div>
               <div class="error-tips-box">{{mesErrorCon}}</div>
             </dd>
           </dl>
           <dl class="rm-advanced-search-dl clearfix">
             <dt class="rm-advanced-search-dt">密码</dt>
             <dd class="rm-advanced-search-dd">
               <input class="rm-advanced-search-inp" type="password"
                      :placeholder="passwordPlace"
                      autocomplete="off"
                      @focus="handlePassFocus(true)"
                      @blur="handlePassFocus(false)"
                      v-model="newpassCode"
               >
               <div class="error-tips-box">{{newPasswordContent}}</div>
             </dd>
           </dl>
           <dl class="rm-advanced-search-dl clearfix">
             <dt class="rm-advanced-search-dt">确认密码</dt>
             <dd class="rm-advanced-search-dd">
               <input class="rm-advanced-search-inp" type="password"
                      @focus="aginhandleCodeFocus(true)"
                      @blur ="aginhandleCodeFocus(false)"
                      v-model="aginnewpassCode"
                      :placeholder="aginpasswordPlace">
               <div class="error-tips-box">{{aginNewPasswordContent}}</div>
             </dd>
           </dl>
           <div class="btnWrapBox">
             <button class="reg" @click="findBtn()">立即找回</button>
           </div>
           <!--<div class="loginReg clearfix">
             <div class="returnLogin fl"><a href="javascript:void(0);" @click="loginBtn()">返回登录</a></div>
             <div class="accountLogin fr">还没有账号，<a href="javascript:void(0);" @click="registerBtn()">立即注册<i class="icon-reg"></i></a></div>
           </div>-->
         </div>
       </div>
       <div class="footer" style="margin-left: 0; text-align: center;">
         © CopyRight 2019 开普云 kaipuyun.cn All Rights Reserved<span>版权所有 京TCP备14035494号-1</span>   <!--Email:yunying@ucap.com.cn-->
       </div>
     </div>
   </div>
</template>
<script>
  import serviceHead from '@/views/serviceCommonPage/registerForgetPawHead';
  import axios from 'axios';
  import {getmd5} from '@/config/util';
  export default {
    data(){
      return {
        newpassCode:"",
        newPasswordContent:"",
        aginnewpassCode:"",
        aginNewPasswordContent:"",
        passwordPlace:"请输入新密码",
        aginpasswordPlace:"请再次输入密码",
        messagePlace:"请输入短信验证码",
        messageCode:"短信验证码",
        wait:60,
        phone:"",
        mobilePlace:"请输入手机号码",
        mobErrorCon:"",
        active:"",
        mesErrorCon:"",
        message:"",
        isShow:false,
        isOnlyMob:false
      }
    },
    mounted(){


    },
    computed:{
    },
    components: {
      serviceHead
    },
    created(){
    },
    methods:{
      //跳转到登录页面
      goLogin() {
        this.$router.push({
          path: '/',
          name: "index",
        })
      },
      loginBtn(){
        this.$router.push({
          path: '/',
          name: "index",
        })
      },
      registerBtn(){
        this.$router.push({
          path: '/register',
          name: "register",
        })
      },
      handlePassFocus(isFocus){
        let password = this.newpassCode;//密码
        let confirmPass = this.aginNewPassword;//再次确认密码
        var newReg =/(?!(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
        if(isFocus){
          this.passwordPlace = "";
        }else{
          this.passwordPlace = "请输入新密码";
          /*非空判断*/
          if (this.newpassCode.trim().length!=0) {
            if(this.newpassCode.trim().length>16 || this.newpassCode.trim().length<6){
              this.newPasswordContent = "密码长度6-16位";
              return;
            }else if(!newReg.exec(this.newpassCode.trim()) ){
              this.newPasswordContent = "密码长度6-16位，数字/字母/特殊字符至少包含2种";
              return;
            }else{
              this.newPasswordContent="";
            }
          }else{
            this.newPasswordContent = "请输入新密码";
            return;
          }
        }

      },
      aginhandleCodeFocus(isFocus){
        var newReg =/(?!(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
        if(isFocus){
          this.aginpasswordPlace = "";
        }else{
          this.aginpasswordPlace = "请再次输入密码";
          if (this.aginnewpassCode.trim().length!=0) {
            if(this.newpassCode.trim().length!=0){
              if(this.aginnewpassCode.trim() != this.newpassCode.trim()){
                this.aginNewPasswordContent = "两次密码输入不一致！";
                return;
              }else{
                this.aginNewPasswordContent="";
              }
            }else{
              this.aginNewPasswordContent="";
            }
          }else{
            this.aginNewPasswordContent = "请再次输入密码";
            return;
          }
        }
      },
      handleMobileFocus(isFocus){
        let mobile = this.phone;
        if(isFocus){
          this.mobilePlace = "";
        }else{
          this.mobilePlace = "请输入手机号码";
          if (!mobile) {
            this.mobErrorCon = "请输入手机号码";
            this.isOnlyMob = true;
          }else if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile.trim()))){
            this.mobErrorCon = "请输入正确的手机号";
            this.isOnlyMob = true;
            return;
          }else{
            this.mobErrorCon = "";
            this.isOnlyMobile();
          }
        }
      },
      isOnlyMobile(){
        axios({//判断用户是手机号是否注册过
          headers:{"Content-Type":"application/json"},
          method:"post",
          url:"/userInformation/isOnlymobile",
          async:true,
          data: {
            mobile:this.phone.trim()
          },
          contentType: 'application/json'
        }).then(res => {
          if(res.data.code == "200"){
            //成功后获取短信验证码
            this.mobErrorCon = "该手机号未进行注册";
            this.isOnlyMob = true;
            return;
          }else {
            this.isOnlyMob = false;
            this.mobErrorCon = "";
          }
        }).catch(err=>{
          console.log(err)
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
      handleMessageFocus(isFocus){
        let message = this.message;
        if(isFocus){
          this.messagePlace = "";
        }else{
          this.messagePlace = "请输入短信验证码";
          if(!message){
            this.mesErrorCon = "请输入短信验证码";
            return;
          }else{
            //this.mesErrorCon = "";
            this.isJustCode();
          }
        }
      },
      getCode(){
        this.handleMobileFocus(false);
        if(this.isOnlyMob){
           return;
        }
        if(this.wait==60){
          axios({
            headers:{"Content-Type":"application/json"},
            method:"post",
            url:"/code/retrievePwd",
            async:true,
            data: {
              mobile:this.phone.trim()
            },
            contentType: 'application/json'
          }).then(res=>{
            if(res.data.code == 200){
              this.getWait();
              this.mesErrorCon = "";
              return;
            }else{
              this.mesErrorCon = res.data.msg;
              return;
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      isJustCode(){//是否正确的验证码
        let mobile = this.phone.trim();
        var message = this.message.trim();
        axios({
          headers:{"Content-Type":"application/json"},
          method:"post",
          url:"/code/code",
          async:true,
          data: {
            actionName:"forgetPass",
            mobile:mobile,
            checkCode:message.trim(),
          },
          contentType: 'application/json'
        }).then(res=>{
          if(res.data.code == "200"){
            this.mesErrorCon = "";
            return;
          }else{
            this.mesErrorCon = res.data.msg.msg;
            return;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      findBtn(){
        this.handleMobileFocus(false);
        this.handleMessageFocus(false);
        this.handlePassFocus(false);
        this.aginhandleCodeFocus(false);
        if(this.mobErrorCon || this.mesErrorCon || this.newPasswordContent || this.aginNewPasswordContent){
          return;
        }
        axios({
          headers:{"Content-Type":"application/json"},
          method:"post",
          url:"/userInformation/findPassword",
          async:true,
          data: {
            mobile:this.phone.trim(),
            checkCode : this.message.trim(),
            password:getmd5(this.newpassCode.trim()),//密码
            aginPassword:getmd5(this.aginnewpassCode.trim())//确认密码
          },
          contentType: 'application/json'
        }).then(res => {
          if(res.data.code == "200"){
            this.isShow = true;
            setTimeout(() => {
              this.$router.push({
                path:'/',
                name: "index"
              })
              this.isShow = false;
            }, 3000);
          }else{
               alert(res.data.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      closeDialog(){
        this.isShow = false;
      }
    },
    watch:{
    }
  }
</script>
<style scoped>
  @import "../../assets/css/dialog.css";
</style>
