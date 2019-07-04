<template>
  <div class="rm-main-box">
    <div class="rl-main-aside clearfix">
    	<a href="javascript:;" title="查询" class="rl-operate-btn active fr btnSearch" @click="search()">查询</a>
    	<div class="frt">
      	<label class="downMenuTit fl">关键字：</label>
	      <div class="resource-sort-search-box frt">
	        <input class="inner-search-inp wdh226" type="search" v-model="key" placeholder="请输入模板名称/模板ID">
	      </div>
    	</div>
      <div class="downMenu frt clearfix" @click.stop="toggleSortList">
      	<label class="downMenuTit fl">模板状态：</label>
        <div class="select-box result_select fl">
          <span class="defaul_option">{{currStatus.name}}</span>
          <i class="icon4 icon-downMenu" :class="sort.isOpen?'transUp':'transDown'"></i>
          <transition name="slide">
            <ul v-show="sort.isOpen" style="overflow:hidden;">
              <li class="simulate-option-item"
                  v-for="item in sort.list"
                  :key="item.id" @click.stop="selectedSort(item)">
                {{item.name}}
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="flt">
        <a class="rl-operate-btn active flt" title="新增" @click="addTemplateClick">新增</a>
        <a class="rl-operate-btn flt" href="javascript:;" title="删除" @click="deleteTemplateAll">删除</a>
        <a class="rl-operate-btn flt" href="javascript:;" title="启用" @click="startUse">启用</a>
        <a class="rl-operate-btn flt" href="javascript:;" title="停用" @click="stopUse">停用</a>
      </div>
    </div>
    <div class="rm-main-content">
      <table class="mainTable fwmbTable">
        <thead>
        <tr>
          <th class="wh30"><i class="icon4 check-icon" :class="{checked: isCheckAll}" @click.stop="checkAllHandler"></i></th>
          <th>模板ID</th>
          <th>模板名称</th>
          <th class="center percent12">API数量 <i class="icon4" :class="[apiSortClass]" @click="apiSortfn()"></i></th>
          <th class="center percent10">模板状态</th>
          <th class="percent17 minW140">生效时间<i class="icon4" :class="[timeSortClass]" @click="timeSortfn()"></i></th>
          <th class="wh130"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in contentList" :key="item._id" :class="[{'tr-selected': item.isChecked}]">
          <td  class="wh30"><i class="icon4 check-icon" @click="checkHandler(item,index)"></i></td>
          <td class="ellipsis">
            <span  class="templateID">{{item.templateID}}</span>
          </td>
          <td class="ellipsis">
            <span class="templateName">{{item.templateName}}</span>
          </td>
          <td class="center">{{item.apiNum}}</td>
          <!--<td class="center corBlue wh15" >{{item.status=='0'?'未启用':'已启用'}}</td>-->

          <td class="center" v-if="item.status=='0'"><span class="status notEnabled">未启用</span></td>
          <td class="center" v-if="item.status!='0'"><span class="status">已启用</span></td>
          <td>{{item.startDate}}</td>
          <td class="wh130">
            <div class="rm-main-icon-box">
              <a class="rm-icon-btn"  title="编辑" @click="modifyTem(item.templateID)">
                <i class="icon2 icon-edit"></i>
              </a>
              <a class="rm-icon-btn" title="启用" v-if="item.status=='0'" @click="startOne(item.templateID,item.templateName)">
                <i class="icon2 icon-enable"></i>
              </a>
              <a class="rm-icon-btn"  title="停用" v-else="item.status=='1'" @click="stopOne(item.templateID,item.templateName)">
                <i class="icon2 icon-disable"></i>
              </a>
              <a class="rm-icon-btn"  title="删除" @click="deleteOne(item.templateID,item.templateName,item.status)">
                <i class="icon2 icon-sysDelete"></i>
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--分页开始-->
      <div class="page-box clearfix">
        <div class="flt">
          <div class="page-go-box flt">
            <span class="page-txt flt">{{"共"+totalNum+"条记录，每页显示"}}</span>
            <span class="perPageShow flt" ref="rows">
                                	{{pageSize}}
                                	<i class="icon4 icon-downMenu" @click="showRowsList()"></i>
                                <ul v-if="rowsListShow" @click="chooseRows($event)">
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
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
          <div class="page-go-box flt">
            <a class="page-btn" href="javascript:;">确定</a>
          </div>
        </div>
      </div>
      <!--分页结束-->
    </div>
    <!--操作失败-->
    <div class="failedBox" style="display:none">
      <i class="icon4 icon-failed"></i>
      操作失败
    </div>
    <!--操作成功-->
    <div class="failedBox successBox" style="display: none;">
      <i class="icon4 icon-success"></i>
      操作成功
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState,mapGetters} from 'vuex';
  export default {
    props: {
      getDataEmit: {
        'type': Boolean,
        'default': false
        }
    },
    data() {
      return {
        contentList: [],
        totalNum:0,
        currentPage: 1,   //分页当前页
        pageSize:10,      //分页当前页条数
        rowsListShow: false,//每页显示几条点击事件用的flag参数
        key:'',           //搜索关键字
        currStatus:{ name:"全部",id:'2'},   //当前选中模板状态
        sort: {    // 模板状态分类
          isOpen: false,
          list: [
            {id:'2',name:'全部'},
            {id:'0',name:'未启用'},
            {id:'1',name:'已启用'},
          ]
        },
        startDate:0,
        apiNum:0,
        domain:'1',
        sortAll: {status: -1, startDate: -1},//数据排序
      }
    },
    computed:{
      ...mapGetters(['getUserInfo']),
      getDataWatch(){
        return this.getDataEmit;
      },
      apiSortClass(){
        if(this.apiNum===0){
          return 'icon-defalut'
        }else if(this.apiNum===-1){
          return 'icon-bottom'
        }else if(this.apiNum===1){
          return 'icon-top'
        }else{
          return 'icon-defalut'
        }
      },
      timeSortClass(){
        if(this.startDate===0){
          return 'icon-defalut'
        }else if(this.startDate===-1){
          return 'icon-bottom'
        }else if(this.startDate===1){
          return 'icon-top'
        }else{
          return 'icon-defalut'
        }
      },
      getCheckedSum () {
        return this.contentList.filter(item => item.isChecked).length
      },
      getCheckedStatus1() {
        return this.contentList.filter(item => item.isChecked && item.status=='1')
      },
      getCheckedStatus0() {
        return this.contentList.filter(item => item.isChecked && item.status=='0')
      },
      checkData(){
        return this.contentList.filter(item => item.isChecked)
      },
      isCheckAll () {
        if (this.contentList.length) {
          return this.getCheckedSum && this.getCheckedSum === this.contentList.length;
        } else {
          return false
        }
      }
    },
    created(){
      let getUserInfo;
      if(this.getUserInfo){
        if(typeof this.getUserInfo == 'string'){
          getUserInfo = JSON.parse(this.getUserInfo);
        }else{
          getUserInfo = this.getUserInfo;
        }
      }
      this.userID=getUserInfo.userID;
      this.domain=getUserInfo.domain;
      this.getData();
    },
    mounted(){
      window.addEventListener('click', this.handleSelectCon);
    },
    methods: {
      handleSelectCon(){
        this.sort.isOpen = false;
      },
      showRowsList(){//每页显示几条选择点击事件
        this.rowsListShow ? this.rowsListShow = false : this.rowsListShow = true
      },
      chooseRows(e){//每页显示几条选择点击事件
        this.currentPage=1;
        this.pageSize = Number(e.target.innerText);
        this.rowsListShow = false;
        this.getData();
      },

      apiSortfn(){
        if(this.apiNum==0){
          this.apiNum=-1;
          this.sortAll = {
            apiNum: -1
          }
        }else if(this.apiNum==-1){
          this.apiNum=1;
          this.sortAll = {
            apiNum: 1
          }
        }else if(this.apiNum==1){
          this.apiNum=-1;
          this.sortAll = {
            apiNum: -1
          }
        }
        this.currentPage=1;
        this.getData();
      },
      timeSortfn(){
        if(this.startDate==0){
          this.startDate=-1;
          this.sortAll = {
            startDate: -1
          }
        }else if(this.startDate==-1){
          this.startDate=1;
          this.sortAll = {
            startDate: 1
          }
        }else if(this.startDate==1){
          this.startDate=-1;
          this.sortAll = {
            startDate: -1
          }
        }
        this.currentPage=1;
        this.getData();
      },
      search(){
        this.currentPage=1;
        this.sortAll="";
        this.getData();
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getData();
      },
      handleCurrentChange(){
        this.getData();
      },
      toggleSortList () {
        this.sort.isOpen = !this.sort.isOpen;
      },
      selectedSort (selectedData) {
        if (this.currStatus.id !== selectedData.id) {
          this.currStatus.name = selectedData.name;
          this.currStatus.id = selectedData.id;
          this.sort.isOpen = !this.sort.isOpen;
        }
      },
      getData(){
        let data={
          status:this.currStatus.id,
          key:this.key.trim(),
          pageSize:this.pageSize,
          pageNum:this.currentPage,
          sort:this.sortAll,
//          apiSort:this.apiSort,
//          timeSort:this.timeSort,
          domain:this.domain,
        }
        this.$http({
          method: 'post',
          url: '/template/getTemplateMan',
          data: data
        }).then((res)=>{
          let data=res.data;
          if(data.success){
            this.contentList=data.info.data;
            this.totalNum=data.info.totalNum;
          }else{
            this.$emit('on-fail',data.info);
          }
        })
          .catch((err)=>{
            this.$emit('on-fail','加载模板列表失败');
          })
      },
      checkAllHandler () {
        let iLen = this.contentList.length;
        if (this.isCheckAll) {
          for (let i = 0; i < iLen; i++) {
            if (this.contentList[i].isChecked) {
              this.contentList[i].isChecked=!this.contentList[i].isChecked;
            }
          }
        } else {
          for (let i = 0; i < iLen; i++) {
            if (!this.contentList[i].isChecked) {
              this.contentList[i] = Object.assign({}, this.contentList[i], {isChecked:'true',isShow:1});
              this.$set(this.contentList,i,this.contentList[i]);
            }
          }
        }
      },
      checkHandler (data,index) {
        if(this.contentList[index].isChecked){
          this.contentList[index] = Object.assign({}, this.contentList[index], {isChecked:!this.contentList[index].isChecked,isShow:0});
          this.$set(this.contentList,index,this.contentList[index]);
        }else{
          this.contentList[index] = Object.assign({}, this.contentList[index], {isChecked:'true',isShow:1});
          this.$set(this.contentList,index,this.contentList[index]);
        }
      },
      addTemplateClick () {
        this.$emit('openAddTemplate','add');
      },
      startUse(){    //点击启用，先判断是否勾选了启用状态的模板
          if(this.getCheckedSum==0){
            this.$emit('on-fail',"请勾选要启用的数据！");
            return;
          }
          if(this.getCheckedSum>0){
            let str='';
            for(var i=0;i<this.getCheckedStatus0.length;i++){
              str+=this.getCheckedStatus0[i].templateID+',';
            }
            let templateIDStr=str.slice(0,str.length-1);
             let data={
                status:'1',
                templateID:templateIDStr,
                userID:this.userID,
                domain:this.domain,
              }
              this.$http({
                method: 'post',
                url: '/template/modifyStatus',
                data: data
              }).then((res)=>{
                let data=res.data;
                if(!data.success){
                  this.$emit('on-fail',data.info);
                  this.$emit('on-close');
                }else{
                  this.$emit('on-close');
                  this.$emit('on-success');
                  this.getData();
                }
              })
                .catch((err)=>{
                  this.$emit('on-fail',"操作失败");
                  this.$emit('on-close');
                })
          }
      },
      stopUse(){
        if(this.getCheckedSum==0){
          this.$emit('on-fail',"请勾选要停用的数据！");
          return;
        }
        if(this.getCheckedSum>0){
          let str='';
          for(var i=0;i<this.getCheckedStatus1.length;i++){
            str+=this.getCheckedStatus1[i].templateID+',';
          }
          let templateIDStr=str.slice(0,str.length-1);
          let data={
            status:'0',
            templateID:templateIDStr,
            userID:this.userID,
            domain:this.domain,
          }
          this.$http({
            method: 'post',
            url: '/template/modifyStatus',
            data: data
          }).then((res)=>{
            let data=res.data;
            if(!data.success){
              this.$emit('on-fail',data.info);
              this.$emit('on-close');
            }else{
              this.$emit('on-close');
              this.$emit('on-success');
              this.getData();
            }
          })
            .catch((err)=>{
              this.$emit('on-fail',"操作失败");
              this.$emit('on-close');
            })
        }
      },
      deleteTemplateAll(){
        if(this.getCheckedSum==0){
          this.$emit('on-fail',"请勾选要删除的数据！");
          return;
        }
        if(this.getCheckedStatus1.length>0){
          this.$emit('on-fail',"您删除的服务模板中包含启用中状态的模板，请先停用后在进行删除操作！！");
          return;
        }

        let str='';
        for(var i=0;i<this.checkData.length;i++){
          str+=this.checkData[i].templateID+',';
        }
        let templateIDStr=str.slice(0,str.length-1);
        let data={
          templateID:templateIDStr,
          userID:this.userID,
          domain:this.domain,
        }
        console.log('点击删除')
        this.$emit('delAll',data);

      },
      startOne(id,name){
        let data={};
        data['name']=name;
        data['id']=id;
        this.$emit('startUse',data);
      },
      stopOne(id,name){
        let data={};
        data['name']=name;
        data['id']=id;
        this.$emit('stopUse',data);
      },
      deleteOne(id,name,status){
        if(status=='1'){
          this.$emit('on-fail',"该模板启用中，请先停用"+name+"服务模板在进行删除操作！");
          return;
        }
        let data={};
        data['id']=id;
        data['name']=name;
        this.$emit('delTemplate',data);
      },
      modifyTem(id){
        this.$emit('modifyTemplate',id);
      }
    },
    watch:{
      currStatus:{
        handler () {
          this.currentPage=1;
//          this.getData();
        },
        deep:true
      },
      getDataWatch:{
        handler () {
          if(this.getDataWatch){
            this.getData();
          }
        },
        deep:true
      }
    }
  }
</script>
<style>
  .slide-leave-active,.slide-enter-active{
    transition:  all 0.3s ease;
  }
  .slide-leave,.slide-enter-to{
    height:92px;
  }
  .slide-enter,.slide-leave-to{
    height:0;
  }
  .mainTable{
    table-layout: fixed;
    word-wrap:break-word
  }
  /*.mainTable td, .mainTable th{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display:inline-block;
  }*/
</style>
