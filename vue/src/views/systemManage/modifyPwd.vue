<template>
  <div>
    <div v-if="modifyPwdShow">
      <div class="dialog-container add-catalog-dialog">
        <div class="dialog-inner dialog-changePwd">
          <header class="dialog-header">
            <div class="dialog-header-tit fl">修改密码</div>
            <div class="icon3 dialog-header-close frt" @click="modifyPwdClose"></div>
          </header>
          <div class="dialog-body">
            <div class="sy-publish-dialog-content">
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">用户名：</dt>
                <dd class="rm-advanced-search-dd">
                  <span class="userName">{{userName}}</span>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">密码：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" placeholder="请输入密码"
                         autocomplete="off" v-model="rules.password.value" @blur="inputBlur('password')">
                  <div class="error-tips-box">{{rules.password.errorTip}}</div>
                </dd>
              </dl>
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">确认密码：</dt>
                <dd class="rm-advanced-search-dd">
                  <input class="rm-advanced-search-inp" type="password" placeholder="请输入确认密码"
                         autocomplete="off" v-model="rules.confirmPass.value" @blur="inputBlur('confirmPass')">
                  <div class="error-tips-box">{{rules.confirmPass.errorTip}}</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite" @click="confirm()">确&nbsp;&nbsp;定</li>
              <li class="btn-item" @click="modifyPwdClose">取&nbsp;&nbsp;消</li>
            </ul>
          </footer>
        </div>
      </div>
      <div class="mask"></div>
    </div>
    <MaskTip v-bind:tips="tips"
             v-bind:tipsContent="tipsContent"
             v-bind:ifSuccess="ifSuccess">
    </MaskTip>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import MaskTip from '@/views/module/mask';
  import {getmd5} from '@/config/util';
  export default{
    props: ["modifyPwdShow", "userName"],
    data(){
      return {
        rules: {
          password: {required: true, value: '', errorTip: ''},
          confirmPass: {required: true, value: '', errorTip: ''}
        },
        tipsContent: '',
        ifSuccess: true,
        tips: false,
      }
    },
    mounted(){
    },
    computed: {},
    components: {MaskTip},
    created(){

    },
    methods: {
      modifyPwdClose(){
        this.rules.password.value = '';
        this.rules.password.errorTip = '';
        this.rules.confirmPass.value = '';
        this.rules.confirmPass.errorTip = '';
        this.$emit("listenToChildEvent", false);
      },
      inputBlur(inputName){
        if (inputName == "password") {
          const passReg =/(?!^(\d+|[a-zA-Z]+|[~!@#$-%^,+_，.&*?]+)$)^[\w~!@#$-%^,+_，.&*?]{6,16}$/;
          if (!this.rules.password.value.trim()) {
            this.rules.password.errorTip = "密码不能为空";
            return;
          }
          if (this.rules.password.value.trim().length < 6 || this.rules.password.value.trim().length > 16) {
            this.rules.password.errorTip = "密码长度6-16位";
          } else if(!passReg.exec(this.rules.password.value.trim())){
            this.rules.password.errorTip = "密码长度6-16位，数字/字母/特殊字符至少包含2种。";
          }else {
            this.rules.password.errorTip = "";
          }
        }
        if (inputName == "confirmPass") {
          if (!this.rules.confirmPass.value.trim()) {
            this.rules.confirmPass.errorTip = "确认密码不能为空";
            return;
          }
          if (this.rules.confirmPass.value.trim() != this.rules.password.value.trim()) {
            this.rules.confirmPass.errorTip = "两次密码输入不一致";
          } else {
            this.rules.confirmPass.errorTip = "";
          }
        }
      },
      confirm(){
        this.inputBlur("password");
        this.inputBlur("confirmPass");
        if (this.rules.password.errorTip || this.rules.confirmPass.errorTip) {
          return;
        }
        const data = {
          password: getmd5(this.rules.password.value)
        };
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/user/modifyUser",
          async: true,
          data: {
            query: {userName: this.userName},
            modify: data
          },
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 200) {
            this.modifyPwdClose();
            this.tips = true;
            this.tipsContent = "密码修改成功！该用户再次登录时旧密码失效，需要使用新密码进行登录。";
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
            }, 3000)
          } else {
            this.tips = true;
            this.tipsContent = "密码修改失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }
        }).catch(err=> {
          console.log(err)
        })
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
