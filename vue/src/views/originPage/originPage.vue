<template>
  <div>
    <div class="content">
      <!--位置信息 start-->
      <div class="bread-crumbs">
        <div class="bread-crumbs-content">
          <span class="cor-0498e4">监控管理</span>
          <span class="locationgLine">&frasl;</span>
          <span class="corBlue">源端监控</span>
        </div>
      </div>
      <!--位置信息 end-->
      <div class="rm-main-box">
        <div class="rl-main-aside clearfix">
        	<a href="javascript:;" title="查询" class="rl-operate-btn active fr btnSearch" @click="searchByKwd('','first')">查询</a>
        	<div class="frt">
        	  <label class="downMenuTit fl">关键字：</label>
          	<div class="resource-sort-search-box frt">
            <input ref="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入监控名关键字">
          </div>
        	</div>
          <div class="downMenu frt clearfix">
          	<label class="downMenuTit fl">运行状态：</label>
            <div @click="statusList()" class="select-box result_select fl" @click.stop>
              <span class="defaul_option">{{chooseStatusText}}</span>
              <i class="icon4 icon-downMenu"></i>
              <ul v-if="statusListShow" @click="chooseStatus($event)" @click.stop>
                <li value="5">全部</li>
                <li value="1">异常</li>
                <li value="2">正常</li>
                <li value="4">已启用</li>
                <li value="3">未启用</li>
              </ul>
            </div>
          </div>
          <div class="flt">
            <a class="rl-operate-btn active flt" href="javascript:;" title="新增" @click="showAddPage()">新增</a>
            <a class="rl-operate-btn flt" href="javascript:;" title="删除" @click="deleteMonitor('','',false)">删除</a>
            <a class="rl-operate-btn flt" href="javascript:;" title="启用" @click="startOrStop('start')">启用</a>
            <a class="rl-operate-btn flt" href="javascript:;" title="停用" @click="startOrStop('stop')">停用</a>
          </div>
        </div>
        <div class="rm-main-content">
          <table class="mainTable fwcgTable">
            <thead>
            <tr>
              <th class="wh30"><i class="icon4 check-icon" :class="{'checked':isCheck}" @click="checkAll()"></i></th>
              <th>监控名</th>
              <th>监控地址</th>
              <th class="center percent10">运行状态</th>
              <th class="percent12">监控频率<i class="icon4" :class="monitorFreqClass" @click="monitorFreqSort()"></i></th>
              <th class="percent17">监控类别</th>
              <th class="percent17 minW140">监测时间<i class="icon4" :class="startDateClass" @click="startDateSort()"></i></th>
              <th class="wh130"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item ,index) in originListArr" :id="item._id">
              <td class="wh30"><i class="icon4 check-icon" :class="{'checked':item.isCheck}" @click="checkOne(item._id,$event,index)"></i></td>
              <td class="ellipsis">
                <span>{{item.originName}}</span>
              </td>
              <td class="addressBox">
                <a :href="item.originUrl" target="view_window" >
                  <span class="webAddress  ellipsis" :title="item.originUrl">{{item.originUrl}}</span>
                  <!--<label class="allShow"  :style='{"width":item.len}'>-->
                    <!--<div class="triangle_border_down"></div>-->
                    	<!--{{item.originUrl}}-->
                  <!--</label>-->
                </a>
              </td>
              <td class="center">
                <span v-if="item.isStart&&item.statusCode==200" class="status">正常</span>
                <span v-if="item.isStart&&item.statusCode==1" class="status">已启用</span>
                <span v-if="item.isStart&&item.statusCode!=1&&item.statusCode!=200" class="status abnormal">异常</span>
                <span v-if="!item.isStart" class="status notEnabled">未启用</span>
              </td>
              <td>{{item.monitorFreq+"小时/次"}}</td>
              <td>源站页面是否可访问</td>
              <td>{{item.time||"--"}}</td>
              <td class="wh130">
                <div class="rm-main-icon-box">
                  <a class="rm-icon-btn" href="javascript:;" title="编辑" @click="showModifyPage(item._id)">
                    <i class="icon2 icon-edit"></i>
                  </a>
                  <a v-if="item.isStart" class="rm-icon-btn" href="javascript:;" title="停用"
                     @click="startOrStop('stop',item._id,$event)">
                    <i class="icon2 icon-disable"></i>
                  </a>
                  <a v-else class="rm-icon-btn" href="javascript:;" title="启用"
                     @click="startOrStop('start',item._id,$event)">
                    <i class="icon2 icon-enable"></i>
                  </a>
                  <a class="rm-icon-btn" href="javascript:;" title="删除"  @click = "deleteMonitor(item._id,item.originName,false)">
                    <i class="icon2 icon-sysDelete"></i>
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="page-box clearfix">
            <div class="flt">
              <div class="page-go-box flt">
                <span class="page-txt flt">{{"共"+originListCount+"条记录，每页显示"}}</span>
                                <span class="perPageShow flt" ref="rows" @click="showRowsList()">
                                	{{rows}}
                                	<i class="icon4 icon-downMenu"></i>
                                <ul v-if="rowsListShow" @click="chooseRows($event)" @click.stop>
                                  <li>10</li>
                                  <li>15</li>
                                  <li>20</li>
                              </ul>
                                </span>
                <span class="page-txt flt">条</span>
              </div>
            </div>
            <div class="page-main frt">
              <div class="page-list flt">
                <el-pagination
                  @size-change="rowsChange"
                  @current-change="rowsChange"
                  :current-page.sync="page"
                  :page-size="rows"
                  layout="prev, pager, next, jumper"
                  :total="originListCount">
                </el-pagination>
              </div>
              <div class="page-go-box flt">
                <a class="page-btn" href="javascript:;">确定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="mask"></div>-->
    <!--操作失败-->
    <div class="failedBox" v-if="submitErr">
      <i class="icon4 icon-failed"></i>
      {{submitErrText}}
    </div>
    <!--操作成功-->
    <div class="failedBox successBox" v-if="submitOK">
      <i class="icon4 icon-success"></i>
      操作成功
    </div>

    <!-- 删除提示对话框开始 start-->
    <div v-if="deleteDialogbox">
      <div class="dialog-container add-catalog-dialog" >
        <div class="dialog-inner dialog-delete">
          <header class="dialog-header publicHeader">
          	<div class="dialog-header-tit flt">删除</div>
            <div class="icon3 dialog-header-close frt" @click="closeDialogbox()"></div>
          </header>
          <div class="publicTipBox">
            <!--<p>您确定要删除"<span>{{originName}}</span>"源端监控信息吗？</p>-->
            <p v-html="deleteText">{{deleteText}}</p>
          </div>
          <footer class="dialog-footer publicFooter">
            <ul class="btn-list">
              <li class="btn-item" @click="closeDialogbox()">取&nbsp;&nbsp;消</li>
              <li class="btn-item btn-item-acvite" @click="deleteMonitor(originID,originName,true)">确&nbsp;&nbsp;定</li>
            </ul>
          </footer>
        </div>
      </div>
      <div class="mask"></div>
    </div>
    <!-- 删除提示对话框结束 end-->
    <addOrigin v-bind:isShowAddPage="isShowAddPage" v-bind:userID="userID" v-bind:domain="domain"
               @listenToAddChildEvent="closeAddPage()" @listenToAddSuccess="initData()"></addOrigin>
    <modifyOrigin v-bind:isShowModifyPage="isShowModifyPage" v-bind:modifyOriginID="modifyOriginID"
                  v-bind:userID="userID" v-bind:domain="domain" @listenToModifyChildEvent="closeModifyPage()"
                  @listenToModifySuccess="closeModifyPage()"></modifyOrigin>


    <!-- 绑定邮箱对话框开始 start -->
    <MailboxBind v-bind:mailboxBindVisible = "mailboxBindVisible" @listenToMailEvent = "getMailMessage" ref = "mailboxBind"></MailboxBind>
    <!-- 绑定邮箱对话框结束 end -->
    <!--操作成功-->
    <div class="failedBox successBox" v-if="success">
      <i class="icon4 icon-success"></i>
      请绑定邮箱，以便您及时收到预警通知
    </div>


  </div>
