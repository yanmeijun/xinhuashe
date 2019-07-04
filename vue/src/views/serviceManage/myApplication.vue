<template>
  <div>
    <div class="content">
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>服务管理</span>
          <span>&gt;</span>
          <span>我的申请</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
          <a href="javascript:;" title="查询" class="rl-operate-btn active fr btnSearch"
             @click="getServiceList(true)">查询</a>
          <div class="resource-sort-search-box fr">
            <label class="downMenuTit fl">关键字：</label>
            <div class="textInputBox fl">
              <input v-model="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入服务名称关键字">
            </div>
          </div>
          <div class="downMenu fr clearfix">
            <label class="downMenuTit fl">审核状态：</label>
            <div class="select-box result_select fr" @click="statusList()" @click.stop>
              <span class="defaul_option">{{chooseStatusText}}</span>
              <i class="icon header-user-icon fr"></i>
              <ul v-if="statusListShow" @click="chooseStatus($event)" @click.stop>
                <li value="0">全部</li>
                <li value="1">待审核</li>
                <li value="3">未通过</li>
                <li value="2">已通过</li>
                <li value="4">已撤销</li>
              </ul>
            </div>
          </div>
        </div>
        <!--搜索条件 end-->
        <!--内容信息 start-->
        <table class="mainTable">
          <thead>
          <tr>
            <th>申请单编号</th>
            <th width="17.5%">申请时间</th>
            <th width="16%">服务名称</th>
            <th width="9.5%">服务分类</th>
            <th width="10%">服务范围</th>
            <th class="center" width="10%">审核状态</th>
            <th width="13%">审核意见</th>
            <th width="8%" class="center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in serviceList">
            <td>{{item.procureID}}</td>
            <td>{{item.applyTime}}</td>
            <td>{{item.serviceName}}</td>
            <td>{{item.serviceType == 2 ? "服务" : (item.serviceType == 3 ? "API" : "服务和API")}}</td>
            <td>
              <div class="addressBox">
                <span class="ellipsis"><i v-for="(city,index) in item.region">{{city.name}}<em
                  v-if="index!=item.region.length-1">、</em></i></span>
                <label v-if="item.region&&item.region.length>4" class="allShow wh160px">
	                        			<span class="triangle_border_down">
	                        				<span class="triangle_border_down"></span>
	                        			</span>
                  <i v-for="(city,index) in item.region">{{city.name}}<em v-if="index!=item.region.length-1">、</em></i>
                </label>
              </div>
            </td>
            <td class="center">
              <span class="status" :class="{'pendingReview':item.status==1,
              'abnormal':item.status==3,
              'notEnabled':item.status==4,
              'passed':item.status==2}">{{statusInfo[item.status]}}</span>
            </td>
            <td>
              <div class="addressBox">
                <span class="ellipsis">{{item.reviewed || "无"}}</span>
                <label v-if="item.reviewed&&item.reviewed.length>7" class="allShow">
	                        			<span class="triangle_border_down">
	                        				<span class="triangle_border_down"></span>
	                        			</span>
                  {{item.reviewed || "无"}}
                </label>
              </div>
            </td>
            <td class="center">
              <i class="icon-list icon-viewList" title="查看" @click="renderTo(item.procureID,item.status)"></i>
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
                @size-change="getServiceList"
                @current-change="getServiceList"
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
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from "axios";
  import {mapGetters} from 'vuex';

  export default {
    name: "myApplication",
    data() {
      return {
        openID: "",
        page: 1,
        rows: 10,
        keyword: '',
        serviceList: [],
        serviceCount: 0,
        status: "0",
        statusListShow: false,//查询运行状态点击事件用的flag参数
        chooseStatusText: "全部",//查询时运行状态栏的文本展示
        statusInfo: {
          0: "全部",
          1: "待审核",
          3: "未通过",
          2: "已通过",
          4: "已撤销"
        }
      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    mounted() {
      this.openID = JSON.parse(this.getUserInfo).openID;
      this.getServiceList();
      window.addEventListener('click', this.handleSelectCon);
    },
    methods: {
      getServiceList(isSearch) {
        isSearch == true ? this.page = 1 : "";
        let query = {openID: this.openID};
        if (this.status != 0) {
          query.status = this.status;
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/procure/getServiceList",
          data: {
            query: query,
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
      statusList() {//查询时，运行状态选择点击事件
        this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus(e) {//查询时，运行状态选择点击事件
        this.status = e.target.value;
        this.chooseStatusText = e.target.innerText;
        this.statusListShow = false;
      },
      handleSelectCon() {
        this.statusListShow = false;
        this.rowsListShow = false;
      },
      renderTo(procureID, status) {
        if (!procureID) {
          return;
        }
        this.$router.push({
          name: "applyDetail",
          query: {procureID: procureID, status: status}
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
