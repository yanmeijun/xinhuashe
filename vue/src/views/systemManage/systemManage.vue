<template><div>
  <div class="content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">系统管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="corBlue">后台用户管理</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
      <div class="tabListTit clearfix">
        <ul>
          <li>后台用户管理</li>
        </ul>
      </div>
      <div class="">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
          <a href="javascript:;" title="添加用户" class="rl-operate-btn active flt" @click="renderTo('systemManageAdd')"><i class="icon2 icon-addUser"></i>添加用户</a>
          <a href="javascript:;" title="删除" class="rl-operate-btn spacL10 flt" @click="startOrStopShow('','delete')"><i class="icon2 icon-delete"></i>删除</a>

          <a href="javascript:;" title="查询" class="rl-operate-btn active frt btnSearch" @click="searchByKwd()">查询</a>
          <div class="frt">
            <div class="resource-sort-search-box frt">
              <input ref="keyword" class="inner-search-inp wdh226" type="search" placeholder="姓名关键字">
            </div>
          </div>
        </div>
        <!--搜索条件 end-->
        <div class="rm-main-content">
          <table class="mainTable userList yhglTable">
            <thead>
            <tr>
              <th class="minW12">
                <i class="icon3 icon-check" :class="{checked:isCheckedAll}" @click="checkAll()"></i>用户名
              </th>
              <th class="percent8 minW10">姓名</th>
              <th class="percent11">手机号</th>
              <th class="percent10 minW12">邮箱</th>
              <th class="percent10">启用状态</th>
              <th class="percent10">创建时间</th>
              <th class="center wh150">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,key) in userListArr">
              <td>
                <span class="clampHide">
                  <i class="icon3 icon-check"
                     v-if="loginUserID!=item.userID"
                     :class="{checked:item.isChecked}" @click="checkOne(key)"></i>{{item.userName}}</span>
              </td>
              <td><span class="clampHide">{{item.name}}</span></td>
              <td>{{item.mobile}}</td>
              <td><span class="clampHide">{{item.email}}</span></td>
              <td v-if="item.isEnable" class="corBlue minW56">启用</td>
              <td v-else class="corRed minW56">停用</td>
              <td>{{item.createDate?item.createDate.split(' ')[0]:''}}</td>
              <td class="center">
                <div class="rm-main-icon-box">
                  <a class="rm-icon-btn" href="javascript:;" title="编辑" @click="renderTo('systemManageEdit',item.userID)">
                    <i class="icon2 icon-edit"></i>
                  </a>
                  <a v-if="item.isEnable" class="rm-icon-btn" href="javascript:;" title="停用" @click="startOrStopShow(item.userID,false,item.userName)">
                    <i class="icon2 icon-disable"></i>
                  </a>
                  <a v-else class="rm-icon-btn" href="javascript:;" title="启用" @click="startOrStopShow(item.userID,true,item.userName)">
                          <i class="icon2 icon-enable"></i>
                  </a>
                  <a v-if="loginUserID!=item.userID" class="rm-icon-btn" href="javascript:;" title="删除" @click="startOrStopShow(item.userID,'delete',item.userName)">
                    <i class="icon2 icon-sysDelete"></i>
                  </a>
                  <a class="rm-icon-btn" href="javascript:;" title="修改密码" @click="modifyPwd(item.userName)">
                    <i class="icon2 icon-changePwd"></i>
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <!--还没有申请记录 start-->
          <div class="noRecordList" v-if="userListCount==0">
            <div class="noRecordPicBox"><img src="../../assets/img/noRecordPic.png"/></div>
            <div class="noRecorWord">暂无查询数据</div>
          </div>
          <div class="page-box clearfix">
            <div class="flt">
              <div class="page-go-box flt">
                <span class="page-txt flt">{{"共"+userListCount+"条记录，每页显示"}}</span>
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
                  @size-change="getUserList"
                  @current-change="getUserList"
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
      </div>
    </div>
    <div class="mask" v-if="isStartOrStopShow"></div>
    <div class="dialog-container add-catalog-dialog" v-if="isStartOrStopShow">
      <div class="dialog-inner dialog-systemDelete">
        <header class="dialog-header">
          <div class="dialog-header-tit flt">{{startOrStopText}}</div>
          <div class="icon3 dialog-header-close frt"  @click="startOrStopHide()"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-wordTips" v-html="startOrStopTextTips">
            <!--确定要{{startOrStopText}}用户<span>{{startOrStopUserName}}</span>吗？-->
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item btn-item-acvite" @click="startOrStopConfirm(startOrStopUserID,startOrStopState)">确  定</li>
            <li class="btn-item" @click="startOrStopHide()">取  消</li>
          </ul>
        </footer>
      </div>
    </div>
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:ifSuccess = "ifSuccess"
             v-bind:loading = "loading">
    </MaskTip>
    <ModifyPwd v-bind:userName = "modifyPwdUserName"
                v-bind:modifyPwdShow = "modifyPwdShow"
                @listenToChildEvent = "modifyPwdClose">
    </ModifyPwd>
  </div>
