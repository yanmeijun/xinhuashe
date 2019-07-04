<template>
  <header class="header clearfix">
    <div id="headErr"></div>
    <div class="leftLogo flt" :class="{'leftW':leftActive,'leftR':rightActive}">
      <a class="logo-box" href="javascript:void(0)" @click.stop="navOpen">
        <img class="logo-pic" src="../../../assets/img/logo-sys.png" alt="后台管理" title="后台管理">
      </a>
    </div>
    <!--<i class="icon header-switch-icon flt" @click="navOpen"></i>-->
    <span class="headerTitle">数据异构聚合平台</span>
    <div class="header-user-box frt" @mouseover="show" @mouseout="hide">
        <img class="header-user-avator flt" src="../../../assets/img/avator.jpg" alt="王明磊" :title="admin">
        <span class="header-user-name flt" >{{admin}}</span>
        <i class="icon header-user-icon flt"></i>
      <div class="userMenu" v-if="selectedInfo">
        <ul >
          <li :class="{'active':showClass}" @click = "centerDialog"><a href="javascript:void(0)">修改密码</a></li>
          <li @click = "mailbox" :class="{'active':showEmailClass}"><a href="javascript:void(0)">{{emailContent}}</a></li>
          <li @click = "earlyWarningVisible = true"   :class="{'active':earlyWarning}"><a href="javascript:void(0)">预警方式</a></li>
          <li :class="{'active':showClass2}"><a href="javascript:void(0)" @click="exitLogon">退出登录</a></li>
        </ul>
      </div>
    </div>
    <!-- 修改密码对话框开始 start -->
    <ModifyPwd v-bind:centerDialogVisible = "centerDialogVisible" @listenToChildEvent = "getMessage"></ModifyPwd>
    <!-- 修改密码对话框结束 end -->

    <!-- 绑定邮箱对话框开始 start -->
    <MailboxBind v-bind:mailboxBindVisible = "mailboxBindVisible" @listenToMailEvent = "getMailMessage" ref = "mailboxBind"></MailboxBind>
    <!-- 绑定邮箱对话框结束 end -->

    <!-- 修改邮箱对话框开始 start -->
    <ModifyMail v-bind:modifyMailVisible = "modifyMailVisible"  @listenToModifyMailEvent = "getMailEvent"  v-bind:modifyEmails = "modifyEmails"></ModifyMail>
    <!-- 修改邮箱对话框结束 end -->

    <!-- 选择预警方式对话框开始 start -->
    <EarlyWarning v-bind:earlyWarningVisible = "earlyWarningVisible" @listenToEarlyWarningEvent = "getEarlyWarning"></EarlyWarning>
    <!-- 选择预警方式对话框结束 end -->

    <!--操作成功-->
    <div class="failedBox successBox" v-if="success">
      <i class="icon4 icon-success"></i>
      {{successContent}}
    </div>
    <!--操作失败-->
    <div class="failedBox" v-if="error">
      <i class="icon4 icon-failed"></i>
      {{errorMgs}}
    </div>

  </header>
