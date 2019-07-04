<template>
  <div class="" >
    <div v-if="modifyPassVisible">

      <!---撤销成功 弹框-->
      <div class="dialog-container" v-if="success">
        <div div class="dialog-inner">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">提示</div>
            <div class="icon-verPic icon-dialogClose fr"></div>
          </header>
          <div class="dialog-body">
            <div class="dialogPic"><img src="../../assets/img/dialog-successPic.png"></div>
            <div class="dialogWord">{{successMgs}}</div>
          </div>
        </div>
      </div>

      <div class="dialog-container" v-else>
        <div class="dialog-inner ht384">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">修改密码</div>
            <div class="icon-verPic icon-dialogClose fr" @click="sendToParent"></div>
          </header>
          <div class="dialog-body textListht">
            <div class="sy-publish-dialog-content">

              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">手机号：</dt>
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
                <dt class="rm-advanced-search-dt">验证码：</dt>
                <dd class="rm-advanced-search-dd">
                  <div class="codeBox clearfix">
                    <input class="rm-advanced-search-inp codeText fl"
                           type="text"
                           @focus="handleMessageFocus(true)"
                           @blur="handleMessageFocus(false)"
                           v-model="message"
                           :placeholder="messagePlace">
                    <!---获取验证码a标签加上active是剩余多少秒状态-->
                    <!--<a class="verCodeBox fr" href="javascript:;" title="获取验证码">获取验证码</a>-->
                    <span class="verCodeBox fr" :class='{"gray":active}' @click="getCode()">{{messageCode}}</span>
                  </div>
                  <!--<div class="error-tips-box" style="display: none;">请输入验证码</div>-->
                  <div class="error-tips-box">{{mesErrorCon}}</div>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">密码：</dt>
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
                <dt class="rm-advanced-search-dt">确认密码：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password"
                         @focus="aginhandleCodeFocus(true)"
                         @blur ="aginhandleCodeFocus(false)"
                         v-model="aginnewpassCode"
                         :placeholder="aginpasswordPlace">
                  <div class="error-tips-box">{{aginNewPasswordContent}}</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer dialog-footMar">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite"  @click="confirm()">确&nbsp;&nbsp;定</li>
              <li class="btn-item" @click="sendToParent">取&nbsp;&nbsp;消</li>
            </ul>
          </footer>
        </div>
      </div>
      <div class="mask"></div>
    </div>

  </div>
</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
  import {getmd5} from '@/config/util';
  export default{
    name:'container',
    props:["modifyPassVisible"],
    data(){
      return {
        showModule:false,
        success:false,
        error:false,
        successMgs:"操作失败",

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
      ...mapGetters(['getUserInfo'])
    },
    components: {
    },
    created(){

    },
    methods:{
      ...mapActions(['sendLoginState']),
      sendToParent(){
          this.$emit("listenToChildEvent",false);
          this.passCode = "";
          this.newpassCode = "";
          this.aginnewpassCode = "";
          this.currentPassword = false;
          this.newPassword = false;
          this.aginNewPassword = false;
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
          }else if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))){
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
            async:false,
            data: {
              mobile:this.phone.trim()
            },
            contentType: 'application/json'
          }).then(res=>{
            if(res.data.code == 200){
              this.mesErrorCon = "";
              this.getWait();
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
          async:false,
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
      confirm(){
        this.handleMessageFocus(false);
        this.handleMobileFocus(false);
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
            password:getmd5(this.newpassCode.trim()),//当前密码
            aginPassword:getmd5(this.aginnewpassCode.trim())//新密码
          },
          contentType: 'application/json'
        }).then(res => {
          if(res.data.code == "200"){
            this.success = true;
            this.successMgs = "修改密码成功";
            this.sendLoginState("0");//登录后改变登录状态 isLogin = 0 ；
            setTimeout(() => {
              this.success = false;
              this.$emit("listenToChildEvent",false);
              this.passCode = "";
              this.newpassCode = "";
              this.aginnewpassCode = "";
              this.currentPassword = false;
              this.newPassword = false;
              this.aginNewPassword = false;

              this.$router.push({
                path:'/',
                name: "index"
              })
              this.passCode = "";
              this.newpassCode = "";
              this.aginnewpassCode = "";
            }, 3000);
          }else {
            alert(res.data.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
      },

    }
  }
</script>
<style scoped>
  @import "../../assets/css/main.css";
  @import "../../assets/css/dialog.css";
  .dialog-body .rm-advanced-search-inp {
    margin-left: 15px;
    height: 32px;
    line-height: 32px;
    color: #333;
    font-size: 14px;
    border: 1px solid #ddd;
    background: #fff;
    width: 288px;
    padding-left: 10px;
    border-radius: 2px;
  }
</style>
