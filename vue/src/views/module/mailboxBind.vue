<template>
  <div class="mailboxBind">
    <div  v-if="mailboxBindVisible">
          <div class="dialog-container add-catalog-dialog">
            <div class="dialog-inner dialog-bindMail">
              <header class="dialog-header">
                <div class="dialog-header-tit flt">邮箱绑定</div>
                <div class="icon3 dialog-header-close frt" @click="sendToParentMail"></div>
              </header>
              <div class="dialog-body">
                <div class="sy-publish-dialog-content">
                  <dl class="rm-advanced-search-dl clearfix">
                    <dt class="rm-advanced-search-dt">邮箱地址</dt>
                    <dd class="rm-advanced-search-dd">
                      <input class="rm-advanced-search-inp" type="text" placeholder="请输入邮箱地址" v-model="emailAddress" @focus = "emailCodeFocus(false)">
                      <div class="error-tips-box" v-if = "emailError">{{emailErrorTip}}</div>
                    </dd>
                  </dl>
                  <dl class="rm-advanced-search-dl clearfix" style="display: none">
                    <dt class="rm-advanced-search-dt">验证码</dt>
                    <dd class="rm-advanced-search-dd">
                      <div class="codeBox clearfix">
                        <input class="rm-advanced-search-inp codeText flt" type="text" placeholder="请输入验证码" v-model="identifyCode" @focus = "CodeFocus(false)">
                        <!--<a class="v-code-box frt" title="点击更换验证码">-->
                          <!--<img src="" alt="验证码"/>-->
                        <!--</a>-->
                          <canvas   class="v-code-box frt" id="myMailCanvas" ref = "myMailCanvas"   @click="createCodes()">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
                         <!--<a class="v-code-box frt codeErr" title="点击更换验证码">-->
                          <!--347v-->
                        <!--</a>-->
                      </div>
                      <div class="error-tips-box" v-if = "errorInfo">{{errorCode}}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <footer class="dialog-footer">
                <ul class="btn-list">
                  <li class="btn-item btn-item-acvite" @click = "bindMail">确&nbsp;&nbsp;定</li>
                  <li class="btn-item" @click="sendToParentMail">取&nbsp;&nbsp;消</li>
                </ul>
              </footer>
            </div>
          </div>
          <div class="mask"></div>
          <div class="failedBox" v-if="error">
            <i class="icon4 icon-failed"></i>
            {{errorMgs}}
          </div>
    </div>
    <!--操作成功-->
    <div class="failedBox successBox" v-if="success">
      <i class="icon4 icon-success"></i>
      操作成功
    </div>
  </div>

</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
  var codes;
  export default{
    name:'mailboxBind',
    props:["mailboxBindVisible"],
    data(){
      return {
        identifyCode:"",
        errorInfo:false,
        errorCode:"请输入验证码",
        emailError:false,
        emailErrorTip:"请输入邮箱地址",
        emailAddress:"",
        error:false,
        errorMgs:"操作失败",
        success:false
      }
    },
    created:function(){

    },
    mounted(){
    },
    beforeUpdate:function(){

    },
    updated:function(){
//      if(this.mailboxBindVisible){
//        this.createCodes(); //调用验证码
//      }
    },
    computed: {
      ...mapGetters(['getUserInfo']),

    },
    components: {
    },
    methods:{
      sendToParentMail(){
          this.$emit("listenToMailEvent",false);
          this.errorInfo = false;
          this.emailError = false;
          this.emailAddress = "";
          this.identifyCode = "";
      },
      /*
      *生成验证码
      */
      createCodes(){
        codes = "";
        let codeLength = 4;
        let selectChar = new Array(1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(var i=0;i<codeLength;i++) {
          var charIndex = Math.floor(Math.random()*60);
          codes +=selectChar[charIndex];
        }
        if(codes.length != codeLength){
          this.createCodes();
        }
         this.showChecks(codes);
      },
      showChecks(a){
        let c = document.getElementById("myMailCanvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0,0,1000,1000);
        ctx.font = "80px 'Microsoft Yahei'";
        ctx.fillText(a,50,100);
        ctx.fillStyle = "black";
      },
      /*校验验证码*/
      validateCode (){
        let inputCode = this.identifyCode.toUpperCase();
        if(!codes){
          this.errorCode = "验证码已过期";
          this.errorInfo = true;
          return;
        }
        let codeToUp=codes.toUpperCase();//把字符串装换为大小写
        let re =/[`~!@#$%^&*_+<>{}\/'[\]]/im;//匹配特殊字符
        if(inputCode.indexOf(" ")!=-1){
          inputCode = inputCode.replace(/\s/g, "");
        }
        if(inputCode.length <=0) {
          this.errorCode = "验证码不能为空";
          this.errorInfo = true;
          this.createCodes();
          return;
        } else if(inputCode != codeToUp ){
          this.errorCode = "验证码错误";
          this.errorInfo = true;
          this.createCodes();
          return;
        }
      },
      emailCodeFocus(isFocus){
        this.emailError = isFocus;
      },
      CodeFocus(isFocus){
        this.errorInfo = isFocus;
      },
      /*
      *点击确定按钮 绑定邮箱
      */
      bindMail(){
          this.errorInfo = false;
          this.emailError = false;
          /* 邮箱地址*/
          //邮箱格式
          let regs=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
          if(!this.emailAddress){
              this.emailErrorTip = "请输入邮箱地址";
              this.emailError = true;
              return;
          } else if (!regs.test(this.emailAddress)) {
              this.emailErrorTip = "邮箱格式错误";
              this.emailError = true;
              return;
          }
//          if(this.identifyCode){
//             this.validateCode ();//判断验证码是否正确
//             return;
//          }else {
//              this.errorInfo = true;
//              return;
//          };
          let getUserInfo;
          if(this.getUserInfo){
            if(typeof this.getUserInfo == 'string'){
              getUserInfo = JSON.parse(this.getUserInfo).userName;
            }else{
              getUserInfo = this.getUserInfo.userName;
            }
          }
          axios({
            headers:{"Content-Type":"application/json"},
            method:"post",
            url:"/user/mailboxBind",
            async:true,
            data: {
              userName:getUserInfo,
              email:this.emailAddress
            },
            contentType: 'application/json'
          }).then(res => {
             if(res.data.code == "200"){
               this.$emit("listenToMailEvent",false);
               this.success = true;
               setTimeout(() => {
                 this.success = false;
               }, 1700);
             }else {
                this.errorMgs = res.data.msg;
                this.error = true;
                 setTimeout(() => {
                   this.error = false;
                 }, 1700);
             }
        }).catch(err=>{
          console.log(err)
        })
      },

    }
  }
</script>
<style scoped="">
  canvas{
    display: inline-block;
    border: 1px solid #ddd;
    width: 92px;
    height: 32px;
    border-radius: 2px;
    cursor: pointer;/*光标为手型*/
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.2) 98%, #FFFFFF 100%);
    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.2) 98%, #FFFFFF 100%);
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 0.1)), color-stop(40%, rgba(0, 0, 0, 0.1)), color-stop(98%, rgba(0, 0, 0, 0.2)),color-stop(100%, #FFFFFF));
  }
  .codeErr{
    position: absolute;
    right: 0px;
    width: 91px;
    top: 0;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    border: 0;
  }
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
