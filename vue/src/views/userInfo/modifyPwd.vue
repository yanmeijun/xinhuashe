<template>
  <div class="" >
    <div v-if="modifyPassVisible">
      <!---撤销成功 弹框-->
      <div class="dialog-container" v-if="success">
        <div div class="dialog-inner">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">提示</div>
            <div class="icon2 dialog-header-close fr"></div>
          </header>
          <div class="dialog-body">
            <div class="dialogPic"><img src="../../assets/img/dialog-successPic.png"></div>
            <div class="dialogWord">{{successMgs}}</div>
          </div>
        </div>
      </div>
      <div class="dialog-container add-catalog-dialog" v-else>
        <div class="dialog-inner dialog-changePwd">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">修改密码</div>
            <div class="icon3 dialog-header-close frt" @click="sendToParent"></div>
          </header>
          <div class="dialog-body">
            <div class="sy-publish-dialog-content">
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">用户名：</dt>
                <dd class="rm-advanced-search-dd">
                  <span class="userName">{{userRealName}}</span>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">密码：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" :placeholder="passwordPlace"
                         ref = "passFocus"
                         autocomplete="off"
                         @focus="handlePassFocus(true)"
                         @blur="handlePassFocus(false)"
                         v-model="newpassCode">
                  <div class="error-tips-box" >{{newPasswordContent}}</div>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">确认密码：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" :placeholder="aginpasswordPlace"
                         autocomplete="off"
                         @focus="aginhandleCodeFocus(true)"
                         @blur ="aginhandleCodeFocus(false)"
                         v-model="aginnewpassCode">
                  <div class="error-tips-box">{{aginNewPasswordContent}}</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite"  @click="confirm()">确&nbsp;&nbsp;定</li>
              <li class="btn-item" @click="sendToParent">取&nbsp;&nbsp;消</li>
            </ul>
          </footer>
        </div>
      </div>
      <div class="mask"></div>
    </div>
    <!--修改密码成功---提示-->
    <div class="failedBox successBox" v-if="modfiyPass">
      <i class="icon3 icon-success"></i>{{modfiyPassCon}}
    </div>
    <!--修改密码失败---提示-->
    <div class="failedBox failBox" v-if="modfiyPassError">
      <i class="icon3 icon-failure"></i>修改密码失败！
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
  import {getmd5} from '@/config/util';
  export default{
    name:'container',
    props:["modifyPassVisible","userRealName"],
    data(){
      return {
        showModule:false,
        centerDialog:"",
        newpassCode:"",
        newPasswordContent:"",
        aginnewpassCode:"",
        aginNewPasswordContent:"",
        success:false,
        error:false,
        successMgs:"操作失败",
        passwordPlace:"6-16位，数字/字母/特殊字符至少包含2种",
        aginpasswordPlace:"6-16位，数字/字母/特殊字符至少包含2种",
        triggerFacus:true,
        modfiyPass:false,
        modfiyPassCon:"修改密码成功！",
        modfiyPassError:false
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
      sendToParent(){
          this.$emit("listenToChildEvent",false);
          this.newpassCode = "";
          this.aginnewpassCode = "";
          this.newPasswordContent = "";
          this.aginNewPasswordContent = "";
      },
      handlePassFocus(isFocus){
        let password = this.newpassCode;//密码
        let confirmPass = this.aginNewPassword;//再次确认密码
        var newReg =/(?!(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
        if(isFocus){
          this.passwordPlace = "";
        }else{
          this.passwordPlace = "6-16位，数字/字母/特殊字符至少包含2种";
         /*非空判断*/
          if (this.newpassCode.trim().length!=0) {
            if(this.newpassCode.trim().length>16 || this.newpassCode.trim().length<6){
              this.newPasswordContent = "密码长度6-16位";
              return;
            }else if(!newReg.exec(this.newpassCode)){
              this.newPasswordContent = "密码长度6-16位，数字/字母/特殊字符至少包含2种";
              return;
            }else{
              this.newPasswordContent="";
            }
          }else{
            this.newPasswordContent = "请输入密码";
            return;
          }
        }

      },
      aginhandleCodeFocus(isFocus){
        var newReg =/(?!(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
        if(isFocus){
          this.aginpasswordPlace = "";
        }else{
          this.aginpasswordPlace = "6-16位，数字/字母/字符至少包含2种";
          if (this.aginnewpassCode.trim().length!=0) {
//            if(!newReg.exec(this.aginnewpassCode) || this.aginnewpassCode.trim().length>16 || this.aginnewpassCode.trim().length<6){
//              this.aginNewPasswordContent = "6-16位，数字/字母/字符至少包含2种";
//              return;
//            }else
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
            this.aginNewPasswordContent = "请输入确认密码";
            return;
          }
        }
      },
      confirm(){
        this.handlePassFocus(false);
        this.aginhandleCodeFocus(false);
        //this.$refs.passFocus.focus();
          if(this.newPasswordContent.length!=0 || this.aginNewPasswordContent.length!=0){return}
            axios({
              headers:{"Content-Type":"application/json"},
              method:"post",
              url:"/userInformation/ModifyPassword",
              async:true,
              data: {
                userName:this.userRealName,
                password:getmd5(this.newpassCode),//当前密码
                aginPassword:getmd5(this.aginnewpassCode)//新密码
              },
              contentType: 'application/json'
            }).then(res => {
             if(res.data.code == "200"){
               this.$emit("listenToChildEvent",false);
               this.newpassCode = "";//清空确认密码
               this.aginnewpassCode = "";//清空确认密码
               this.modfiyPass = true;
               this.modfiyPassCon = "修改密码成功！用户下次登录需要使用新密码进行登录";
               setTimeout(() => {
                 this.modfiyPass = false;
               }, 3000);
              }else{
                 this.modfiyPassError = true;
                 setTimeout(() => {
                   this.modfiyPassError = false;
                 }, 3000);
              }
            }).catch(err=>{
              console.log(err)
            })
      },

    }
  }
</script>
<style scoped="">
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
