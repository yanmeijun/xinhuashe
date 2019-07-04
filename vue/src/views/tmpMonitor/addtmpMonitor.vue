<template>
  <div v-if="isShowAddPage">
    <div class="dialog-container add-catalog-dialog">
      <div class="dialog-inner dialog-sourceMon">
        <header class="dialog-header">
          <div class="dialog-header-tit flt">新增服务模板监控</div>
          <div class="icon3 dialog-header-close frt" @click = "sendToParent"></div>
        </header>
        <div class="dialog-body">
          <div class="sy-publish-dialog-content">
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控名</dt>
              <dd class="rm-advanced-search-dd">
                <div class="clearfix">
                  <div class="dialog-downMenu flt" @click="MonitorName()" @click.stop>
                    <span class="defaul_option">{{fuzzyName}}</span>
                    <i class="icon4 icon-downMenu"></i>
                    <div class="downMenuShow" v-if="showMonitorName" @click.stop>
                      <input class="rm-advanced-search-inp" type="text" placeholder="" style="width: 246px;" v-model="nameQuery">
                      <ul style="max-height: 174px;overflow-y: auto;">
                        <li v-for="(item,index) in fuzzyQuery" :key="index" @click = "selectCon(item.templateID,$event)"><a href="javascript:void(0)" class="tmpNameUser">{{item.templateName}}</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="error-tips-box" v-if="fuzzyNameTip">{{fuzzyNameErr}}</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">服务模板ID</dt>
              <dd class="rm-advanced-search-dd">
                <input class="rm-advanced-search-inp" type="text" placeholder="请输入监控Certifications" v-model="monitorID" readonly style="color:#a2a1a1">
                <div class="error-tips-box" v-if="showMonitorID">{{monitorIDCon}}</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控频率</dt>
              <dd class="rm-advanced-search-dd">
                <div class="clearfix">
                  <div class="dialog-downMenu flt" @click = "showMonitorTime" @click.stop>
                    <span class="defaul_option">{{showMonitorListCon}}</span>
                    <i class="icon4 icon-downMenu"></i>
                    <div class="downMenuShow" v-if="monitorTime">
                      <ul @click.stop  @click = "showMonitorList($event)">
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
                <div class="error-tips-box" v-if="monitorTimeTip">请选择监控频率</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">报警频率</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click = "showCallPolice()" @click.stop>
                  <span class="defaul_option">{{callPoliceCon}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="downMenuShow" v-if="callPolice">
                    <ul @click = "showCallPoliceCon($event)" @click.stop>
                      <li value="1">实时预警</li>
                    </ul>
                  </div>
                </div>
                <div class="error-tips-box" v-if="callPoliceTip">请选择报警频率</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控类别</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click = "showMonitoringCategory" @click.stop>
                  <span class="defaul_option">{{showCategoryCon}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="downMenuShow" v-if="monitoringCategory">
                    <ul @click = "showCategory($event)" @click.stop>
                      <!--<li><a href="javascript:void(0)">网站页面不可访问</a></li>-->
                      <!--<li><a href="javascript:void(0)">API可用</a></li>-->
                      <li value="1">接口无法调用</li>
                    </ul>
                  </div>
                </div>
                <div class="error-tips-box" v-if="categoryTip">请选择监控类别</div>
              </dd>
            </dl>
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item" @click = "sendToParent">取&nbsp;&nbsp;消</li>
            <li class="btn-item" @click="reset()">重&nbsp;&nbsp;置</li>
            <li class="btn-item saveMenu">
              <a href="javascript:void(0)" class="save" @click = "save()">{{saveText}}<span class="line frt"></span><i class="icon header-user-icon" @click="showStart()" @click.stop></i></a>
              <a v-if="isShowStart" href="javascript:;" class="saveEnable" @click="chooseStart($event)">{{startText}}</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
    <div class="mask"></div>
    <!--操作失败-->
    <div class="failedBox" v-if="error">
      <i class="icon4 icon-failed"></i>
      操作失败{{errorTip}}
    </div>
    <!--操作成功-->
    <div class="failedBox successBox" v-if="success">
      <i class="icon4 icon-success"></i>
      {{successTip}}
    </div>
    <!--退出-->
    <div class="failedBox successBox" style="display: none;">
      <i class="icon4 icon-success"></i>
      已退出
    </div>
  </div>
</template>
<style scoped>
  .downMenuShow ul li {
    line-height: 35px;
    cursor: pointer;
    color: #333;
    font-size: 14px;
    /*margin-left: 10px;*/
    padding-left: 15px;
  }
  .downMenuShow ul li:hover{
    background: #F6F6F6;
    color: #15A1EF;
  }
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
  .tmpNameUser{
    white-space: nowrap;
    overflow: hidden;
  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';
  export default{
    props:["isShowAddPage"],
    data(){
      return {
        showMonitorName:"",//监控列表
        userInfoDomain:"",//获取到用户信息
        templateMonitorList:"",//获取监控名列表
        nameQuery:"",
        fuzzyName:"请选择",
        monitorID:"",
        fuzzyNameTip:false,
        monitorTime:false,//监测频率
        showMonitorListCon:"请选择",
        monitorTimeTip:false,
        callPolice:false,//报警频率
        callPoliceCon:"请选择",
        callPoliceTip:false,
        alarmFreq:"",
        monitoringCategory:false,
        showCategoryCon:"请选择",
        categoryTip:false,
        monitorFreq:"",//监控频率
        isShowStart:false,//保存并启用按钮
        errorTip:"操作失败",
        error:false,
        saveText: "保  存",
        startText: "保存并启用",
        type:"",//接口无法调用
        fuzzyNameErr:"监控名不能为空",
        successTip:"操作成功",
        success:false,
        monitorIDCon:"服务模板ID不能为空",
        showMonitorID:false
      }
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
      this.getTemplate();//获取所以的监测名
      window.addEventListener('click', this.handleSelectCon);
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      /*
      * 匹配输入，生成匹配字段
      */
      fuzzyQuery(){
        var _this = this;
        var Newitems = [];
        if(_this.templateMonitorList){
          _this.templateMonitorList.map(function(item) {
            if (
              item.templateName.search(_this.nameQuery) != -1
            ) {
              Newitems.push(item);
            }
          });
          return Newitems;
        }

      }
    },
    methods:{
      sendToParent(){
        this.$emit("listenToAddChildEvent");
        this.monitoringCategory = false;
        this.showCategoryCon = "请选择";
        this.callPoliceCon = "请选择";
        this.callPolice = false;
        this.showMonitorListCon = "请选择";
        this.monitorTime = false;
        this.CategoryCon = false;
        this.callPoliceTip = false;
        this.monitorTimeTip = false;
        this.showMonitorName = false;
        this.fuzzyNameTip = false;
        this.showMonitorID = false;
        this.fuzzyName = "请选择";
        this.monitorID = "请输入监控Certifications";
        this.nameQuery = ""
      },
      /*
      *选择监控列表
      */
      MonitorName(){
        this.showMonitorName = this.showMonitorName == false ? this.showMonitorName = true :this.showMonitorName = false;
      },
      selectCon(userID,e){
        this.fuzzyName = e.target.innerText;
        this.showMonitorName = false;
        this.monitorID = userID;
        this.fuzzyNameTip = false;
        this.showMonitorID = false;
      },
      /*
      *查找所有的模板信息
      */
      getTemplate(){
        axios({
          headers:{"Content-Type":"application/json"},
          method:"post",
          url:"/tmpMonitor/lookupTemplate",
          async:true,
          data: {
            domain:this.userInfoDomain.domain,
            status:"1"
          },
          contentType: 'application/json'
        }).then(res => {
          if(res.data.code == "200"){
            this.templateMonitorList = res.data.dataUser;
          }else{
            this.error = true;
            this.errorTip = res.data.msg;
            setTimeout(() => {
              this.error = false;
            }, 3000);
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      showMonitorTime(){
         this.monitorTime = this.monitorTime==false ? this.monitorTime = true :this.monitorTime = false;
      },
      showMonitorList(e){
           this.showMonitorListCon = e.target.innerText;
           this.monitorFreq = e.target.value;
           this.monitorTime = false;
           this.monitorTimeTip = false;
      },
      showCallPolice(){
          this.callPolice = this.callPolice==false ? this.callPolice = true : this.callPolice = false;
      },
      showCallPoliceCon(e){
         this.callPoliceCon = e.target.innerText;
         this.alarmFreq = e.target.value;
         this.callPolice = false;
         this.callPoliceTip = false;
      },
      showMonitoringCategory(){
        this.monitoringCategory = this.monitoringCategory==false ? this.monitoringCategory = true : this.monitoringCategory = false;
      },
      showCategory(e){
        this.monitoringCategory = false;
        this.type = e.target.value;
        this.showCategoryCon = e.target.innerText;
        this.categoryTip = false;
      },
      reset(){
        this.monitoringCategory = false;
        this.showCategoryCon = "请选择";
        this.callPoliceCon = "请选择";
        this.callPolice = false;
        this.showMonitorListCon = "请选择";
        this.monitorTime = false;
        this.CategoryCon = false;
        this.callPoliceTip = false;
        this.monitorTimeTip = false;
        this.fuzzyName = "请选择";
        this.monitorID = "请输入监控Certifications";
        this.fuzzyNameTip = false;
        this.nameQuery = ""
        this.showMonitorID = false;
      },
      save(){
        this.showMonitorName = false;
        this.monitorTime = false;
        this.monitoringCategory = false;
        this.callPolice = false;
        if(this.fuzzyName == "请选择" || !this.fuzzyName){
           this.fuzzyNameTip = true;
           this.fuzzyNameErr = "监控名不能为空";
           return;
        };
        if(this.showMonitorListCon == "请选择" || !this.showMonitorListCon){
          this.monitorTimeTip = true;
          return;
        };
        if(this.callPoliceCon == "请选择" || !this.callPoliceCon){
          this.callPoliceTip = true;
          return;
        };
        if(this.showCategoryCon == "请选择" || !this.showCategoryCon){
          this.categoryTip = true;
          return;
        };
        this.callPoliceTip = false;
        this.monitorTimeTip = false;
        this.fuzzyNameTip = false;
        this.categoryTip = false;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/tmpMonitor/addTmpMonitor",
          async: true,
          data: {
            domain:this.userInfoDomain.domain,
            userID:this.userInfoDomain.userID,
            templateID:this.monitorID,//模板ID（主key，全表唯一）
            templateName:this.fuzzyName,//模板名称
            isStart:this.isStart,//是否启用
            alarmFreq:this.alarmFreq,//报警频率
            monitorFreq:this.monitorFreq,//监控频率(时间间隔)
            type:this.type//接口无法调用
          },
          contentType: 'application/json'
        }).then(res=> {
          if(res.data.msg == "exist"){
            if(res.data.results.name){
              this.fuzzyNameTip = true;
              this.fuzzyNameErr = "该监控名已存在";
            };
            if(res.data.results.tempID){
              this.showMonitorID = true;
              this.monitorIDCon = "服务模板ID已存在";
            }
          }else if(res.data.code == "200"){
            this.success = true;
            this.successTip = res.data.msg;
            setTimeout(() => {
              this.success = false;
              this.reset();
              this.$emit("listenToAddChildEvent");
              this.$emit("listenToAddSuccess");
            }, 1500);
          }
        }).catch(err=> {
          console.log(err)

        })
      },
      /*
      *保存并启用按钮
      */
      showStart(){
        this.isShowStart ? this.isShowStart = false : this.isShowStart = true
      },
      chooseStart(e){
        this.isStart == true?this.isStart = false:this.isStart = true;
        this.startText = this.saveText;
        this.saveText = e.target.innerText;
        this.isShowStart = false;
      },
      /*点击其他触发下拉框消失*/
      handleSelectCon(){
        this.isShowStart = false;
        this.showMonitorName = false;
        this.monitoringCategory = false;
        this.monitorTime = false;
        this.callPolice = false;
      }
    },
    watch:{
      isShowAddPage:{
        handler(){
          this.saveText = "保  存";
          this.startText =  "保存并启用";
          this.isShowStart = false;
        }
      }
    }
  }
</script>
