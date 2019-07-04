<template>
  <div class="modifytmpMonitor" v-if="isShowModifyPage">
    <div class="dialog-container add-catalog-dialog">
      <div class="dialog-inner dialog-sourceMon">
        <header class="dialog-header">
          <div class="dialog-header-tit flt">修改服务模板监控</div>
          <div class="icon3 dialog-header-close frt" @click="sendToParent()"></div>
        </header>
        <div class="dialog-body">
          <div class="sy-publish-dialog-content">
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控名</dt>
              <dd class="rm-advanced-search-dd">
                <input class="rm-advanced-search-inp" type="text" placeholder="" v-model="templateName" readonly>
                <div class="error-tips-box" style="display: none">监控名不能为空</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">服务模板ID</dt>
              <dd class="rm-advanced-search-dd">
                <input class="rm-advanced-search-inp" type="text" placeholder="Certifications" v-model="templateID" readonly>
                <div class="error-tips-box" style="display: none;">服务模板ID不能为空</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控频率</dt>
              <dd class="rm-advanced-search-dd">
                <div class="clearfix">
                  <div class="dialog-downMenu flt" @click="monitorFreqShow()" @click.stop>
                    <span class="defaul_option">{{monitorFreqText}}</span>
                    <i class="icon4 icon-downMenu"></i>
                    <div v-if="isMonitorFreq" class="downMenuShow">
                      <ul @click="chooseMonitorFreq($event)" @click.stop>
                        <li value="2">2小时/次</li>
                        <li value="4">4小时/次</li>
                        <li value="6">6小时/次</li>
                        <li value="8">8小时/次</li>
                        <li value="12">12小时/次</li>
                        <li vaule="24">24小时/次</li>
                      </ul>
                    </div>
                  </div>
                  <!--<span class="noteBlue frt">注：监控频率次日0点生效</span>-->
                </div>
                <div class="error-tips-box" style="display: none;">请选择监控频率</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">报警频率</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click="alarmFreqShow()"  @click.stop>
                  <span class="defaul_option">{{alarmFreqText}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div v-if="isAlarmFreq" class="downMenuShow">
                    <ul @click="chooseAlarmFreq($event)" @click.stop>
                      <li value="1">实时预警</li>
                    </ul>
                  </div>
                </div>
                <div class="error-tips-box" style="display: none;">请选择报警频率</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控类别</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click="showType()"  @click.stop>
                  <span class="defaul_option">{{typeText}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="downMenuShow" v-if="isType">
                    <ul @click="chooseType($event)" @click.stop>
                      <!--<li>网站页面不可访问</li>-->
                      <!--<li>API可用</li>-->
                      <li value="1">接口无法调用</li>
                    </ul>
                  </div>
                </div>
                <div class="error-tips-box" style="display: none;">请选择监控类别</div>
              </dd>
            </dl>
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item" @click="sendToParent()">取&nbsp;&nbsp;消</li>
            <li class="btn-item" @click="resetAll()">重&nbsp;&nbsp;置</li>
            <li class="btn-item saveMenu">
              <a href="javascript:;" class="save"><span @click="submit()">{{saveText}}</span><span class="line frt"></span><i class="icon header-user-icon" @click="showStart()" @click.stop></i></a>
              <a v-if="isShowStart" href="javascript:;" class="saveEnable" @click="chooseStart($event)">{{startText}}</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
      <div class="mask"></div>
      <div class="failedBox" v-if="error">
        <i class="icon4 icon-failed"></i>
        {{errorMgs}}
      </div>
    <!--操作成功-->
    <div class="failedBox successBox" v-if="submitOK">
      <i class="icon4 icon-success"></i>
      操作成功
    </div>
  </div>

</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
  export default{
    name:'modifytmpMonitor',
    props:["isShowModifyPage","modifyTmpMonitorID"],
    data(){
      return {
        initData:"",
        userInfoDomain:"",//获取到用户信息
        error:false,
        errorMgs:"操作失败",
        templateName:"",
        templateID:"",
        monitorFreq:"",//监控频率(时间间隔)
        alarmFreq:"",//报警频率(时间间隔，单位为分钟)
        type:"",
        monitorFreqText:"",
        alarmFreqText:"",
        saveText: "保  存",
        startText: "保存并启用",
        isStart: false,
        isShowStart: false,
        typeText:"接口无法调用",
        isType:false,
        isAlarmFreq:false,
        isMonitorFreq:false,
        submitOK:false
      }
    },
    created:function(){

    },
    mounted(){
      let domain;
      if(this.getUserInfo){
        if(typeof this.getUserInfo == 'string'){
          domain = JSON.parse(this.getUserInfo);
        }else{
          domain = this.getUserInfo;
        }
      };
      this.userInfoDomain = domain;//得到用户信息 domain userID
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
      sendToParent() {
        this.$emit("listenToModifyChildEvent", false);
      },
      getData(){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/tmpMonitor/getModifyTmpMonitorID",
          async: true,
          data: {templateID: this.modifyTmpMonitorID},
          contentType: 'application/json'
        }).then(res=> {
          if(res.data.msg == "success"){
            if(res.data.dataUser.dataCount > 0){
              const data = res.data.dataUser.dataList[0];
              this.initData = data;
              this.templateName= data.templateName;
              this.templateID= data.templateID;
              this.monitorFreq= data.monitorFreq;
              this.alarmFreq= data.alarmFreq;
              this.type= data.type;
              this.monitorFreqText = data.monitorFreq + "小时";
              this.alarmFreqText = data.alarmFreq==1?"实时预警":"";
            }
          }else{
            alert("查询失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      resetAll(){
        const data = this.initData;
        this.templateName= data.templateName;
        this.templateID= data.templateID;
        this.monitorFreq= data.monitorFreq;
        this.alarmFreq= data.alarmFreq;
        this.type= data.type;
        this.monitorFreqText = data.monitorFreq + "小时";
        this.alarmFreqText = data.alarmFreq==1?"实时预警":"";
        this.isStart = false;
        this.isMonitorFreq = false;
        this.isAlarmFreq = false;
        this.isType = false;
        this.typeText = "接口无法调用";
        this.isShowStart = false;
        this.saveText = "保  存";
        this.startText = "保存并启用";
        this.error = false;
        this.submitOK = false;
      },
      showStart(){
        this.isShowStart ? this.isShowStart = false : this.isShowStart = true
      },
      chooseStart(e){
        this.isStart == true?this.isStart = false:this.isStart = true;
        this.startText = this.saveText;
        this.saveText = e.target.innerText;
        this.isShowStart = false;
      },
      submit(){
        this.isMonitorFreq = false;
        this.isType = false;
        this.isAlarmFreq = false;
        let data = {
          domain: this.userInfoDomain.domain,
          userID: this.userInfoDomain.userID,
          templateID: this.templateID,
          templateName: this.templateName,
          monitorFreq: this.monitorFreq,
          alarmFreq: this.alarmFreq,
          type: this.type,
          isStart: this.isStart
        };
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/tmpMonitor/modifyTmpMonitorID",
          async: true,
          data: data,
          contentType: 'application/json'
        }).then(res=> {
          if(res.data.msg == "success"){
            this.submitOK = true;
            setTimeout(() => {
              this.submitOK = false;
              this.$emit("listenToModifyChildEvent");
              this.$emit("listenToModifySuccess");
            }, 1500);
          }else{
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 1500);
          }
        }).catch(err=> {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 1500);
        })
      },
      showType(){
        this.isType = this.isType==false ? this.isType = true :this.isType = false;
      },
      chooseType(e){
        this.type = e.target.value;
        this.typeText = e.target.innerText;
        this.isType = false;
      },
      alarmFreqShow(){
        this.isAlarmFreq ? this.isAlarmFreq = false : this.isAlarmFreq = true
      },
      chooseAlarmFreq(e){
        this.alarmFreq = e.target.value;
        this.alarmFreqText = e.target.innerText;
        this.isAlarmFreq = false;
      },
      monitorFreqShow(){
        this.isMonitorFreq ? this.isMonitorFreq = false : this.isMonitorFreq = true
      },
      chooseMonitorFreq(e){
        this.monitorFreq = e.target.value;
        this.monitorFreqText = e.target.innerText;
        this.isMonitorFreq = false;
      },
      /*点击其他触发下拉框消失*/
      handleSelectCon(){
        this.isShowStart = false;
        this.isType = false;
        this.isMonitorFreq = false;
        this.isAlarmFreq = false;
      }
    },
    watch:{
      isShowModifyPage:{
        handler(){
          this.getData();
          this.saveText = "保  存";
          this.startText =  "保存并启用";
          this.isMonitorFreq = false;
          this.isAlarmFreq = false;
          this.isType = false;
          this.isShowStart = false;
        }
      }
    }
  }
</script>
<style scoped="">
  .downMenuShow ul li{
    padding-left: 15px;
  }
</style>
