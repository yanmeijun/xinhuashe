<template>
  <div class="earlyWarning">
    <div  v-if="earlyWarningVisible">
      <div class="dialog-container add-catalog-dialog">
        <div class="dialog-inner dialog-earlyWarn">
          <header class="dialog-header">
            <div class="dialog-header-tit flt">选择预警方式</div>
            <div class="icon3 dialog-header-close frt" @click="sendToParentMail"></div>
          </header>
          <div class="dialog-body">
            <div class="sy-publish-dialog-content">
              <dl class="rm-advanced-search-dl clearfix">
                <dt class="rm-advanced-search-dt">预警方式</dt>
                <dd class="rm-advanced-search-dd">
                  <div class="dialog-downMenu" @click = "warningMenu" @click.stop>
                    <span class="defaul_option">{{warningMethod}}</span>
                    <i class="icon4 icon-downMenu"></i>
                    <div class="downMenuShow" v-if = "warningInfo" style="padding: 0">
                      <ul >
                        <li @click = "warningEmail"><a href="#">邮箱</a></li>
                        <!--<li><a href="#">微信</a></li>-->
                        <!--<li><a href="#">短信</a></li>-->
                        <!--<li><a href="#">钉钉</a></li>-->
                      </ul>
                    </div>
                  </div>
                  <div class="error-tips-box" v-if = "warningError">请选择预警方式</div>
                </dd>
              </dl>
            </div>
          </div>
          <footer class="dialog-footer">
            <ul class="btn-list">
              <li class="btn-item btn-item-acvite" @click = "waringBind">确&nbsp;&nbsp;定</li>
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
      {{successContent}}
    </div>
  </div>

</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
  var codes;
  export default{
    name:'mailboxBind',
    props:["earlyWarningVisible"],
    data(){
      return {
        error:false,
        errorMgs:"操作失败",
        success:false,
        warningError:false,
        warningMethod:"邮箱",
        warningInfo:false,
        successContent:"操作成功"
      }
    },
    created:function(){

    },
    mounted(){
      window.addEventListener('click', this.handleSelectCon);
    },
    beforeUpdate:function(){

    },
    updated:function(){

    },
    computed: {
      ...mapGetters(['getUserInfo']),

    },
    components: {
    },
    methods:{
      handleSelectCon(){
        this.warningInfo = false;
      },
      sendToParentMail(){
        this.$emit("listenToEarlyWarningEvent",false);
//        this.errorInfo = false;
//        this.emailError = false;
//        this.warningMethod = "请选择预警方式";
//        this.warningError = false;
      },
      waringBind(){
        if(this.warningMethod == "请选择预警方式"){
             this.warningError = true;
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
          url:"/user/earlyWarning",
          async:true,
          data: {
            userName:getUserInfo,
            warning:"1"
          },
          contentType: 'application/json'
        }).then(res => {
          if(res.data.code == "200"){
            this.$emit("listenToEarlyWarningEvent",false);
            this.successContent = res.data.msg;
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
      warningMenu(){
        this.warningError = false;
        this.warningInfo = this.warningInfo == false ? this.warningInfo = true :this.warningInfo = false;
      },
      warningEmail(){
         this.warningMethod = "邮箱"
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
