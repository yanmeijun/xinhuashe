<template>
  <div v-if="isShowAddPage">
    <div class="dialog-container add-catalog-dialog">
      <div class="dialog-inner dialog-sourceMon">
        <header class="dialog-header">
          <div class="dialog-header-tit flt">新增源端监控</div>
          <div class="icon3 dialog-header-close frt" @click="sendToParent()"></div>
        </header>
        <div class="dialog-body">
          <div class="sy-publish-dialog-content">
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控名</dt>
              <dd class="rm-advanced-search-dd">
                <input v-model="originName" class="rm-advanced-search-inp" type="text"
                       placeholder="请输入监控名如：中国高等教育学历证书查询" @blur="checkOnlyOne('name')">
                <div v-if="ifNameEmpty" class="error-tips-box">{{nameErr}}</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控地址</dt>
              <dd class="rm-advanced-search-dd">
                <input v-model="originUrl" class="rm-advanced-search-inp" type="url"
                       placeholder="请输入网址域名如：http://www.chsi.com.cn/xlcx/lscx/query.do" @blur="checkOnlyOne('url')">
                <div v-if="ifUrlEmpty" class="error-tips-box">{{urlErr}}</div>
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
                        <li value="8">8小时</li>
                        <li value="12">12小时</li>
                        <li value="24">24小时</li>
                      </ul>
                    </div>
                  </div>
                  <!--<span class="noteBlue frt">注：监控频率次日0点生效</span>-->
                </div>
                <div v-if="ifMFreqEmpty" class="error-tips-box">请选择监控频率</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">报警频率</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click="alarmFreqShow()" @click.stop>
                  <span class="defaul_option">{{alarmFreqText}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div v-if="isAlarmFreq" class="downMenuShow">
                    <ul @click="chooseAlarmFreq($event)" @click.stop>
                      <li value="1">实时预警</li>
                    </ul>
                  </div>
                </div>
                <div v-if="ifAFreqEmpty" class="error-tips-box">请选择报警频率</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">监控类别</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click="typeShow()" @click.stop>
                  <span class="defaul_option">{{typeText}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div v-if="isType" class="downMenuShow">
                    <ul @click="chooseType($event)" @click.stop>
                      <li value="1">网站页面不可访问</li>
                    </ul>
                  </div>
                </div>
                <div v-if="ifTypeEmpty" class="error-tips-box">请选择监控类别</div>
              </dd>
            </dl>
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item" @click="sendToParent()">取&nbsp;&nbsp;消</li>
            <li class="btn-item" @click="resetAll()">重&nbsp;&nbsp;置</li>
            <li class="btn-item saveMenu">
              <a href="javascript:;" class="save"><span @click="submit()">{{saveText}}</span><span
                class="line frt"></span><i class="icon header-user-icon" @click="showStart()" @click.stop></i></a>
              <a v-if="isShowStart" href="javascript:;" class="saveEnable"
                 @click="chooseStart($event)">{{startText}}</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
    <div class="mask"></div>
    <!--操作失败-->
    <div class="failedBox" v-if="submitErr">
      <i class="icon4 icon-failed"></i>
      操作失败
    </div>
    <!--操作成功-->
    <div class="failedBox successBox" v-if="submitOK">
      <i class="icon4 icon-success"></i>
      操作成功
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

  .downMenuShow ul li:hover {
    background: #F6F6F6;
    color: #15A1EF;
  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  export default{
    props: ["isShowAddPage", "domain", "userID"],
    data(){
      return {
        originName: "",
        originUrl: "",
        monitorFreq: "",
        alarmFreq: "",
        type: "",
        isStart: false,
        isMonitorFreq: false,
        monitorFreqText: "请选择",
        isAlarmFreq: false,
        alarmFreqText: "请选择",
        isType: false,
        typeText: "请选择",
        isShowStart: false,
        saveText: "保  存",
        startText: "保存并启用",
        ifNameEmpty: false,
        ifUrlEmpty: false,
        ifMFreqEmpty: false,
        ifAFreqEmpty: false,
        ifTypeEmpty: false,
        nameErr: "监控名不能为空",
        urlErr: "监控地址不能为空",
        submitErr: false,
        submitOK: false
      }
    },
    methods: {
      sendToParent(){
        this.resetAll();
        this.$emit("listenToAddChildEvent");
      },
      monitorFreqShow(){
        this.isMonitorFreq ? this.isMonitorFreq = false : this.isMonitorFreq = true
      },
      chooseMonitorFreq(e){
        this.monitorFreq = e.target.value;
        this.monitorFreqText = e.target.innerText;
        this.isMonitorFreq = false;
        this.ifMFreqEmpty = false;
      },
      alarmFreqShow(){
        this.isAlarmFreq ? this.isAlarmFreq = false : this.isAlarmFreq = true
      },
      chooseAlarmFreq(e){
        this.alarmFreq = e.target.value;
        this.alarmFreqText = e.target.innerText;
        this.isAlarmFreq = false;
        this.ifAFreqEmpty = false;
      },
      typeShow(){
        this.isType ? this.isType = false : this.isType = true
      },
      chooseType(e){
        this.type = e.target.value;
        this.typeText = e.target.innerText;
        this.isType = false;
        this.ifTypeEmpty = false;
      },
      showStart(){
        this.isShowStart ? this.isShowStart = false : this.isShowStart = true
      },
      chooseStart(e){
        this.isStart == true ? this.isStart = false : this.isStart = true;
        this.startText = this.saveText;
        this.saveText = e.target.innerText;
        this.isShowStart = false;
      },
      checkOnlyOne(action){
        let query;
        if (action == "name") {
          if (!this.originName.trim()) {
            this.ifNameEmpty = false;
            return;
          }
          let symbol =  /^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/;
          if(!isNaN(this.originName.trim().slice(0, 1)) || symbol.test(this.originName.trim().slice(0, 1))){
            this.ifNameEmpty = true;
            this.nameErr = "请输入：字符类型（首字母非数字，特殊字符）";
            return;
          }
          if(this.originName.trim().length > 80){
            this.ifNameEmpty = true;
            this.nameErr = "请输入少于80个字符的监控名称";
            return;
          }
          query = {
            domain: this.domain,
            originName: this.originName.trim()
          }
        } else {
          if (!this.originUrl.trim()) {
            this.ifUrlEmpty = false;
            return;
          }
          let RegUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
//          let RegUrl = new RegExp();
//          RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
          if (!RegUrl.test(this.originUrl)) {
            this.ifUrlEmpty = true;
            this.urlErr = "请输入正确的URL网址";
            return;
          }
          query = {
            domain: this.domain,
            originUrl: this.originUrl.trim()
          }
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/origin/checkOnlyOne",
          async: true,
          data: query,
          contentType: 'application/json'
        }).then(res=> {
//          if (res.data.code == 401) {
//            window.location.href = "/"
//          } else {
            if (res.data.msg == "success") {
              if (res.data.results.dataCount > 0) {
                if (action == "name") {
                  this.ifNameEmpty = true;
                  this.nameErr = "该监控名已存在";
                } else {
                  this.ifUrlEmpty = true;
                  this.urlErr = "该监控地址已存在";
                }
              } else {
                action == "name" ? this.ifNameEmpty = false : this.ifUrlEmpty = false
              }
            } else {
              alert("查询失败")
            }
//          }
        }).catch(err=> {
          console.log(err)
        })
      },
      submit(){
        if (!this.domain || !this.userID) {
          alert("用户未登录！")
          return;
        } else if (this.ifNameEmpty || this.ifUrlEmpty) {
          return;
        } else if (!this.originName.trim()) {
          this.ifNameEmpty = true;
          this.nameErr = "监控名不能为空";
          return;
        } else if (!this.originUrl.trim()) {
          this.ifUrlEmpty = true;
          this.urlErr = "监控地址不能为空";
          return;
        } else if (!this.monitorFreq) {
          this.ifMFreqEmpty = true;
          return;
        } else if (!this.alarmFreq) {
          this.ifAFreqEmpty = true;
          return;
        } else if (!this.type) {
          this.ifTypeEmpty = true;
          return;
        }
        let data = {
          domain: this.domain,
          userID: this.userID,
          originName: this.originName.trim(),
          originUrl: this.originUrl.trim(),
          monitorFreq: this.monitorFreq,
          alarmFreq: this.alarmFreq,
          type: this.type,
          isStart: this.isStart
        };
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/origin/addMonitor",
          async: true,
          data: data,
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 401) {
            window.location.href = "/"
          } else {
            if (res.data.msg == "success") {
              this.submitOK = true;
              setTimeout(() => {
                this.submitOK = false;
                this.resetAll();
                this.$emit("listenToAddChildEvent");
                this.$emit("listenToAddSuccess");
              }, 1500);
            } else if (res.data.msg == "exist") {
              if (res.data.results.name) {
                this.ifNameEmpty = true;
                this.nameErr = "该监控名已存在";
              }
              if (res.data.results.url) {
                this.ifUrlEmpty = true;
                this.urlErr = "该监控地址已存在";
              }
            } else {
              this.submitErr = true;
              setTimeout(() => {
                this.submitErr = false;
              }, 1500);
            }
          }
        }).catch(err=> {
          console.log(err)
          this.submitErr = true;
          setTimeout(() => {
            this.submitErr = false;
          }, 1500);
        })
      },
      resetAll(){
        this.originName = "";
        this.originUrl = "";
        this.monitorFreq = "";
        this.alarmFreq = "";
        this.type = "";
        this.isStart = false;
        this.isMonitorFreq = false;
        this.monitorFreqText = "请选择";
        this.isAlarmFreq = false;
        this.alarmFreqText = "请选择";
        this.isType = false;
        this.typeText = "请选择";
        this.isShowStart = false;
        this.saveText = "保  存";
        this.startText = "保存并启用";
        this.ifNameEmpty = false;
        this.ifUrlEmpty = false;
        this.ifMFreqEmpty = false;
        this.ifAFreqEmpty = false;
        this.ifTypeEmpty = false;
        this.nameErr = "监控名不能为空";
        this.urlErr = "监控地址不能为空";
        this.submitErr = false;
        this.submitOK = false;
      },
      handleSelectCon(){
         this.isShowStart = false;
         this.isMonitorFreq = false;
         this.isAlarmFreq = false;
         this.isType = false;
      }
    },
    mounted(){
      window.addEventListener('click', this.handleSelectCon);
    }
  }
</script>
