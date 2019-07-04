<template>
  <div class="" >
    <div v-if="centerDialogVisible">
      <div class="dialog-container add-catalog-dialog">
        <div class="dialog-inner dialog-modifyPwd">
          <header class="dialog-header">
            <div class="dialog-header-tit flt">修改密码</div>
            <div class="icon3 dialog-header-close frt" @click="sendToParent"></div>
          </header>
          <div class="dialog-body">
            <div class="sy-publish-dialog-content">
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">当前密码</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" placeholder="请输入当前密码" @focus="handleCodeFocus(false)" v-model="passCode" autocomplete="off">
                  <div class="error-tips-box" v-if="currentPassword">{{currentPasswordContent}}</div>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">新密码</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" placeholder="6-16位，数字/字母/特殊字符至少包含2种。" autocomplete="off" @focus="newhandleCodeFocus(false)" v-model="newpassCode">
                  <div class="error-tips-box"  v-if="newPassword">{{newPasswordContent}}</div>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">确认密码</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" placeholder="请再次输入新密码" autocomplete="off" @focus="aginhandleCodeFocus(false)" v-model="aginnewpassCode">
                  <div class="error-tips-box" v-if="aginNewPassword">{{aginNewPasswordContent}}</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite"  @click="confirm()">保&nbsp;&nbsp;存</li>
              <li class="btn-item" @click="sendToParent">取&nbsp;&nbsp;消</li>
            </ul>
          </footer>
        </div>
      </div>
      <div class="mask"></div>
      <!--操作失败-->
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
  import {getmd5} from '@/config/util';
  export default{
    name:'container',
    props:["centerDialogVisible"],
    data(){
      return {
        showModule:false,
        centerDialog:"",
        currentPassword:false,
        currentPasswordContent:"",
        newPassword:false,
        newPasswordContent:"",
        aginNewPassword:false,
        aginNewPasswordContent:"",
        passCode:"",
        newpassCode:"",
        aginnewpassCode:"",
        success:false,
        error:false,
        errorMgs:"操作失败"
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
          this.passCode = "";
          this.newpassCode = "";
          this.aginnewpassCode = "";
          this.currentPassword = false;
          this.newPassword = false;
          this.aginNewPassword = false;

      },
      handleCodeFocus(){
        this.currentPassword = false;
        this.aginNewPassword = false;
        this.newPassword = false;
      },
      newhandleCodeFocus(){
        this.newPassword = false;
      },
      aginhandleCodeFocus(){
        this.aginNewPassword = false;
      },
      confirm(){
          let re =/[`~!@#$%^&*_+<>{}\/'[\]]/im;//匹配特殊字符
          if(!this.passCode){
            this.currentPasswordContent = "请输入当前密码";
            this.currentPassword = true;
            this.newPassword = false;
            this.aginNewPassword = false;
            return;
//          }else if(re.test(this.passCode)){
//            this.currentPasswordContent = "密码格式不正确！";
//            this.currentPassword = true;
//            this.newPassword = false;
//            this.aginNewPassword = false;
          } else if(this.passCode.indexOf(" ")!=-1){
            this.passCode = this.passCode.replace(/\s/g, "");
          }
          if(!this.newpassCode){
             this.newPasswordContent ="请输入新密码";
             this.newPassword = true;
             this.currentPassword = false;
             this.aginNewPassword = false;
             return;
          } else{
            if(this.newpassCode.indexOf(" ")!=-1){
              this.newpassCode = this.newpassCode.replace(/\s/g, "");
            }
            /**
             * 字母和数字组合验证
             */
            var rep = /(?!^(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
            var passRep=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (this.newpassCode.length > 16 || this.newpassCode.length < 6) {
              this.newPasswordContent = "密码长度6-16位";
              this.newPassword = true;
              this.currentPassword = false;
              this.aginNewPassword = false;
              return;
            }else if(!rep.exec(this.newpassCode)){
              this.newPasswordContent = "密码长度6-16位，数字/字母/特殊字符至少包含2种。";
              this.newPassword = true;
              this.currentPassword = false;
              this.aginNewPassword = false;
              return;
            }
          }
          if(!this.aginnewpassCode){
            this.aginNewPasswordContent = "请输入确认密码";
            this.aginNewPassword = true;
            this.newPassword = false;
            this.currentPassword = false;
            return;
          }else{
            if(this.aginnewpassCode.indexOf(" ")!=-1){
              this.aginnewpassCode = this.aginnewpassCode.replace(/\s/g, "");
            }
            if(this.aginnewpassCode != this.newpassCode){
              this.aginNewPasswordContent = "新密码与确认密码不一致";
              this.aginNewPassword = true;
              this.newPassword = false;
              this.currentPassword = false;
              return
            }
          }
          this.aginNewPassword = false;
          this.newPassword = false;
          this.currentPassword = false;
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
            url:"/user/ModifyPassword",
            async:true,
            data: {
              userName:getUserInfo || "",
              password:getmd5(this.passCode),//当前密码
              aginPassword:getmd5(this.aginnewpassCode)//新密码
            },
            contentType: 'application/json'
          }).then(res => {
            if(res.data.code == "203" || res.data.code == "500"){
              this.errorMgs = res.data.msg;
              this.error = true;
              setTimeout(() => {
                this.error = false;
              }, 1500);
            }else if(res.data.code == "200"){
              this.$emit("listenToChildEvent",false);
              this.success = true;
              setTimeout(() => {
                this.success = false;
              }, 1700);
            }
            this.passCode = "";
            this.newpassCode = "";
            this.aginnewpassCode = "";
            this.$router.push({
              path:'/home/originPage',
            })
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
