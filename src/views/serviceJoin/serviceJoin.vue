<template>
  <div>
    <div class="content">
      <!--位置信息 start-->
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>接入申请</span>
        </div>
      </div>
      <!--位置信息 end-->
      <div class="rm-main-box">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
          <a href="javascript:;" title="查询" class="rl-operate-btn active fr btnSearch" @click="searchByKwd('','first')">查询</a>
          <div class="resource-sort-search-box fr">
            <label class="downMenuTit fl">关键字：</label>
            <div class="textInputBox fr">
              <input ref="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入服务名称关键字">
            </div>
          </div>
          <div class="downMenu fr clearfix">
            <label class="downMenuTit fl">审核状态：</label>
            <div class="select-box result_select fr" @click="statusList()" @click.stop>
              <span class="defaul_option">{{chooseStatusText}}</span>
              <i class="icon header-user-icon fr"></i>
              <ul v-if="statusListShow" @click="chooseStatus($event)" @click.stop>
                <li value=0>全部</li>
                <li value=1>待审核</li>
                <li value=4>未通过</li>
                <li value=3>已通过</li>
                <li value=2>已撤销</li>
              </ul>
            </div>
          </div>
        </div>
        <!--搜索条件 end-->
        <div class="rm-main-content">
          <table class="mainTable">
            <thead>
            <tr>
              <th>申请单编号</th>
              <th width="17.5%">申请时间</th>
              <th width="10%">服务名称</th>
              <th class="center" width="9.5%">服务分类</th>
              <th width="9.2%">申请单位</th>
              <th width="9.5%">联系人</th>
              <th class="center" width="9.2%">审核状态</th>
              <th width="11%">审核意见</th>
              <th width="8%" class="center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item ,index) in serviceListArr" :key="index">
              <td class="color333">{{item.idNumber}}</td>
              <td>{{item.createDate}}</td>
              <td><span class="clampHide">{{item.serviceName}}</span></td>
              <td class="center">{{item.serviceType == 1 ? '业务查询' : (item.serviceType == 2 ? '业务办理' : '业务预约')}}</td>
              <td><span class="ellipsis fwsm">{{item.company}}</span></td>
              <td>{{item.contactName}}</td>
              <td class="center" v-if="item.reviewState=='1'"><span class="status pendingReview">待审核</span></td>
              <td v-if="item.reviewState==1">
                <div class="addressBox">
                  <span class="ellipsis">等待管理员审核</span>
                  <label class="allShow">
	                        			<span class="triangle_border_down">
	                        				<span class="triangle_border_down"></span>
	                        			</span>
                    等待管理员审核
                  </label>
                </div>
              </td>
              <td v-if="item.reviewState==4" class="center"><span class="status abnormal">未通过</span></td>
              <td v-if="item.reviewState==4">
                <div class="addressBox">
                  <span class="ellipsis">{{item.reviewSuggest}}</span>
                  <label class="allShow">
	                        			<span class="triangle_border_down">
	                        				<span class="triangle_border_down"></span>
	                        			</span>
                    {{item.reviewSuggest}}
                  </label>
                </div>
              </td>
              <td v-if="item.reviewState==3" class="center"><span class="status passed">已通过</span></td>
              <td v-if="item.reviewState==3">已通过审核</td>
              <td v-if="item.reviewState==2" class="center">
                <span class="status notEnabled">已撤消</span>
              </td>
              <td v-if="item.reviewState==2">
                <div class="addressBox">
                  <span class="ellipsis">无</span>
                  <label class="allShow">
	                        			<span class="triangle_border_down">
	                        				<span class="triangle_border_down"></span>
	                        			</span>
                    无
                  </label>
                </div>
              </td>
              <td class="center">
                <!--<a href="javascript:;" class="corBlue" @click="renderTo(item.reviewState,item.idNumber)">查看</a>-->
                <i class="icon-list icon-viewList" title="查看" @click="renderTo(item.reviewState,item.idNumber)"></i>
              </td>
            </tr>
            </tbody>
          </table>
          <!--还没有申请记录 start-->
          <div v-if="serviceListCount==0" class="noRecordList htvh">
            <div class="noRecordPicBox"><img src="../../assets/img/newPic/noRecord.png"/></div>
            <div class="noRecorWord">亲，没有申请记录哦～</div>
          </div>
          <!--还没有申请记录 end-->
          <div class="page-box clearfix" v-if="this.serviceListCount!=0">
            <div class="fl">
              <div class="page-go-box">
                <!--<span class="page-txt">显示<label>{{serviceListCount}}</label>个条目中的第<label>1</label>至<label>10</label>个</span>-->

                <span
                  class="page-txt">显示<label>{{serviceListCount}}</label>个条目中的第<label>{{(page - 1) * rows + 1}}</label>至<label>{{page * rows}}</label>个</span>
                <!--<span class="page-txt flt">{{"共"+serviceListCount+"条记录，每页显示"}}</span>
                                <span class="perPageShow flt" ref="rows" @click="showRowsList()" @click.stop>
                                	{{rows}}
                                	<i class="icon4 icon-downMenu"></i>
                                <ul v-if="rowsListShow" @click="chooseRows($event)" @click.stop>
                                  <li>10</li>
                                  <li>15</li>
                                  <li>20</li>
                              </ul>
                                </span>
                <span class="page-txt flt">条</span>-->
              </div>
            </div>
            <div class="page-main pageJump fr">
              <!--<span class="page-txt pageTotal fl">共100页</span>-->
              <ul class="page-list fl">
                <el-pagination
                  @size-change="rowsChange"
                  @current-change="rowsChange"
                  :current-page.sync="page"
                  :page-size="rows"
                  layout="prev, pager, next, jumper"
                  :total="serviceListCount">
                </el-pagination>
              </ul>
              <div class="page-go-box fl">
                <a class="page-btn" href="javascript:;">确定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MaskTip v-bind:loading="loading"></MaskTip>
  </div>

