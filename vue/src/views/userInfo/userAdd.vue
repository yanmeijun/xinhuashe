<template>
  <div class="content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">用户管理</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
       <div class="deleteCon systemUser">
        <div class="deleteListCon">
           <div class="publicTitle"><i class="lineBlue"></i>用户信息</div>
           <div class="publicList">
             <label>用户名：</label>
             <input type="text"
                    :placeholder="userNamePlace"
                    v-model="rules.userName[0].userName"
                    @focus="handleUserFocus(true)"
                    @blur="handleUserFocus(false)"
                    />
             <div class="error-tips-box other" v-if="rules.userName[0].userErrorTip">{{rules.userName[0].userErrorCon}}</div>
           </div>
           <div class="publicList">
             <label>设置密码：</label>
             <input type="password"
                    :placeholder="passwordPlace"
                    v-model="rules.password[0].password"
                    @focus="handlePassFocus(true)"
                    @blur="handlePassFocus(false)"
             />
             <div class="error-tips-box other" v-if="rules.password[0].passErrorTip">{{rules.password[0].passErrorCon}}</div>
           </div>
           <div class="publicList">
             <label>确认密码：</label>
             <input type="password"
                    :placeholder="confirmPassPlace"
                    v-model="rules.confirmPass[0].confirmPass"
                    @focus="handleConfirmPassFocus(true)"
                    @blur="handleConfirmPassFocus(false)"
             />
             <div class="error-tips-box other" v-if="rules.confirmPass[0].conPasErrorTip">{{rules.confirmPass[0].conPasErrorCon}}</div>
           </div>
           <div class="publicList">
             <label>手机号码：</label>
             <input type="text"
                    maxlength="11"
                    :placeholder="mobilePlace"
                    v-model="rules.mobile[0].mobile"
                    @focus="handleMobileFocus(true)"
                    @blur="handleMobileFocus(false)"
             />
             <div class="error-tips-box other" v-if="rules.mobile[0].mobErrorTip">{{rules.mobile[0].mobErrorCon}}</div>
           </div>
         </div>
         <!--按钮 start-->
         <div class="btnBgBox">
           <button class="btn-defalut btn-blue" @click="submit()">保存</button>
         </div>
         <!--按钮 end-->
       </div>
    </div>
  </div>

</template>
<script>
  import axios from 'axios';
  //import {mapGetters, mapState,mapActions} from 'vuex';
  import {getmd5} from '@/config/util';
  export default {
      data(){
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
              ]
            },
            userNamePlace:"6-20位字母数字组合",
            passwordPlace:"密码长度6-16位，数字/字母/特殊字符至少包含2种。",
            confirmPassPlace:"请再次输入密码",
            mobilePlace:"请输入您的手机号码",
          }
      },
      mounted(){
      },
      computed:{
        //...mapGetters(['getUserInfo'])
      },
      components: {
      },
      created(){
      },
      methods:{
        //...mapActions(['sendUserInfo','sendRoutePath','sendFunctionInfo']),
        submit(){
          var userName = this.rules.userName[0];
          var password = this.rules.password[0];
          var confirmPass = this.rules.confirmPass[0];
          var mobile = this.rules.mobile[0];
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
          if(mobile.mobErrorTip || userName.userErrorTip){
            return;
          }else{
            this.register();
          }
        },
        register(){
          var userName = this.rules.userName[0];
          var password = this.rules.password[0];
          var confirmPass = this.rules.confirmPass[0];
          var mobile = this.rules.mobile[0];
          axios({
            headers:{"Content-Type":"application/json"},
            method:"post",
            url:"/userInformation/register",
            async:true,
            data: {
              mobile:mobile.mobile.trim(),
              userName:userName.userName.trim(),
              password:getmd5(confirmPass.confirmPass.trim())
            },
            contentType: 'application/json'
          }).then(res=>{
            if(res.data.code == "200"){
              this.$router.push({
                path: 'home/userInfo',
                name: "userInfo",
              })
            }else{
              // res.data.msg
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        isOnlyUser(isOnly){//用户是否唯一
          var mobile = this.rules.mobile[0];
          var userName = this.rules.userName[0];
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
          var userName = this.rules.userName[0];
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
          var password = this.rules.password[0];
          var confirmPass = this.rules.confirmPass[0];
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
          var password = this.rules.password[0];
          var confirmPass = this.rules.confirmPass[0];
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
          var mobile = this.rules.mobile[0];
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
      }
  }
</script>