</div></template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import MaskTip from '@/views/module/mask';
  import ModifyPwd from '@/views/systemManage/modifyPwd';
  export default{
    data(){
      return {
        userListArr: [],//首页初始化获取数据列表
        userIDArr: [],//当前页面所有数据的userID集合
        userListCount: 0,//列表数据总条数
        rows: 10,//每页显示几条
        page: 1,//当前页数
        sort: {createDate: -1},//数据排序
        query: {},//获取数据列表时的查询条件
        isSearch: false,
        domain: "",//domain
        totalPage: 0,//总页数
        tipsContent: '',
        ifSuccess: true,
        tips: false,
        loading: false,
        rowsListShow: false,//每页显示几条点击事件用的flag参数
        isStartOrStopShow: false,
        startOrStopText: '',
        startOrStopTextTips: '',
        startOrStopUserName: '',
        startOrStopUserID: '',
        startOrStopState: false,
        modifyPwdUserName: '',
        modifyPwdShow: false,
        isCheckedAll: false,
        checkedUserIDArr: [],
        loginUserID: ''//当前登录用户的userID
      }
    },
    mounted(){
      this.getUserList();
      window.addEventListener('click', this.handleSelectCon);
      if(this.getUserInfo){
        if(typeof this.getUserInfo == 'string'){
          this.loginUserID = JSON.parse(this.getUserInfo).userID;
        }else{
          this.loginUserID = this.getUserInfo.userID;
        }
      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components:{
      MaskTip,ModifyPwd
    },
    methods: {
      handleSelectCon(){
        this.rowsListShow = false;
      },
      getUserList(){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/user/getUserList",
          async: true,
          data: {
            isSearch: this.isSearch,
            query: this.query,
            sort: this.sort,
            page: this.page,
            rows: this.rows
          },
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.msg == "success") {
            this.userListArr = res.data.results.dataList;
            this.userListCount = res.data.results.dataCount;
            this.isCheckedAll = false;
            this.userListArr.forEach(item => {
              item.isChecked = false;
//              item.createDate = item.createDate?item.createDate.split(' ')[0]:'';
              this.userIDArr.push(item.userID)
            })
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
        this.getUserList();
      },
      renderTo(pageName, userID){
        this.$router.push({
          path: '/systemManage/' + pageName,
          name: pageName,
          query: {userID: userID}
        })
      },
      startOrStopShow(userID, state, userName){
        this.startOrStopUserID = userID;
        this.startOrStopUserName = userName;
        this.startOrStopState = state;
        if(state == 'delete'){
          this.checkedUserIDArr = [];
          if(userID){
            this.checkedUserIDArr = [userID];
          }else{
            this.userListArr.forEach(item => {
              if(item.isChecked){
                this.checkedUserIDArr.push(item.userID);
              }
            });
          }
          if(this.checkedUserIDArr.length < 1){
            this.tips = true;
            this.tipsContent = "请选择要删除的用户";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 3000);
            return;
          }
          this.isStartOrStopShow = true;
          this.startOrStopTextTips = userName?'确定要删除用户<span>'+userName+'</span>吗？':'确定要删除选择的用户吗？'
          this.startOrStopText = "删除";
        }else{
          this.isStartOrStopShow = true;
          this.startOrStopText = state?"启用":"停用";
          this.startOrStopTextTips = state?'确定要启用用户<span>'+userName+'</span>吗？':'确定要停用用户<span>'+userName+'</span>吗？'
        }
      },
      startOrStopHide(){
        this.isStartOrStopShow = false;
      },
      startOrStopConfirm(userID, state){
        if(state == "delete"){
          this.deleteUser(userID, state);
        }else{
          this.startOrStop(userID, state)
        }
      },
      startOrStop(userID, state){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/user/modifyUser",
          async: true,
          data: {
            query: {userID: this.startOrStopUserID},
            modify: {isEnable: this.startOrStopState}
          },
          contentType: 'application/json'
        }).then(res=> {
          this.startOrStopHide();
          if(res.data.code == "200"){
            this.tips = true;
            this.tipsContent = state?"启用成功":"停用成功";
            this.ifSuccess = true;
            this.getUserList();
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }else{
            this.tips = true;
            this.tipsContent = "操作失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      searchByKwd(){
        this.rows = 10;
        this.page = 1;
        if(this.$refs.keyword.value.trim()){
          this.isSearch = true;
          this.query = {name: this.$refs.keyword.value.trim()}
        }else{
          this.isSearch = false;
          this.query = {}
        }
        this.getUserList();
      },
      modifyPwd(userName){
        this.modifyPwdUserName = userName;
        this.modifyPwdShow = true;
      },
      modifyPwdClose(flag){
        this.modifyPwdShow = flag;
      },
      checkAll(){
        this.userListArr.forEach(item => {
          item.isChecked = !this.isCheckedAll;
        });
        this.isCheckedAll = !this.isCheckedAll;
      },
      checkOne(key){
        this.userListArr[key].isChecked?this.isCheckedAll = false:''
        this.userListArr[key].isChecked?this.userListArr[key].isChecked = false:this.userListArr[key].isChecked = true;
        this.$set(this.userListArr,key,this.userListArr[key]);
        let flag = true;
        this.userListArr.forEach(item => {
          if(!item.isChecked){
            flag = false;
          }
        });
        this.isCheckedAll = flag;
      },
      deleteUser(userID){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/user/deleteUser",
          async: true,
          data: {
            userID: this.checkedUserIDArr
          },
          contentType: 'application/json'
        }).then(res=> {
          this.startOrStopHide();
          if(res.data.code == "200"){
            this.tips = true;
            this.tipsContent = "删除成功";
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.getUserList();
            }, 3000);
          }else{
            this.tips = true;
            this.tipsContent = "删除失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }
        }).catch(err=> {
          console.log(err)
        })
      },
    }
  }
</script>