</template>
<style>
  /*element-ui分页插件----start---*/
  .el-pagination .btn-prev, .el-pagination .btn-next {
    border: 1px solid #e4eaf0;
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
    border: 1px solid #e4eaf0;
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
    border: 1px solid #e4eaf0;
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

  .page-main.pageJump .page-list .el-pagination__editor.el-input .el-input__inner {
    height: 32px !important;
    line-height: 30px !important;
    text-align: center;
    width: 34px !important;
    background: #fff !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .page-main.pageJump .page-list .el-pagination {
    padding: 0;
  }

  /*element-ui分页插件---end---*/
</style>
<style scoped>
  @import "../../assets/css/main.css";
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import MaskTip from '@/views/module/mask';

  export default {
    name: 'login',
    data() {
      return {
        serviceListArr: [],//首页初始化获取数据列表
        serviceIDArr: [],//当前页面所有数据的serviceID集合
        serviceListCount: 0,//列表数据总条数
        rows: 10,//每页显示几条
        page: 1,//当前页数
        sort: {createDate: -1},//数据排序
        openID: "",//openID
        totalPage: 0,//总页数
        statusListShow: false,//查询运行状态点击事件用的flag参数
        chooseStatusType: 0,//查询时审核状态（1：待审核，2：已撤销，3：审核已通过，4：审核未通过）
        chooseStatusText: "全部",//查询时运行状态栏的文本展示
        rowsListShow: false,//每页显示几条点击事件用的flag参数
        //isCheck: "",//选择框选择状态class，checked：已选择，空：未选择
        monitorFreqClass: "icon-defalut",//监控频率排序头部样式
        monitorFreq: 0,//监控频率排序
        startDateClass: "icon-defalut",//生效时间排序头部样式
        startDate: 0,//生效时间排序
        isShowAddPage: false,
        isShowModifyPage: false,
        modifyOriginID: "",
        submitErr: false,
        submitOK: false,
        submitErrText: "操作失败",
        isSearch: false,
        deleteDialogbox: false,
        serviceName: "",
        serviceID: "",
        deleteText: "",
        loading: false
      }
    },
    mounted() {
      this.initData();
      window.addEventListener('click', this.handleSelectCon);
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    methods: {
      initData() {//初始化数据
        if (this.getUserInfo) {
          this.openID = JSON.parse(this.getUserInfo).openID;
        }
        this.isSearch = false;
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/getServiceList",
          async: true,
          data: {
            query: {openID: this.openID},
            sort: this.sort,
            page: this.page,
            rows: this.rows
          },
          contentType: 'application/json'
        }).then(res => {
          this.loading = false;
          if (res.data.msg == "success") {
            this.serviceListArr = res.data.results.dataList;
            this.serviceListCount = res.data.results.dataCount;
          } else {
            alert("数据加载失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      statusList() {//查询时，运行状态选择点击事件
        this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus(e) {//查询时，运行状态选择点击事件
        this.chooseStatusType = e.target.value;
        this.chooseStatusText = e.target.innerText;
        this.statusListShow = false;
      },
      showRowsList() {//每页显示几条选择点击事件
        this.rowsListShow ? this.rowsListShow = false : this.rowsListShow = true
      },
      chooseRows(e) {//每页显示几条选择点击事件
        this.page = 1;
        this.rows = Number(e.target.innerText);
        this.rowsListShow = false;
        this.rowsChange();
      },
      searchByKwd(isSort, isFirst) {
        this.isSearch = true;
        if (!isSort) {
          this.monitorFreqClass = "icon-defalut";
          this.startDateClass = "icon-defalut";
        }
        if (isFirst) {
          this.page = 1;
        }
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/searchByKwd",
          async: true,
          data: {
            openID: this.openID,
            keyword: this.$refs.keyword.value.trim(),
            reviewState: this.chooseStatusType,
            rows: this.rows,
            sort: isSort ? this.sort : "",
            page: this.page
          },
          contentType: 'application/json'
        }).then(res => {
          this.loading = false;
          if (res.data.msg == "success") {
            this.serviceListArr = res.data.results.dataList;
            this.serviceListCount = res.data.results.dataCount;
          } else {
            alert("查询失败")
          }
        }).catch(err => {
          console.log(err)
        })

      },
      rowsChange() {
//        this.page = 1;
        this.isSearch ? this.searchByKwd() : this.initData()
      },
      handleSelectCon() {
        this.statusListShow = false;
        this.rowsListShow = false;
      },
      renderTo(reviewState, idNumber) {//跳转到服务接入详情页面

        this.$router.push({
          path: '/serviceJoinDetail',
          name: "serviceJoinDetail",
          query: {idNumber: idNumber, reviewState: reviewState}
        })
      }
    }
  }
</script>