</template>
<style>
  /*element-ui分页插件----start---*/
  .el-pagination .btn-prev, .el-pagination .btn-next {
    border: 1px solid #e4eaf0;
    border-radius: 2px;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    padding: 0 12px 0 13px;
    transition: all 0.2s ease 0s;
  }
  .el-pagination .btn-next:before {
    content: "下一页";
  }
  .el-pagination .btn-prev:before {
    content: "上一页";
  }
  .el-pager li {
    border: 1px solid #e4eaf0;
    border-radius: 2px;
    cursor: pointer;
    float: left;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    padding: 0 12px 0 13px;
    transition: all 0.2s ease 0s;
  }
  .page-list .el-input__inner {
    border: 1px solid #e4eaf0;
    border-radius: 2px;
    box-sizing: border-box;
    height: 34px;
    margin: 0 10px;
    text-align: center;
    width: 34px;
  }
  .page-list .el-pagination__editor.el-input .el-input__inner {
    height: 30px;
  }
  .btn-next .el-icon-arrow-right:before {
    content: ""
  }
  .btn-prev .el-icon-arrow-left:before {
    content: ""
  }
  .el-pager li.active + li {
    border-left: 1px solid #e4eaf0;
  }
  .page-list .el-pager li {
    margin: 0 10px;
    height: 32px;
  }

  .page-list .el-pager li.active + li {
    border-left: 1px solid #e4eaf0;
  }
  .dialog-body .rm-advanced-search-inp {
    background: #fff none repeat scroll 0 0;
    border: 1px solid #ddd;
    border-radius: 2px;
    color: #333;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin-left: 15px;
    padding-left: 10px;
  }
  .addressBox{
    max-width: 180px;
  }
  .webAddress {
    width: 100%;
  }
  /*element-ui分页插件---end---*/
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import addOrigin from '@/views/originPage/addOrigin';
  import modifyOrigin from '@/views/originPage/modifyOrigin';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import MailboxBind from '@/views/module/mailboxBind';
  export default{
    data(){
      return {
        originListArr: [],//首页初始化获取数据列表
        originIDArr: [],//当前页面所有数据的originID集合
        originListCount: 0,//列表数据总条数
        rows: 10,//每页显示几条
        page: 1,//当前页数
        sort: {isStart: -1, statusCode: -1, time: -1},//数据排序
        domain: "",//domain
        userID: "",//domain
        totalPage: 0,//总页数
        statusListShow: false,//查询运行状态点击事件用的flag参数
        chooseStatusType: 5,//查询时运行状态的选择结果，0：全部，1：正常，2：异常
        chooseStatusText: "全部",//查询时运行状态栏的文本展示
        rowsListShow: false,//每页显示几条点击事件用的flag参数
        //isCheck: "",//选择框选择状态class，checked：已选择，空：未选择
        monitorFreqClass: "icon-defalut",//监控频率排序头部样式
        monitorFreq: 0,//监控频率排序
        startDateClass: "icon-defalut",//生效时间排序头部样式
        time: 0,//生效时间排序
        isShowAddPage: false,
        isShowModifyPage: false,
        modifyOriginID: "",
        submitErr: false,
        submitOK: false,
        submitErrText: "操作失败",
        isSearch: false,
        deleteDialogbox: false,
        originName: "",
        originID: "",
        deleteText: "",
        mailboxBindVisible:false,
        success:false
      }
    },
    mounted(){
      this.initData();
      window.addEventListener('click', this.handleSelectCon);
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      getCheckedSum () {
        return this.originListArr.filter(item => item.isCheck).length
      },
      isCheck () {
        if (this.originListArr.length) {
          return this.getCheckedSum && this.getCheckedSum === this.originListArr.length;
        } else {
          return false
        }
      }
    },
    components: {
      addOrigin,
      modifyOrigin,
      MailboxBind
    },
    methods: {
      initData(){//初始化数据
        if (this.getUserInfo) {
          if (typeof this.getUserInfo == 'string') {
            this.domain = JSON.parse(this.getUserInfo).domain;
            this.userID = JSON.parse(this.getUserInfo).userID;
          } else {
            this.domain = this.getUserInfo.domain;
            this.userID = this.getUserInfo.userID;
          }
        }
        this.isSearch = false;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/origin/getMonitorList",
          async: true,
          data: {
            query: {domain: this.domain},
            sort: this.sort,
            page: this.page,
            rows: this.rows
          },
          contentType: 'application/json'
        }).then(res=> {
//          if (res.data.code == 401) {
//            window.location.href = "/"
//          } else {
            if (res.data.msg == "success") {
              this.originListArr = res.data.results.dataList;
              this.originListCount = res.data.results.dataCount;

              /*设置宽度*/
              for (let i = 0; i < this.originListArr.length; i++) {
                this.originListArr[i] = Object.assign({}, this.originListArr[i], {len:this.originListArr[i].originUrl.trim().length*6.7+"px"});
                this.$set(this.originListArr,i,this.originListArr[i]);
              }

            } else {
              alert("数据加载失败")
            }
//          }
        }).catch(err=> {
          console.log(err)
        })
      },
      statusList(){//查询时，运行状态选择点击事件
        this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus(e){//查询时，运行状态选择点击事件
        this.chooseStatusType = e.target.value;
        this.chooseStatusText = e.target.innerText;
        this.statusListShow = false;
      },
      showRowsList(){//每页显示几条选择点击事件
        this.rowsListShow ? this.rowsListShow = false : this.rowsListShow = true
      },
      chooseRows(e){//每页显示几条选择点击事件
        this.page = 1;
        this.rows = Number(e.target.innerText);
        this.rowsListShow = false;
        this.rowsChange();
      },
      checkAll(){//全选
        this.originIDArr = [];
        if (this.isCheck) {
          /*单选按钮的样式*/
          for (let i = 0; i < this.originListArr.length; i++) {
            if (this.originListArr[i].isCheck) {
              this.originListArr[i].isCheck=!this.originListArr[i].isCheck;
            }
          }
        } else {
          this.originListArr.forEach((item)=> {
            this.originIDArr.push(item._id)
          });
          /*单选按钮的样式*/
          for (let i = 0; i < this.originListArr.length; i++) {
            if (!this.originListArr[i].isCheck) {
              this.originListArr[i] = Object.assign({}, this.originListArr[i], {isCheck:'true'});
              this.$set(this.originListArr,i,this.originListArr[i]);
            }
          }
        }
      },
      checkOne(originID, e,ind){//单选
        if (!this.originListArr[ind].isCheck) {
          this.originIDArr.push(originID);
          /*单选按钮的样式*/
          this.originListArr[ind] = Object.assign({}, this.originListArr[ind], {isCheck:'true'});
          this.$set(this.originListArr,ind,this.originListArr[ind]);
        } else {
          for (var i = 0; i < this.originIDArr.length; i++) {
            if (this.originIDArr[i] == originID) {
              this.originIDArr.splice(i, 1);
              break;
            }
          }
          /*单选按钮的样式*/
          this.originListArr[ind] = Object.assign({}, this.originListArr[ind], {isCheck:''});
          this.$set(this.originListArr,ind,this.originListArr[ind]);
        }
      },
      startOrStop(action, originID){//批量启用、停止
        if (!originID && this.originIDArr.length == 0) {
          this.submitErrText = action == "start" ? "请选择要启用的数据":"请选择需要停用的数据";
          this.submitErr = true;
          setTimeout(() => {
            this.submitErr = false;
          }, 1500);
          return;
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/origin/startOrStop",
          async: true,
          data: {
            originID: originID ? [originID] : this.originIDArr,
            isStart: action == "start" ? true : false
          },
          contentType: 'application/json'
        }).then(res=> {
//          if (res.data.code == 401) {
//            window.location.href = "/"
//          } else {
            if (res.data.msg == "success") {
              this.submitOK = true;
              setTimeout(() => {
                this.submitOK = false;
              }, 1500);
              this.isSearch ? this.searchByKwd() : this.initData()
            } else {
              this.submitErr = true;
              setTimeout(() => {
                this.submitErr = false;
              }, 1500);
            }

//          }
          this.originIDArr = [];
        }).catch(err=> {
          console.log(err)
        })
      },
      //显示删除对话框
      deleteDialog(originID,originName){
        if(!originID && !originName){
          this.deleteText = "您确定要删除选中的监控信息吗？";
          this.deleteDialogbox = true;
        }else{
          this.deleteText = "您确定要删除<span>" + originName + "</span>源端监控信息吗？";
          this.deleteDialogbox = true;
          this.originID = originID;
          this.originName = originName;
        }
      },
      //关闭删除对话框
      closeDialogbox(){
        this.deleteDialogbox = false;
        this.isSearch ? this.searchByKwd() : this.initData()
      },
      deleteMonitor(originID,originName,isDelete){//批量启用、停止
        if (!originID && this.originIDArr.length == 0) {
          this.submitErrText = "请勾选要删除的数据";
          this.submitErr = true;
          setTimeout(() => {
            this.submitErr = false;
          }, 1500);
          return;
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/origin/deleteMonitor",
          async: true,
          data: {
            originID: originID ? [originID] : this.originIDArr,
            isDelete: isDelete
          },
          contentType: 'application/json'
        }).then(res=> {
//          if (res.data.code == 401) {
//            window.location.href = "/"
//          } else {
            if (res.data.msg == "success") {
              this.deleteDialogbox = false;//关闭删除对话框
              this.submitOK = true;
              setTimeout(() => {
                this.submitOK = false;
              }, 1500);
              //this.isCheck = ""//复选框的样式
              /*单选按钮的样式*/
              for (let i = 0; i < this.originListArr.length; i++) {
                if (this.originListArr[i].isCheck) {
                  this.originListArr[i].isCheck=!this.originListArr[i].isCheck;
                }
              }
              this.originIDArr = [];
              this.isSearch ? this.searchByKwd() : this.initData()
            } else if (res.data.msg == "hasStart") {
              if (!originID && this.originIDArr.length > 1) {
                this.submitErrText = "只能删除未启用状态的监控信息，请重新选择！";
              } else {
                this.submitErrText = "该源端监控正在启用中，请先停用此监控信息再进行删除操作！";
              }
              this.deleteDialogbox = false;//关闭删除对话框
              this.submitErr = true;
              setTimeout(() => {
                this.submitErr = false;
              }, 1500);
            } else if(res.data.msg == "noStart"){
              this.deleteDialog(originID,originName)
            }else {
              this.submitErrText = "操作失败";
              this.submitErr = true;
              setTimeout(() => {
                this.submitErr = false;
              }, 1500);
              this.deleteDialogbox = false;//关闭删除对话框
            }
//          };

        }).catch(err=> {
          console.log(err)
        })
      },
      monitorFreqSort(){//按监控频率排序
        if (this.monitorFreq == 0) {//正序
          this.monitorFreqClass = "icon-top";
          this.monitorFreq = 1;
          this.sort = {
            monitorFreq: 1
          }
        } else if (this.monitorFreq == 1) {//倒序
          this.monitorFreqClass = "icon-bottom";
          this.monitorFreq = 0;
          this.sort = {
            monitorFreq: -1
          }
        }
        this.isSearch ? this.searchByKwd(true) : this.initData()
      },
      startDateSort(){//按生效时间排序
        if (this.time == 0) {//正序
          this.startDateClass = "icon-top";
          this.time = 1;
          this.sort = {
            time: 1
          }
        } else if (this.time == 1) {//倒序
          this.startDateClass = "icon-bottom";
          this.time = 0;
          this.sort = {
            time: -1
          }
        }
        this.isSearch ? this.searchByKwd(true) : this.initData()
      },
      searchByKwd(isSort, isFirst){
        this.isSearch = true;
        if (!this.$refs.keyword.value.trim() && this.chooseStatusType == 0) {
          return;
        }
        if(!isSort){
          this.monitorFreqClass = "icon-defalut";
          this.startDateClass = "icon-defalut";
        }
        if(isFirst){
          this.page = 1;
        }
//        if (this.chooseStatusType == 5 && !this.$refs.keyword.value.trim()) {//获取全部数据列表
//          this.initData();
//        } else {
          axios({
            headers: {"Content-Type": "application/json"},
            method: "post",
            url: "/origin/searchByKwd",
            async: true,
            data: {
              domain: this.domain,
              keyword: this.$refs.keyword.value.trim(),
              status: this.chooseStatusType,
              rows: this.rows,
              sort: isSort?this.sort:"",
              page: this.page
            },
            contentType: 'application/json'
          }).then(res=> {
//            if (res.data.code == 401) {
//              window.location.href = "/"
//            } else {
              if (res.data.msg == "success") {

                this.originListArr = res.data.results.dataList;
                this.originListCount = res.data.results.dataCount;
              } else {
                alert("查询失败")
              }
//            }
          }).catch(err=> {
            console.log(err)
          })
//        }
      },
      showAddPage(){
        //this.isShowAddPage = true;
        this.emailSjax()
      },
      closeAddPage(){
        this.isShowAddPage = false;
      },
      showModifyPage(originID){
        this.modifyOriginID = originID;
        this.isShowModifyPage = true;
      },
      closeModifyPage(){
        this.isShowModifyPage = false;
        this.isSearch ? this.searchByKwd() : this.initData()
      },
      rowsChange(){
//        this.page = 1;
        this.isSearch ? this.searchByKwd() : this.initData()
      },
      handleSelectCon(){
         this.statusListShow = false;
      },
      /*
        *监听绑定邮箱
        */
      getMailMessage(isfalg){
        this.mailboxBindVisible = isfalg;
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
            this.isShowAddPage = true;
            return;
          } else if (res.data.code == "202"){//邮箱未绑定
              this.success = true;
              setTimeout(() => {
                this.success = false;
                this.mailboxBindVisible = true;
              }, 1700);
            return;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
    }
  }
</script>

