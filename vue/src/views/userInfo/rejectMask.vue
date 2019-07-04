<template>
  <div class="" >
    <div v-if="rejectMaskShow">
      <!---遮罩层-->
      <div class="mask"></div>
      <!---驳回意见 弹框-->
      <div class="dialog-container add-catalog-dialog">
        <div class="dialog-inner">
          <header class="dialog-header">
            <div class="dialog-header-tit flt">驳回意见</div>
            <div class="icon3 dialog-header-close frt" @click="sendToParent"></div>
          </header>
          <div class="dialog-body">
            <div class="textareaDivBox">
              <textarea placeholder="请输入您的驳回意见" v-model="rejectCon" maxlength="200">{{rejectCon}}</textarea>
              <div class="error-tips-box other" style="padding-left: 7px;" v-if="rejectTips">请输入您的驳回意见</div>
            </div>
          </div>
          <footer class="dialog-footer">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite" @click="rejectBtn">提&nbsp;&nbsp;交</li>
              <li class="btn-item" @click="sendToParent">取&nbsp;&nbsp;消</li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
      <!--修改成功---提示-->
      <div class="failedBox successBox" v-if="rejectTip">
        <i class="icon3 icon-success"></i>{{rejectSuccessCon}}
      </div>
      <!--修改失败---提示-->
      <div class="failedBox failBox" v-if="rejectError">
        <i class="icon3 icon-failure"></i>认证未通过
      </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
    name:'container',
    props:["rejectMaskShow","openID"],
    data(){
      return {
        rejectCon:"",
        rejectTip:false,
        rejectError:false,
        rejectSuccessCon:"认证未通过",
        rejectTips:false
      }
    },
    mounted(){
    },
    methods:{
      sendToParent(){
        this.$emit("listenToChildEvent",false);
        this.rejectCon = "";
      },
      rejectBtn(){
        if(!this.rejectCon){
          this.rejectTips = true;
           return;
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/fillReject",
          async: true,
          data: {
            openID: this.openID,
            confirmStatus: "2",
            rejectOpinion:this.rejectCon
          },
          contentType: 'application/json'
        }).then(res=> {
            this.$emit("listenToChildEvent",false);
            this.rejectError = true;
            setTimeout(() => {
              this.rejectError = false;
              this.rejectCon = "";
              this.$router.push({
              path:'/home/userInfo',
              name:"userInfo",
              })//成功后跳转到首页面
            }, 3000);
        }).catch(err=> {
          console.log(err)
        });
      }
    }
  }
</script>
