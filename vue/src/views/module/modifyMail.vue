<template>
  <div>
    <div class="modifyMail" v-if="modifyMailVisible">
      <!--修改邮箱-->
      <div class="dialog-container add-catalog-dialog">
        <div class="dialog-inner dialog-modifyMail">
          <header class="dialog-header">
            <div class="dialog-header-tit flt">修改邮箱</div>
            <div class="icon3 dialog-header-close frt"  @click = "sendToParentModifyMail()"></div>
          </header>
          <div class="dialog-body">
            <div class="sy-publish-dialog-content">
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">旧邮箱：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="text" placeholder="请输入邮箱地址" v-model="usedMail" readonly style="outline: none;border: 0;color:#a09b9b">
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">新邮箱：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="text" placeholder="请输入新邮箱地址" v-model="modifyMail" >
                  <div class="error-tips-box" v-if = "modifyMailError">{{modifyMailErrorContent}}</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite" @click = "modifyMailBtn">确&nbsp;&nbsp;定</li>
              <li class="btn-item" @click = "sendToParentModifyMail()">取&nbsp;&nbsp;消</li>
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
      {{successContent}}
    </div>


  </div>
</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
  export default{
    name:'modifyMail',
    props:["modifyMailVisible","modifyEmails"],
    data(){
      return {
        success:false,
        error:false,
        errorMgs:"操作失败",
        modifyMail:"",
        usedMail:"",
        modifyMailError:false,
        modifyMailErrorContent:"请输入邮箱地址",
        successContent:"操作成功"
      }
    },
    updated:function(){

    },
    mounted(){
    },
    computed: {
      ...mapGetters(['getUserInfo']),
    },
    components: {
    },
    created(){

    },
    methods:{
      sendToParentModifyMail(){
        this.$emit("listenToModifyMailEvent",false);
        this.modifyMailError = false;
        this.modifyMail = "";
//        this.errorInfo = false;
//        this.emailError = false;
//        this.emailAddress = "";
//        this.identifyCode = "";
      },
      modifyMailBtn(){
        //邮箱格式
          let regs=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
           if(this.modifyMail){
               if(!regs.test(this.modifyMail.trim()) || !reg.test(this.modifyMail.trim())){
                 this.modifyMailErrorContent = "邮箱格式错误！"
                 this.modifyMailError = true;
                 return;
               }
           } else {
             this.modifyMailErrorContent = "请输入邮箱地址"
             this.modifyMailError = true;
             return;
           };
            let getUserInfo;
            if(this.getUserInfo){
              if(typeof this.getUserInfo == 'string'){
                getUserInfo = JSON.parse(this.getUserInfo).userName;
              }else{
                getUserInfo = this.getUserInfo.userName;
              }
            };
            axios({
              headers:{"Content-Type":"application/json"},
              method:"post",
              url:"/user/modifyBindMail",
              async:true,
              data: {
                userName:getUserInfo,
                email:this.modifyMail.trim()
              },
              contentType: 'application/json'
            }).then(res => {
              if(res.data.code == "200"){
                this.modifyMail = "";
                this.$emit("listenToModifyMailEvent",false);
                //self.location.reload();  //刷新本页
                this.successContent = res.data.msg;
                this.success = true;
                this.modifyMailError = false;
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
      focusModifyMail(){
        this.modifyMailError = false;
        this.modifyMail = ""
      }
    },
    watch:{
      modifyMailVisible:{
        handler(){
           this.usedMail = this.modifyEmails;
        }
      }
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