</template>
<script>
  import ModifyPwd from '@/views/module/modifyPwd';
  import MailboxBind from '@/views/module/mailboxBind';
  import ModifyMail from '@/views/module/modifyMail';
  import EarlyWarning from '@/views/module/earlyWarning';
  import axios from 'axios';
  import {mapGetters, mapState,mapActions} from 'vuex';
  export default {
      name:'container',
      data(){
          return {
            selectedInfo:false,
            centerDialogVisible:false,
            modifypassword:"修改密码",
            showClass:false,
            showClass2:false,
            success:false,
            error:false,
            errorMgs:"",
            emailContent:"邮箱绑定",
            mailboxBindVisible:false,//邮箱绑定
            showEmailClass:false,
            modifyMailVisible:false,
            earlyWarningVisible:false, //选择预警方式
            earlyWarning:false,
            successContent:"退出成功",
            falg:false,
            leftActive:false,
            rightActive:false,
            admin:"admin",
            modifyEmails:""
          }
      },
      mounted(){
        this.emailSjax();
//        if(this.mailboxBindVisible){
//          console.log(this.$refs.mailboxBind.createCodes())
//          console.log(this.$refs.myMailCanvas)
//        }
//        console.log(this.$refs.mailboxBind)
//        console.log(this.$refs.mailboxBind.createCodes())
      },
      computed:{
        ...mapGetters(['getUserInfo'])

      },
      components: {
        ModifyPwd,
        MailboxBind,
        ModifyMail,
        EarlyWarning
      },
      created(){
      },
      methods:{
        ...mapActions(['sendUserInfo','sendRoutePath','sendFunctionInfo']),
        information(){
            this.falg = true;
            this.selectedInfo = this.selectedInfo == false ? this.selectedInfo = true : this.selectedInfo = false;
            this.emailSjax();
        },
        show(){
          this.falg = true;
          this.selectedInfo = true;
          this.emailSjax();
          /*状态显示*/
          this.showClass = false;
          this.showEmailClass = false;
          this.earlyWarning = false;
          this.showClass2 = false;
        },
        hide(){
          this.selectedInfo = false;
        },
        getMessage(data){
           this.centerDialogVisible = data;
           this.showClass = true;
        },
        /*
        *监听绑定邮箱
        */
        getMailMessage(isfalg){
            this.showEmailClass = !isfalg;
            this.mailboxBindVisible = isfalg;
            this.showClass = isfalg;
            this.earlyWarning = false;

        },
        /*
        *修改邮箱
        */
        getMailEvent(isfalg){
            this.showEmailClass = !isfalg;
            this.modifyMailVisible = isfalg;
            this.showClass = isfalg;
            this.earlyWarning = isfalg;
        },
        getEarlyWarning(isfalg){
            this.earlyWarning = !isfalg;
            this.earlyWarningVisible = isfalg;
            this.showEmailClass = isfalg;
            this.showClass = isfalg;
        },
        /*
        *退出登录
        */
        exitLogon(){
           this.showClass = false;
           this.showClass2 = true;
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
            url:"/user/logout",
            async:true,
            data: {
              userName:getUserInfo
            },
            contentType: 'application/json'
          }).then(res => {
            if(res.data.code == "200"){
              this.success = true;
              this.successContent = "已退出";
              sessionStorage.setItem('isSelect', "")
              setTimeout(() => {
                this.success = false;
              }, 1500);
              /*将用户名本地缓存清空*/
              //this.sendUserInfo("");
//              this.$router.push({
//                path:'/',
//                name:"index",
//              })//成功后跳转到首页面
              window.location.href = "/"
            }else{
              this.error = true;
              this.errorMgs = res.data.msg;
              setTimeout(() => {
                this.error = false;
              }, 1500);
              window.location.href = "/"
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        /*判断用户是否绑定邮箱*/
        emailSjax(){
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
            url:"/user/mailbox",
            async:true,
            data: {
              userName:getUserInfo
            },
            contentType: 'application/json'
          }).then(res => {
            this.admin = res.data.userName;
            if (res.data.code == "200") { //邮箱已绑定
                 this.emailContent = "修改邮箱";
                 this.falg = true;
                 if(res.data.dataUser.email){
                      this.modifyEmails = res.data.dataUser.email;
                 };
                 return;
            } else if (res.data.code == "202"){//邮箱未绑定
                this.emailContent = "邮箱绑定";
                if(!this.falg){
                  this.success = true;
                  this.successContent = "您好！首次登录需要对邮箱进行绑定！";
                  setTimeout(() => {
                    this.success = false;
                    this.mailbox()
                  }, 1700);
                }
                return;
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        mailbox(){
          this.success = false;
          if(this.emailContent == "邮箱绑定"){
             this.mailboxBindVisible = true;
             return;
          } else {
              this.modifyMailVisible = true;
              return;
          }
          this.showClass = false;
        },
        centerDialog(){
          this.centerDialogVisible = true;
          this.showEmailClass = false;
          this.earlyWarning = false;
        },
        navOpen () {
          this.$emit('nav-open', '');
        }


      },
      watch:{
        mailboxBindVisible:{
          handler(){
            this.emailContent = "邮箱绑定";
          }
        },
        modifyMailVisible:{
          handler(){
            this.emailContent = "修改邮箱";
          }
        }

      }
  }
</script>
<style scoped="">
  .leftW{
    width: 68px;
    transition: all .4s;
  }
  .leftR{
    width: 160px;
    transition: all .4s;
  }
</style>
