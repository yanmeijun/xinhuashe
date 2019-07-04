<template>
  <div>
    <div class="content">
      <!--位置信息 start-->
      <div class="bread-crumbs">
        <div class="bread-crumbs-content">
          <span class="cor-0498e4">服务上下线管理</span>
          <!--<span class="locationgLine">&frasl;</span>-->
          <!--<span class="corBlue">服务接入审核</span>-->
        </div>
      </div>
      <!--位置信息 end-->
      <div class="rm-main-box">
        <!--<div class="tabListTit clearfix">-->
        <!--<ul @click="chooseStatus($event)">-->
        <!--<li value=0 :class="{active:chooseStatusType==0}">全部</li>-->
        <!--<li value=1 :class="{active:chooseStatusType==1}">待审核</li>-->
        <!--<li value=3 :class="{active:chooseStatusType==3}">审核通过</li>-->
        <!--<li value=4 :class="{active:chooseStatusType==4}">审核未通过</li>-->
        <!--<li value=2 :class="{active:chooseStatusType==2}">已撤销</li>-->
        <!--</ul>-->
        <!--</div>-->
        <div class="">
          <!--搜索条件 start-->
          <div class="rl-main-aside clearfix">
            <a href="javascript:;" title="新增服务" class="rl-operate-btn active flt" @click="addService()">新增服务</a>
            <a href="javascript:;" title="查询" class="rl-operate-btn active frt btnSearch" @click="toSearch()">查询</a>
            <div class="frt">
              <label class="downMenuTit flt">关键字：</label>
              <div class="resource-sort-search-box frt">
                <input v-model="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入服务名称关键字">
              </div>
            </div>
            <!--<div class="downMenu frt clearfix">-->
            <!--<label class="downMenuTit flt">服务范围：</label>-->
            <!--<div class="select-box result_select wh140 frt" @click="regionList()" @click.stop>-->
            <!--<span class="defaul_option">{{chooseRegionText}}</span>-->
            <!--<i class="icon2 icon-downMenu-symbol frt"></i>-->

            <!--<ul v-if="regionListShow" @click="chooseRegion($event)" @click.stop style="overflow-y:scroll;">-->
            <!--&lt;!&ndash;<input type="search" class="search-serviceArea">产品要添加的搜索框&ndash;&gt;-->
            <!--<li v-for="(item,index) in regionListArr" :id="item.id">{{item.name}}</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--</div>-->
            <div class="downMenu frt clearfix">
              <label class="downMenuTit flt">用户名称：</label>
              <div class="select-box result_select frt" @click="localFromList()" @click.stop style="width: 135px;">
                <span class="defaul_option">{{localFrom}}</span>
                <i class="icon2 icon-downMenu-symbol frt"></i>
                <ul v-if="localFromListShow" @click="chooseLocalFrom($event)" @click.stop style="width: 135px;">
                  <!--<li>xinhuashe_app</li>-->
                 <!-- <li>ucap_web</li>-->
                  <li v-for = "item in confirmStatusArr" :main-data="item.openID">{{item.name}}</li>
                  <!--<li>ucap_weChat</li>-->
                  <!--<li>sichuan_app</li>-->
                </ul>
              </div>
            </div>
          </div>
          <!--搜索条件 end-->
          <div class="rm-main-content">
            <table class="mainTable fwjr">
              <thead>
              <tr>
                <th style="width: 12%" class="center">服务编码</th>
                <th>服务名称</th>
                <th style="width: 20%">templateID</th>
                <th style="width: 15%">localFrom</th>
                <th style="width: 10%" class="center">序号</th>
                <th style="width: 10%" class="center">状态</th>
                <th class="percent8 center">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item ,index) in serviceListArr" :key="index">
                <td class="num center">{{item.serviceID}}</td>
                <td><span class="clampHide" :title="item.serviceName">{{item.serviceName}}</span></td>
                <td><span class="clampHide" :title="item.templateID">{{item.templateID}}</span></td>
                <td><span class="clampHide" :title="item.localFrom">{{item.localFrom}}</span></td>
                <td class="center">{{item.index}}</td>
                <td class="center">{{item.online?'已上线':'未上线'}}</td>
                <td>
                  <div class="rm-main-icon-box" @click="modify(item.serviceID,item.localFrom)">
                    <a class="rm-icon-btn" href="javascript:;" title="编辑">
                      <i class="icon2 icon-verify"></i>
                    </a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <!--还没有申请记录 start-->
            <div class="noRecordList" v-if="serviceListCount==0">
              <div class="noRecordPicBox"><img src="../../assets/img/noRecordPic.png"/></div>
              <div class="noRecorWord">亲，没有服务记录哦～</div>
            </div>
            <div class="page-box clearfix">
              <div class="flt">
                <div class="page-go-box flt">
                  <span class="page-txt flt">{{"共"+serviceListCount+"条记录，每页显示"}}</span>
                                <span class="perPageShow flt" ref="rows" @click="showRowsList()" @click.stop>
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
                <div class="flt">
                  <el-pagination
                    @size-change="rowsChange"
                    @current-change="rowsChange"
                    :current-page.sync="page"
                    :page-size="rows"
                    layout="prev, pager, next, jumper"
                    :total="serviceListCount">
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

  .el-input__inner {
    border-radius: 2px;
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

  .addressBox {
    max-width: 180px;
  }

  .webAddress {
    width: 100%;
  }

  /*element-ui分页插件---end---*/
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import MaskTip from '@/views/module/mask';
  export default{
    data(){
      return {
        serviceListArr: [],//首页初始化获取数据列表
        serviceIDArr: [],//当前页面所有数据的serviceID集合
        serviceListCount: 0,//列表数据总条数
        rows: 10,//每页显示几条
        page: 1,//当前页数
        sort: {index: -1},//数据排序
        totalPage: 0,//总页数
        rowsListShow: false,
        loading: false,
        keyword: '',
        localFromListShow: false,
        localFrom: '请选择',
        confirmStatusArr:[],
        localFromOpenID:""
      }
    },
    mounted(){
//      this.initData();
      this.searchByKwd();
      window.addEventListener('click', this.handleSelectCon);
      /*新增添加用户名*/
      this.getLocalFrom();
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    methods: {
      handleSelectCon(){
        this.rowsListShow = false;
        this.localFromListShow = false;
      },
      toSearch(){
        this.page = 1;
        this.searchByKwd();
      },
//      initData(){//初始化数据
//        this.loading = true;
//        axios({
//          headers: {"Content-Type": "application/json"},
//          method: "post",
//          url: "/userService/getServiceList",
//          async: true,
//          data: {
//            sort: this.sort,
//            page: this.page,
//            rows: this.rows
//          },
//          contentType: 'application/json'
//        }).then(res=> {
//          this.loading = false;
//          if (res.data.code == 200) {
//            this.serviceListArr = res.data.results.dataList;
//            this.serviceListCount = res.data.results.dataCount;
//          } else {
//            alert("数据加载失败")
//          }
//        }).catch(err=> {
//          console.log(err)
//        })
//      },
      modify(serviceID, localFrom){
        this.$router.push({
          path: '/userServiceTable/serviceEdit',
          name: "userServiceEdit",
          query: {serviceID: serviceID, localFrom: localFrom}
        })
      },
      addService(){
        this.$router.push({
          path: '/userServiceTable/serviceEdit',
          name: "userServiceEdit"
        })
      },
      searchByKwd(){
//        if(!this.keyword.trim()){
//          return;
//        }
//        this.page = 1;
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userService/searchByName",
          async: true,
          data: {
            keyword: this.keyword.trim(),
            openID: this.localFrom == "请选择" ? "" : this.localFromOpenID,
            sort: this.sort,
            page: this.page,
            rows: this.rows
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.code == 200) {
            this.serviceListArr = res.data.results.dataList;
            this.serviceListCount = res.data.results.dataCount;
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
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
      rowsChange(){
//        this.initData()
        this.searchByKwd()
      },
      localFromList(){
        this.localFromListShow = !this.localFromListShow;
      },
      chooseLocalFrom(e){
        this.localFrom = e.target.innerHTML;
        this.localFromOpenID = e.target.getAttribute("main-data");
        this.localFromListShow = false;
      },
      getLocalFrom(){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userService/getLocalFrom",
          async: true,
          data: {
            "confirmStatus" : "3"
          },
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 200) {
            this.confirmStatusArr= res.data.results;
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
    }
  }
</script>

