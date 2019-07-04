<template>
  <div>
    <div v-if="ModifyMobileVisible">


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
        <div class="dialog-inner ht286">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">修改手机号码</div>
            <div class="icon-verPic icon-dialogClose fr" @click="sendToParent"></div>
          </header>
          <div class="dialog-body textListht">
            <div class="sy-publish-dialog-content">
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">新手机号码：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="text" placeholder="请输入新手机号"
                         maxlength="11"
                         v-model="newMobile">
                  <div class="error-tips-box" v-if="mobile">{{newMobErrorTip}}</div>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">验证码：</dt>
                <dd class="rm-advanced-search-dd">
                  <div class="codeBox clearfix">
                    <input class="rm-advanced-search-inp codeText fl" type="text" placeholder="请输入验证码"
                           v-model="messageCode">
                    <!---获取验证码a标签加上active是点亮状态-->
                    <a class="verCodeBox fr" href="javascript:;" title="获取验证码" :class='{"gray":active}'
                       @click="getCode()">{{mesCode}}</a>
                  </div>
                  <div class="error-tips-box" v-if="verification">{{mesErrorTip}}</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer dialog-footMar marTop60">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite" @click="confirm()">确&nbsp;&nbsp;定</li>
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
  import {mapActions, mapState, mapGetters} from 'vuex';

  export default {
    name: 'container',
    props: ["ModifyMobileVisible"],
    data() {
      return {
        getUser: "",
        mobile: false,
        newMobile: "",
        newMobErrorTip: "请输入新手机号",
        verification: false,
        mesCode: "短信验证码",
        mesErrorTip: "请输入验证码",
        wait: 60,
        active: "",
        isShow: false,
        messageCode: "",
        success: "",
        successMgs: "操作失败"
      }
    },
    mounted() {
      let getUserInfo;
      if (this.getUserInfo) {
        getUserInfo = JSON.parse(this.getUserInfo).userName;
      }
      this.getUser = getUserInfo;
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {},
    created() {

    },
    methods: {
      sendToParent() {
        this.$emit("listenToChildEvent", false);
        this.verification = false;
        this.mobile = false;
        this.newMobile = "";
        this.messageCode = "";
      },
      handleCodeFocus() {
        this.currentPassword = false;
        this.aginNewPassword = false;
        this.newPassword = false;
      },
      newhandleCodeFocus() {
        this.newPassword = false;
      },
      aginhandleCodeFocus() {
        this.aginNewPassword = false;
      },
      confirm() {
        if (!this.newMobile) {
          this.mobile = true;
          return;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.newMobile.trim()))) {
          this.mobile = true;
          this.newMobErrorTip = "请输入正确的手机号";
        } else {
          this.mobile = false;
        }
        if (!this.messageCode) {
          this.verification = true;
          return;
        } else {
          this.verification = false;
        }
        this.isOnlyMobile();
      },
      isOnlyMobile() {
        axios({//判断用户是手机号是否注册过
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/isOnlymobile",
          async: true,
          data: {
            mobile: this.newMobile.trim()
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            //成功后获取短信验证码
            this.isJustCode();
          } else {
            this.verification = true;
            this.mesErrorTip = res.data.msg
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getWait() {
        if (this.wait == 0) {
          this.wait = 60;
          this.mesCode = "短信验证码";
          this.active = false;
        } else {
          this.wait--;
          this.mesCode = this.wait + "s重新发送";
          this.active = true;
          setTimeout(() => {
            this.getWait()
          }, 1000);
        }
      },
      getCode() {//获取短信验证码
        if (!this.newMobile) {
          this.mobile = true;
          this.newMobErrorTip = "请输入新手机号";
          return;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.newMobile))) {
          this.mobile = true;
          this.newMobErrorTip = "请输入正确的手机号";
        } else {
          this.mobile = false;
        }
        if (this.wait == 60) {
          axios({//判断用户是手机号是否注册过
            headers: {"Content-Type": "application/json"},
            method: "post",
            url: "/userInformation/isOnlymobile",
            async: true,
            data: {
              mobile: this.newMobile.trim()
            },
            contentType: 'application/json'
          }).then(res => {
            if (res.data.code == "200") {
              this.verification = false;
              //成功后获取短信验证码
              this.getCodeVert();
            } else {
              this.verification = true;
              this.mesErrorTip = res.data.msg;
              return;
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      getCodeVert() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/code/getModPhoneCode",
          async: true,
          data: {
            mobile: this.newMobile.trim()
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == 200) {
            this.getWait();
            this.mesErrorTip = false;
            return;
          } else {
            this.verification = true;
            this.mesErrorTip = res.data.msg;
            return;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      isJustCode() {//是否正确的验证码
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/code/code",
          async: true,
          data: {
            actionName: "modifyMobile",
            mobile: this.newMobile.trim(),
            checkCode: this.messageCode.trim(),
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            this.verification = false;
            axios({
              headers: {"Content-Type": "application/json"},
              method: "post",
              url: "/userInformation/modifyPhone",
              async: true,
              data: {
                mobile: this.newMobile.trim(),
                checkCode: this.messageCode.trim(),
                userName: this.getUser
              },
              contentType: 'application/json'
            }).then(res => {
              if (res.data.code == "200") {
                this.success = true;
                this.successMgs = res.data.msg;
                setTimeout(() => {
                  this.success = false;
                  this.$emit("listenToChildEvent", false);
                }, 3000);
              } else {
                this.verification = true;
                this.mesErrorTip = res.data.msg;
                return;
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.verification = true;
            this.mesErrorTip = res.data.msg.msg;
            return;
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
<style scoped>
  @import "../../assets/css/dialog.css";
  @import "../../assets/css/main.css";
</style>
