<template>
  <div>
    <div class="content">
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>服务管理</span>
          <span>&gt;</span>
          <span>监控管理</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
          <a href="javascript:;" title="预警邮箱" class="rl-operate-btn active fr btnSearch" @click="showEmail">预警邮箱<i
            class="icon-verPic icon-emailWarn"></i></a>
          <a href="javascript:;" title="查询" class="rl-operate-btn active fr btnSearch"
             @click="getUserServiceList(true)">查询</a>
          <div class="resource-sort-search-box fr">
            <label class="downMenuTit fl">关键字：</label>
            <div class="textInputBox fl">
              <input v-model="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入服务名称关键字">
            </div>
          </div>
          <!--<div class="downMenu fr clearfix">-->
          <!--<label class="downMenuTit fl">运行状态：</label>-->
          <!--<div @click="statusList($event)" class="select-box result_select fr">-->
          <!--<span class="defaul_option">{{chooseStatusText}}</span>-->
          <!--<i class="icon header-user-icon fr"></i>-->
          <!--<ul v-if="statusListShow" @click="chooseStatus($event)" @click.stop>-->
          <!--<li value="5">全部</li>-->
          <!--<li value="1">异常</li>-->
          <!--<li value="2">正常</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <!--搜索条件 end-->
        <!--内容信息 start-->
        <table class="mainTable">
          <thead>
          <tr>
            <th>服务名称</th>
            <th width="12%">服务类型</th>
            <th width="20%">服务范围</th>
            <th width="14%">监控类型</th>
            <th class="center" width="12%">运行状态</th>
            <th width="19%">监测时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in serviceList">
            <td>{{item.serviceName}}</td>
            <td>{{item.serviceType == 2 ? "服务" : "API"}}</td>
            <td>
              <div class="addressBox">
                <span class="ellipsis">{{item.city}}</span>
              </div>
            </td>
            <td>接口无法调用</td>
            <td class="center">
              <span class="status"
                    :class="{'passed':(item.statusCode=='0'||item.statusCode=='000000'),'abnormal':(item.statusCode!='0'||item.statusCode!='000000')}">{{(item.statusCode == "0" || item.statusCode == "000000") ? "正常" : "异常"}}</span>
            </td>
            <td>{{item.time}}</td>
          </tr>
          </tbody>
        </table>
        <!--内容信息 end-->
        <!--翻页 start-->
        <div v-if="serviceCount>0" class="page-box clearfix">
          <div class="fl">
            <div class="page-go-box">
              <span
                class="page-txt">显示<label>{{serviceCount}}</label>个条目中的第<label>{{(page - 1) * rows + 1}}</label>至<label>{{page * rows}}</label>个</span>
            </div>
          </div>
          <div class="page-main pageJump fr">
            <span class="page-txt pageTotal fl">共{{Math.ceil(serviceCount / rows)}}页</span>
            <ul class="page-list fl">
              <el-pagination
                @size-change="getUserServiceList"
                @current-change="getUserServiceList"
                :current-page.sync="page"
                :page-size="rows"
                layout="prev, pager, next, jumper"
                :total="serviceCount">
              </el-pagination>
            </ul>
            <div class="page-go-box fl">
              <a class="page-btn" href="javascript:;">确定</a>
            </div>
          </div>
        </div>
        <!--翻页 end-->
        <!--还没有申请记录 start-->
        <div v-if="serviceCount<1" class="noRecordList htvh">
          <div class="noRecordPicBox"><img src="../../assets/img/newPic/noRecord.png"/></div>
          <div class="noRecorWord">没有申请记录哦~</div>
        </div>
        <!--还没有申请记录 start-->
      </div>
    </div>
    <!--遮罩层-->
    <div v-if="emailShow" class="mask"></div>
    <!--预警邮箱设置-接入-->
    <div v-if="emailShow" class="dialog-container add-catalog-dialog">
      <div class="dialog-inner dialog-ht358">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">预警邮箱设置</div>
          <div class="icon-verPic icon-dialogClose fr" @click="closeEmail"></div>
        </header>
        <div class="dialog-body">
          <div class="serviceAbnormalTit">服务异常时，给下列联系人发送邮件。</div>
          <div class="addWarnEmailBox">
            <a href="javascript:;" @click="addEmail()">
              <i class="icon-verPic icon-addWarnEmail"></i>添加预警邮箱
            </a>
          </div>
          <div class="mailListBox">
            <div class="mailTit">
              <span class="name">姓名</span>
              <span class="mail">邮箱</span>
            </div>
            <div class="mailListCon">
              <div v-for="(item,index) in emailList" class="mailTit">
                <span class="name">{{item.name}}</span>
                <span class="mail ellipsis">{{item.email}}</span>
                <i class="icon-list icon-mailDelete" @click="deleteEmail(index)"></i>
              </div>
              <div v-for="item in newEmailList" class="mailTit">
                <input v-model="item.name" type="text" placeholder="姓名" class="addName"/>
                <input v-model="item.email" type="text" placeholder="邮箱" class="addEmail"/>
              </div>
            </div>
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list clearfix">
            <li class="btn-item btn-item-acvite" @click="modifyEmail">确&nbsp;&nbsp;认</li>
            <li class="btn-item" @click="closeEmail">取&nbsp;&nbsp;消</li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from "axios";
  import {mapGetters} from 'vuex';

  export default {
    name: "monitorManage",
    data() {
      return {
        openID: "",
        rows: 10, //每页显示几条
        page: 1, //当前页数
        sort: {
          isStart: -1,
          statusCode: -1,
          time: -1
        }, //数据排序
//        statusListShow: false, //查询运行状态点击事件用的flag参数
//        chooseStatusType: 5, //查询时运行状态的选择结果，0：全部，1：正常，2：异常
//        chooseStatusText: "全部", //查询时运行状态栏的文本展示
        keyword: '',
        serviceList: [],
        serviceCount: 0,
        emailShow: false,
        emailList: [],
        newEmailList: []
      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    mounted() {
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";
      window.addEventListener('click', this.handleSelect);
      this.getUserServiceList();
    },
    methods: {
      getUserServiceList(isSearch) {
        isSearch == true ? this.page = 1 : "";
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/tmpMonitor/getUserServiceList",
          data: {
            query: {openID: this.openID, status: 2},
            page: this.page,
            rows: this.rows,
            keyword: this.keyword
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.serviceList = res.data.results.dataList;
            this.serviceCount = res.data.results.dataCount;
          }
        })
      },
      getEmailList() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "get",
          url: "/userInformation/getWarnEmail?openID=" + this.openID,
        }).then(res => {
          if (res.data.code == 200) {
            this.emailList = res.data.results;
          }
        }).catch(e => {
          console.log(e)
        })
      },
      showEmail() {
        this.emailShow = true;
        this.getEmailList();
      },
      closeEmail() {
        this.emailShow = false;
        this.newEmailList = [];
      },
      addEmail() {
        this.newEmailList.push({name: "", email: ""})
      },
      modifyEmail() {
        let emailList = this.emailList.concat(this.newEmailList), warnEmail = '';
        if (emailList.length < 1) {
          alert("请添加预警邮箱");
          return;
        }
        for (let item of emailList) {
          warnEmail += item.name + "<" + item.email + ">;"
        }
        warnEmail = warnEmail.substr(0, warnEmail.length - 1)
        axios({
          headers: {"Context-Type": "application/json"},
          method: "post",
          url: "/userInformation/modifyWarnEmail",
          data: {openID: this.openID, warnEmail: warnEmail}
        }).then(res => {
          if (res.data.code == 200) {
            alert("预警邮箱修改成功")
            this.closeEmail();
          } else {
            alert("修改失败")
          }
        })
      },
      deleteEmail(i) {
        this.emailList.splice(i, 1);
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/base.css";
  @import "../../assets/css/public.css";
  @import "../../assets/css/main.css";
  @import "../../assets/css/dialog.css";
</style>
<style>
  /*element-ui分页插件----start---*/
  .el-pagination .btn-prev, .el-pagination .btn-next {
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    height: 32px;
    line-height: 30px;
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
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    float: left;
    height: 32px;
    line-height: 30px;
    margin-left: 10px;
    padding: 0 12px 0 13px;
    transition: all 0.2s ease 0s;
  }

  .page-list .el-input__inner {
    border: 1px solid #ccc;
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
    border-left: 1px solid #ccc;
  }

  .page-list .el-pager li {
    margin: 0 10px;
    height: 32px;
  }

  .page-list .el-pager li.active + li {
    border-left: 1px solid #ccc;
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

  .addressBox {
    max-width: 180px;
  }

  .webAddress {
    width: 100%;
  }

  /*element-ui分页插件---end---*/
</style>
