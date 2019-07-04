<template>
     <div class="content">
       <!--位置信息 start-->
       <div class="bread-crumbs">
         <div class="bread-crumbs-content">
           <span class="cor-0498e4">userService列表</span>
           <span class="locationgLine">&frasl;</span>
           <span class="corBlue">用户列表</span>
         </div>
       </div>
       <!--位置信息 end-->
       <div class="rm-main-box">
         <div class="">
           <!--搜索条件 start-->
           <div class="rl-main-aside clearfix">
             <a href="javascript:;" title="查询" class="rl-operate-btn active frt btnSearch" @click="searchKey('','first')">查询</a>
             <div class="frt">
               <label class="downMenuTit flt">关键字：</label>
               <div class="resource-sort-search-box frt">
                 <input ref="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入用户名称关键字" v-model="userKey">
               </div>
             </div>
             <div class="downMenu frt clearfix">
               <label class="downMenuTit flt">状态：</label>
               <div class="select-box result_select frt" @click="statusList2($event)" @click.stop>
                 <span class="defaul_option">{{chooseStatusText}}</span>
                 <i class="icon2 icon-downMenu-symbol frt"></i>
                 <ul  @click="chooseStatus2($event)" @click.stop v-if="statusListShow" style="width: 108px;">
                   <li value="4">全部</li>
                   <li value="0">未认证</li>
                   <li value="1">待审核</li>
                   <li value="3">已通过</li>
                   <li value="2">未通过</li>
                 </ul>
               </div>
             </div>
           </div>
           <!--搜索条件 end-->
           <div class="rm-main-content">
             <table class="mainTable userList fwcgTable">
               <thead>
               <tr>
                 <th class="percent13">用户名</th>
                 <th>OpenID</th>
                 <th class="percent10">认证状态</th>
                 <th class="percent12">手机号</th>
                 <th class="percent10">用户状态</th>
                 <th class="percent12">注册时间</th>
                 <th class="center wh147">操作</th>
               </tr>
               </thead>
               <tbody v-for="(item,index) in userListArr" :key="index">
               <tr>
                 <td class="percentageWh11">{{item.userName}}</td>
                 <td class="percentageWh20">{{item.openID}}</td>
                 <!--后台管理人员（认证状态 "2"未通过 "1"待审核 "3"已通过 "0" 未认证）（用户认证状态）-->
                 <td class="">
                   <span class="status abnormal" v-if="item.confirmStatus == 0 || item.confirmStatus == '0'">未认证</span>
                   <span class="status" v-if="item.confirmStatus == 1 || item.confirmStatus == '1'">待审核</span>
                   <span class="status abnormal" v-if="item.confirmStatus == 2 || item.confirmStatus == '2'">未通过</span>
                   <span class="status" v-if="item.confirmStatus == 3 || item.confirmStatus == '3' ">已认证</span>
                 </td>
                 <td>{{item.mobile}}</td>
                 <td class="corBlue">
                   {{item.isStop == 1? '启用':'停用'}}
                 </td>
                 <td>{{item.registerTime}}</td>
                 <td class="wh147 center">
                   <div class="rm-main-icon-box">
                     <a class="rm-icon-btn" href="javascript:;"
                        @click="lookUserDetail(item.openID)"
                        title="审核"
                        v-if="item.confirmStatus == 1 || item.confirmStatus == '1'">
                       <i class="icon2 icon-verify"></i>
                     </a>
                     <a class="rm-icon-btn" href="javascript:;" title="查看" v-else @click="lookUserDetail(item.openID)">
                       <i class="icon2 icon-view"></i>
                     </a>
                     <a v-if="item.isStop=='1'" class="rm-icon-btn" href="javascript:;" title="停用" @click="startOrStopShow(item.openID,'0',item.userName)">
                       <i class="icon2 icon-disable"></i>
                     </a>
                     <a v-if="item.isStop=='0'" class="rm-icon-btn" href="javascript:;" title="启用" @click="startOrStopShow(item.openID,'1',item.userName)">
                             <i class="icon2 icon-enable"></i>
                         </a>
                     <a class="rm-icon-btn" href="javascript:void(0);" title="修改密码" @click="modifyPass(item.userName)">
                       <i class="icon2 icon-changePwd"></i>
                     </a>
                   </div>
                 </td>
               </tr>
               </tbody>
             </table>

             <!--还没有申请记录 start-->
             <div class="noRecordList" v-show="noResult">
               <div class="noRecordPicBox"><img src="../../assets/img/noRecordPic.png"/></div>
               <div class="noRecorWord">{{noDate}}</div>
             </div>

            <!--分页开始-->
             <div class="page-box clearfix">
               <div class="flt">
                 <div class="page-go-box flt">
                   <span class="page-txt flt">{{"共"+userListCount+"条记录，每页显示"}}</span>
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
                     :total="userListCount">
                   </el-pagination>
                 </div>
                 <div class="page-go-box flt">
                   <a class="page-btn" href="javascript:;">确定</a>
                 </div>
               </div>
             </div>
           </div>
           <!--分页结束-->
         </div>
       </div>
       <!-- 修改密码对话框开始 start -->
       <ModifyPwd v-bind:modifyPassVisible = "modifyPassVisible" @listenToChildEvent = "getMessage" v-bind:userRealName="userRealName"></ModifyPwd>
       <!-- 修改密码对话框结束 end -->
       <MaskTip v-bind:tips = "tips"
                v-bind:tipsContent = "tipsContent"
                v-bind:ifSuccess = "ifSuccess"
                v-bind:loading = "loading">
       </MaskTip>
       <div class="mask" v-if="isStartOrStopShow"></div>
       <div class="dialog-container add-catalog-dialog" v-if="isStartOrStopShow">
         <div class="dialog-inner">
           <header class="dialog-header">
             <div class="dialog-header-tit flt">{{startOrStopText}}</div>
             <div class="icon3 dialog-header-close frt"  @click="startOrStopHide()"></div>
           </header>
           <div class="dialog-body">
             <div class="dialog-wordTips">
               确定要{{startOrStopText}}用户
               <span>{{startOrStopUser}}</span>
               吗？
             </div>
           </div>
           <footer class="dialog-footer">
             <ul class="btn-list">
               <li class="btn-item btn-item-acvite" @click="startOrStop(startOrStopOpenID,startOrStopState)">确  定</li>
               <li class="btn-item" @click="startOrStopHide()">取  消</li>
             </ul>
           </footer>
         </div>
       </div>
     </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import ModifyPwd from '@/views/userInfo/modifyPwd';
  import {mapGetters} from 'vuex';
  import  MaskTip from '@/views/module/mask';
  export default {
    data () {
      return {
        userListCount: 1,//列表数据总条数
        rows: 10,//每页显示几条
        page:1,//当前页数
        sort:{registerTime: -1},//数据排序
//        sort:{isStop: -1,confirmStatus:-1,registerTime: -1},//数据排序
        rowsListShow:false,
        userListArr: [],//首页初始化获取数据列表用户
        chooseStatusText:"全部",
        statusListShow:false,
        chooseStatusType:4,
        userKey:"",
        modifyPassVisible:false,
        isSearch: false,
        userRealName:"",
        tipsContent: '',
        ifSuccess: true,
        tips: false,
        loading: false,
        isStartOrStopShow: false,
        startOrStopText: '',
        startOrStopUser: '',
        startOrStopOpenID: '',
        startOrStopState: '',
        noResult:false,
        noDate:"暂无数据"
      }
    },
    mounted:function(){
      //this.loading = false;//加载动画
      this.getUserDate();
       window.addEventListener('click', this.handleSelect);
    },
    computed: {
      ...mapGetters(['getUserInfo']),
    },
    components: {
      ModifyPwd,
      MaskTip
    },
    methods: {
      rowsChange(){
        this.isSearch ? this.searchKey() : this.getUserDate();
      },
      getUserDate(){
        this.isSearch = false;
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/getUserDate",
          async: true,
          data: {
            query: {},
            sort: this.sort,
            page: this.page,
            rows: this.rows
          },
          contentType: 'application/json'
        }).then(res=> {
         this.loading = false;
          if(res.data.code == "200"){
            this.noResult = false;
            if(res.data.dataUser.dataCount == 0){
              this.noResult = true;
              this.noDate = "暂无数据"
            };
            this.userListArr = res.data.dataUser.dataList;
           this.userListCount = res.data.dataUser.dataCount;
          }else{
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
        //this.getUserDate();
        this.isSearch ? this.searchKey() : this.getUserDate();
      },
      statusList2(e){//企业媒体 媒体类型
        e = e || event;
        e.cancelBubble = true;
        this.statusListShow = this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus2(e){//企业媒体 媒体类型
        this.chooseStatusType = e.target.value;// 状态
        this.chooseStatusText = e.target.innerText;
        this.statusListShow = false;
      },
      /*点击其他触发下拉框消失*/
      handleSelect(){
        this.statusListShow = false;
      },
      searchKey(isSort,isFirst){
        this.isSearch = true;// this.chooseStatusType 状态  this.userKey 用户关键字
        this.loading = true;
        if(isFirst){
          this.page = 1;
        }
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/getUserKey",
          async: true,
          data: {
            userName:this.userKey.trim(),
            confirmStatus:this.chooseStatusType,
            rows: this.rows,
            sort: isSort?this.sort:"",
            page: this.page

          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if(res.data.code == "200"){
            this.noResult = false;
            if(res.data.dataUser.dataCount == 0){
              this.noResult = true;
              this.noDate = "暂无查询数据";
            };
            this.userListArr = res.data.dataUser.dataList;
            this.userListCount = res.data.dataUser.dataCount;
          }else{

          }
        }).catch(err=> {
          console.log(err)
        })
      },
      getMessage(data){
        this.modifyPassVisible = data;
      },
      modifyPass(userName){//修改密码
        this.modifyPassVisible = true;
        this.userRealName = userName;
      },
      lookUserDetail(userOpen){
        this.loading = true;
        this.$router.push({
          path:'/home/userDetails',
          name:"userDetails",
          query: {openID:userOpen}
        })//成功后跳转到首页面
      },
      startOrStopShow(openID, state, userName){
        this.isStartOrStopShow = true;
        this.startOrStopOpenID = openID;
        this.startOrStopState = state;
        this.startOrStopUser = userName;
        this.startOrStopText = state == "0"?"停用":"启用";
      },
      startOrStopHide(){
        this.isStartOrStopShow = false;
      },
      startOrStop(openID, state){
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/startOrStop",
          async: true,
          data: {
            openID: openID,
            isStop: state
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          this.startOrStopHide();
          if(res.data.code == "200"){
            this.tips = true;
            this.tipsContent = state=="0"?"停用成功":"启用成功";
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.rowsChange();
            }, 1500);
          }else{
            this.tips = true;
            this.tipsContent = "操作失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 1500);
          }
        }).catch(err=> {
          console.log(err)
        })
      }
    }
  };
</script>
