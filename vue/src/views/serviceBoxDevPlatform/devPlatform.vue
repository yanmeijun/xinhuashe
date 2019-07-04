<template>
  <div>
    <serviceHead ref="child1"></serviceHead>
    <!--主要的-->
    <div class="openPlatformHomeBox">
      <div class="container clearfix">
        <div class="platHomeCon fl">
          <div class="tit">开放平台</div>
          <div class="intro">如果您想要将其他服务接入到数据服务平台中，那请您提交接接入申请（开放平台，登录即可查看）。服务源单位可以对需要接入服务平台的服务进行申请，经过审核后，方可部署实施工作。
          </div>
          <div class="btn-serviceAccessBox">
            <a href="javascript:;" @click="toPage">服务接入申请</a>
          </div>
        </div>
        <div class="platHomeImg fl">
          <img src="../../assets/img/serviceApply/openPlatformHome.png">
        </div>
      </div>
      <loginMask v-bind:tipSecond="tipSecond" @listenToChildEvent="closeDialog"></loginMask>
      <MaskTip v-bind:tips="tips"
               v-bind:tipsContent="tipsContent"
               v-bind:errorTipsContent="errorTipsContent"
               v-bind:tipsImg="tipsImg"
               v-bind:loading="loading"
               @listenToChildEvent="closeDialog">
      </MaskTip>


      <div class="mask" v-if="isConfirm"></div>
      <div class="dialog-container" v-if="isConfirm">
        <div class="dialog-inner ht286">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">提示</div>
            <div class="icon-verPic icon-dialogClose fr" @click="close()"></div>
          </header>
          <div class="dialog-body">
            <div class="dialog-realNamePic"><img src="../../assets/img/serviceApply/picFailure.png"></div>
            <div class="dialog-realNamePrompt">对不起，该申请暂只支持已通过实名认证的用户使用</div>
            <div class="btnGoCertifi"><a href="javascript:;" @click="goConfirmStatuso">去认证</a></div>
          </div>
        </div>
      </div>

    </div>
    <!--底部-->
    <serviceFooter></serviceFooter>
  </div>
</template>
<script>
  import serviceHead from '@/views/serviceCommonPage/serviceHead';
  import serviceFooter from '@/views/serviceCommonPage/serviceFooter';
  import loginMask from '@/views/serviceBoxDevPlatform/loginMask';
  import MaskTip from '@/views/module/maskTip';
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        openID: "",
        tipSecond: false,
        tips: false,
        tipsContent: '',
        errorTipsContent: "",
        tipsImg: '',
        loading: false,
        isConfirm: false,
        confirmStatus: ""
      }
    },
    mounted() {
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";//得到用户的openID
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      serviceHead,
      serviceFooter,
      loginMask,
      MaskTip
    },
    created() {
    },
    methods: {
      ...mapActions(['sendLoginState']),
      toPage(serviceID) {
        this.$http({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/isLogin",
          async: true,
          data: {
            openID: this.openID
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "402") {
            this.tipSecond = true;
          } else {
            this.$http({
              headers: {"Content-Type": "application/json"},
              method: "post",
              url: "/userInformation/getUserByOpenID",
              async: true,
              data: {
                openID: this.openID
              },
              contentType: 'application/json'
            }).then(res => {
              if (res.data.msg == "success") {
                this.confirmStatus = res.data.results.confirmStatus;
                if (res.data.results.confirmStatus == "3") {
                  this.$router.push({
                    name: "serviceBoxApplication"
                  })
                } else {
                  this.isConfirm = true;
                }
              } else {
                alert("数据加载失败")
              }
            }).catch(err => {
              console.log(err)
            });
          }
        }).catch(err => {
          console.log(err)
        });
      },
      goConfirmStatuso() {
        if (this.confirmStatus == "0") {
          this.$router.push({
            path: '/home/personalRealName/realNameMainCon'
          });
        } else {
          this.$router.push({
            path: '/home/personalRealName/realNameDetails'
          });
        }
      },
      close() {
        this.isConfirm = false;
      },
      closeDialog(flag) {
        this.tipSecond = flag;
        this.tips = flag;
      },
    },
    watch: {}
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
</style>
