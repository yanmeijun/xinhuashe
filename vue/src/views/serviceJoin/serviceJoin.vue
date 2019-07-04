<template>
  <div>
    <div class="content">
      <!--位置信息 start-->
      <div class="bread-crumbs">
        <div class="bread-crumbs-content">
          <span class="cor-0498e4">服务接入管理</span>
          <span class="locationgLine">&frasl;</span>
          <span class="corBlue">服务接入审核</span>
        </div>
      </div>
      <!--位置信息 end-->
      <div class="rm-main-box">
        <div class="tabListTit clearfix">
          <ul @click="chooseStatus($event)">
            <li value=0 :class="{active:chooseStatusType==0}">全部</li>
            <li value=1 :class="{active:chooseStatusType==1}">待审核</li>
            <li value=3 :class="{active:chooseStatusType==3}">审核通过</li>
            <li value=4 :class="{active:chooseStatusType==4}">审核未通过</li>
            <li value=2 :class="{active:chooseStatusType==2}">已撤销</li>
          </ul>
        </div>
        <div class="">
          <!--搜索条件 start-->
          <div class="rl-main-aside clearfix">
            <a href="javascript:;" title="全部导出" class="rl-operate-btn active flt" @click="serviceJoinExcel()"><i class="icon2 icon-exportAll"></i>全部导出</a>
            <a href="javascript:;" title="查询" class="rl-operate-btn active frt btnSearch" @click="searchByKwd('','first')">查询</a>
            <div class="frt">
              <label class="downMenuTit flt">关键字：</label>
              <div class="resource-sort-search-box frt">
                <input ref="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入服务名称/申请人姓名关键字">
              </div>
            </div>
            <div class="downMenu frt clearfix">
              <label class="downMenuTit flt">服务范围：</label>
              <div class="select-box result_select wh140 frt" @click="regionList()" @click.stop>
                <span class="defaul_option">{{chooseRegionText}}</span>
                <i class="icon2 icon-downMenu-symbol frt"></i>

                <ul v-if="regionListShow" @click="chooseRegion($event)" @click.stop style="overflow-y:scroll;">
                	<!--<input type="search" class="search-serviceArea">产品要添加的搜索框-->
                  <li v-for="(item,index) in regionListArr" :id="item.id">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="downMenu frt clearfix">
              <label class="downMenuTit flt">服务类型：</label>
              <div class="select-box result_select frt" @click="serviceTypeList()" @click.stop>
                <span class="defaul_option">{{chooseServiceTypeText}}</span>
                <i class="icon2 icon-downMenu-symbol frt"></i>
                <ul v-if="serviceTypeListShow" @click="chooseServiceType($event)" @click.stop>
                  <li value=0>全部</li>
                  <li value=1>业务查询</li>
                  <li value=2>业务办理</li>
                  <li value=3>业务预约</li>
                </ul>
              </div>
            </div>
          </div>
          <!--搜索条件 end-->
          <div class="rm-main-content">
            <table class="mainTable fwjr">
              <thead>
              <tr>
                <th class="percent17">申请单编号</th>
                <th>服务名称</th>
                <!--<th>服务范围</th>-->
                <th class="percent10">服务类型</th>
                <th>申请单位</th>
                <th class="percent10">联系人</th>
                <th class="percent12">申请日期</th>
                <th class="percent10">审核状态</th>
                <th class="percent8 center">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item ,index) in serviceListArr" :key="index">
                <td class="num">{{item.idNumber}}</td>
                <td><span class="clampHide">{{item.serviceName}}</span></td>
                <!--<td>河南省</td>-->
                <td>{{item.serviceType==1?'业务查询':(item.serviceType==2?'业务办理':'业务预约')}}</td>
                <td><span class="clampHide">{{item.company}}</span></td>
                <td>{{item.contactName}}</td>
                <td>{{item.createDate.split(' ')[0]}}</td>
                <td class="">
                  <span v-if="item.reviewState==1" class="status">待审核</span>
                  <span v-if="item.reviewState==3" class="status">已通过</span>
                  <span v-if="item.reviewState==2" class="status abnormal">已撤销</span>
                  <span v-if="item.reviewState==4" class="status abnormal">未通过</span>
                </td>
                <td @click="renderTo(item.reviewState,item.idNumber)">
                  <div class="rm-main-icon-box" @click="renderTo(item.reviewState,item.idNumber)">
                    <a v-if="item.reviewState==1" class="rm-icon-btn" href="javascript:;" title="审核">
                      <i class="icon2 icon-verify"></i>
                    </a>
                    <a v-else class="rm-icon-btn" href="javascript:;" title="查看">
                      <i class="icon2 icon-view"></i>
                    </a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <!--还没有申请记录 start-->
            <div class="noRecordList" v-if="serviceListCount==0">
              <div class="noRecordPicBox"><img src="../../assets/img/noRecordPic.png"/></div>
              <div class="noRecorWord">{{isSearch?'暂无查询数据':'亲，没有申请记录哦～'}}</div>
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
    <MaskTip v-bind:loading = "loading"></MaskTip>

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
  .el-input__inner{
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
        sort: {createDate: -1},//数据排序
        totalPage: 0,//总页数
        chooseStatusType: 0,//查询时审核状态（1：待审核，2：已撤销，3：审核已通过，4：审核未通过）
        serviceTypeListShow: false,//查询服务类型点击事件用的flag参数
        serviceType: 0,//查询时服务类型
        chooseServiceTypeText: "全部",//查询时服务类型栏的文本展示
        regionListShow: false,//查询服务范围点击事件用的flag参数
        region: "0",//查询时服务范围
        chooseRegionText: "全部",//查询时服务范围栏的文本展示
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
        loading:false,
        regionListArr: [
          {id:'0',name:'全部'},
          {id:'00',name:'全国'},
          {id:'11',name:'北京市'},
          {id:'12',name:'天津市'},
          {id:'31',name:'上海市'},
          {id:'50',name:'重庆市'},
          {id:'13',name:'河北省'},
          {id:'14',name:'山西省'},
          {id:'21',name:'辽宁省'},
          {id:'22',name:'吉林省'},
          {id:'23',name:'黑龙江省'},
          {id:'32',name:'江苏省'},
          {id:'33',name:'浙江省'},
          {id:'34',name:'安徽省'},
          {id:'35',name:'福建省'},
          {id:'36',name:'江西省'},
          {id:'37',name:'山东省'},
          {id:'41',name:'河南省'},
          {id:'42',name:'湖北省'},
          {id:'43',name:'湖南省'},
          {id:'44',name:'广东省'},
          {id:'46',name:'海南省'},
          {id:'51',name:'四川省'},
          {id:'52',name:'贵州省'},
          {id:'53',name:'云南省'},
          {id:'61',name:'陕西省'},
          {id:'62',name:'甘肃省'},
          {id:'63',name:'青海省'},
          {id:'71',name:'台湾省'},
          {id:'15',name:'内蒙古自治区'},
          {id:'45',name:'广西壮族自治区'},
          {id:'54',name:'西藏自治区'},
          {id:'64',name:'宁夏回族自治区'},
          {id:'65',name:'新疆自治区'},
          {id:'81',name:'香港特别行政区'},
          {id:'82',name:'澳门特别行政区'}
        ]
      }
    },
    mounted(){
      this.initData();
      window.addEventListener('click', this.handleSelectCon);
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components:{
      MaskTip
    },
    methods: {
      initData(){//初始化数据
        this.isSearch = false;
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/getServiceList",
          async: true,
          data: {
            query: this.chooseStatusType == 0?{}:{reviewState:this.chooseStatusType},
            sort: this.sort,
            page: this.page,
            rows: this.rows
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.msg == "success") {
            this.serviceListArr = res.data.results.dataList;
            this.serviceListCount = res.data.results.dataCount;
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      serviceTypeList(){//查询时，服务类型选择点击事件
        this.regionListShow = false;
        this.serviceTypeListShow ? this.serviceTypeListShow = false : this.serviceTypeListShow = true
      },
      chooseServiceType(e){
        this.serviceType = e.target.value;
        this.chooseServiceTypeText = e.target.innerText;
        this.serviceTypeListShow = false;
      },
      regionList(){//查询时，服务范围选择点击事件
        this.serviceTypeListShow = false;
        this.regionListShow ? this.regionListShow = false : this.regionListShow = true
      },
      chooseRegion(e){
        this.region = e.target.id;
        this.chooseRegionText = e.target.innerText;
        this.regionListShow = false;
      },
      chooseStatus(e){//查询时，运行状态选择点击事件
        this.chooseStatusType = e.target.value;
        this.chooseStatusText = e.target.innerText;
        this.serviceTypeListShow = false;
        this.page = 1;
        this.rows = 10;
        this.$refs.keyword.value = "";
        this.initData();
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
      searchByKwd(isSort, isFirst){
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
            keyword: this.$refs.keyword.value.trim(),
            reviewState: this.chooseStatusType,
            serviceType: this.serviceType,
            region: this.region,
            rows: this.rows,
            sort: isSort ? this.sort : "",
            page: this.page
          },
          contentType: 'application/json'
        }).then(res=> {
         this.loading = false;
          if (res.data.msg == "success") {
            this.serviceListArr = res.data.results.dataList;
            this.serviceListCount = res.data.results.dataCount;
          } else {
            alert("查询失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      rowsChange(){
//        this.page = 1;
        this.isSearch ? this.searchByKwd() : this.initData()
      },
      handleSelectCon(){
        this.serviceTypeListShow = false;
        this.regionListShow = false;
        this.rowsListShow = false;
      },
      renderTo(reviewState, idNumber){//跳转到服务接入详情页面
        this.$router.push({
          path: '/serviceJoin/serviceJoinDetail',
          name: "serviceJoinDetail",
          query: {idNumber: idNumber, reviewState: reviewState}
        })
      },
      serviceJoinExcel(){
        window.location.href = "/exportExcel/serviceJoinExcel?reviewState="+this.chooseStatusType;
      }
    }
  }
</script>

