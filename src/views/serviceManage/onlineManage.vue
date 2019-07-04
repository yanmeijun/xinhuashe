<template>
  <div>
    <div class="content">
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>服务管理</span>
          <span>&gt;</span>
          <span>上线管理</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
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
          <!--<div class="select-box result_select fr">-->
          <!--<span class="defaul_option">全部</span>-->
          <!--<i class="icon header-user-icon fr"></i>-->
          <!--<ul style="display: none;">-->
          <!--<li>全部</li>-->
          <!--<li>待审核</li>-->
          <!--<li>未通过</li>-->
          <!--<li>已通过</li>-->
          <!--<li>已撤消</li>-->
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
            <th width="10.5%" class="center">服务类型</th>
            <th width="10.5%">上线渠道</th>
            <th width="19%">渠道地址</th>
            <th width="10.5%" class="center">服务状态</th>
            <th width="18%">创建时间</th>
            <th class="center" width="12.5%">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in serviceList">
            <td>
              <span class="ellipsis">{{item.serviceName}}</span>
            </td>
            <td class="center">{{item.serviceType == 2 ? "服务" : "API"}}</td>
            <td>{{useForMap[item.useFor]}}</td>
            <td>
              <span class="ellipsis tdWh">{{item.useForAddress}}</span>
            </td>
            <td class="center">
              <span class="status" :class="{'passed':item.online,'notEnabled':!item.online}">{{item.online ? "上线" : "下线"}}</span>
            </td>
            <td>{{item.createDate}}</td>
            <td class="center">
              <i class="icon-list" :class="{'icon-downline':item.online,'icon-online':!item.online}"
                 :title="item.online?'下线':'上线'"
                 @click="online(item.serviceID,item.online,item.localFrom,item.serviceName,useForMap[item.useFor],item.useForAddress)"></i>
            </td>
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
        <div v-if="serviceList.length<1" class="noRecordList htvh">
          <div class="noRecordPicBox"><img src="../../assets/img/newPic/noRecord.png"/></div>
          <div class="noRecorWord">没有申请记录哦~</div>
        </div>
        <!--还没有申请记录 start-->
      </div>
    </div>
    <!--遮罩层-->
    <div v-if="onlineTips||offlineTips" class="mask"></div>
    <!--服务下线提示-->
    <div v-if="offlineTips" class="dialog-container add-catalog-dialog">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">服务下线信息</div>
          <div class="icon-verPic icon-dialogClose fr" @click="cancel"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-conTit">您确定要下线<span>{{onlineInfo.serviceName}}</span>服务吗？</div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list clearfix">
            <li class="btn-item btn-item-acvite" @click="modifyService(false)">确&nbsp;&nbsp;认</li>
            <li class="btn-item" @click="cancel">取&nbsp;&nbsp;消</li>
          </ul>
        </footer>
      </div>
    </div>
    <!--服务上线提示-->
    <div v-if="onlineTips" class="dialog-container add-catalog-dialog">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">服务上线信息</div>
          <div class="icon-verPic icon-dialogClose fr" @click="cancel"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-conList">
            <label>上线服务：</label>
            <span class="blue ellipsis">{{onlineInfo.serviceName}}</span>
          </div>
          <div class="dialog-conList">
            <label>上线渠道：</label>
            <span class="ellipsis  tdWh">{{onlineInfo.useFor}}：{{onlineInfo.useForAddress}}</span>
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list clearfix">
            <li class="btn-item btn-item-acvite" @click="modifyService(true)">确&nbsp;&nbsp;认</li>
            <li class="btn-item" @click="cancel">取&nbsp;&nbsp;消</li>
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
    name: "onlineManage",
    data() {
      return {
        openID: "",
        page: 1,
        rows: 10,
        keyword: '',
        serviceList: [],
        serviceCount: 0,
        onlineTips: false,
        offlineTips: false,
        onlineInfo: {},
        useForMap: {
          web: "web端",
          app: "app",
          weChat: "微信端",
          wap: "wap",
          other: "其他"
        }
      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    mounted() {
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";
      this.getUserServiceList()
    },
    methods: {
      getUserServiceList(isSearch) {
        isSearch == true ? this.page = 1 : "";
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userService/getUserServiceList",
          data: {
            query: {openID: this.openID},
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
      online(serviceID, online, localFrom, serviceName, useFor, useForAddress) {
        online ? this.offlineTips = true : this.onlineTips = true;
        this.onlineInfo = {serviceID, localFrom, serviceName, useFor, useForAddress};
      },
      cancel() {
        this.onlineTips = this.offlineTips = false;
      },
      modifyService(online) {
        axios({
          headers: {"Content-Type": "application/json"},
          url: "/userService/modifyService",
          method: "post",
          data: {
            query: {localFrom: this.onlineInfo.localFrom, serviceID: this.onlineInfo.serviceID},
            modify: {online: online}
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.cancel();
            this.getUserServiceList();
          }
        })
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
    height: 32px;
    margin: 0 10px;
    text-align: center;
    width: 34px;
  }

  .page-list .el-pagination__editor.el-input .el-input__inner {
    height: 32px;
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
    line-height: 30px;
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
